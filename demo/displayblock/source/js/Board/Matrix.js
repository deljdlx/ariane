class Matrix extends Free
{


  width = 16;
  height = 16;


  matrix = {};


  constructor(width, height, viewport)
  {
    super(viewport);

    this.width = width;
    this.height = height;

    for(let y = 0 ; y < this.height ; y++) {
      
      for(let x = 0 ; x < this.width ; x++) {
        if(typeof(this.matrix[x]) === 'undefined') {
          this.matrix[x] = {};
        }
        this.matrix[x][y] = false;
      }
    }

    console.log(this.matrix);
  }


  enable(x, y, value = true) {
    this.matrix[x][y] = value;
  }


  generateBackground() {
      this.background = document.createElement('div');
      this.background.classList.add('board-background');
      this.background.style.position = 'absolute';
      this.background.style.top = 0;
      this.background.style.left = 0;
      this.background.style.width = this.width * this.cellSize + this.unit;
      this.background.style.height = this.height * this.cellSize + this.unit;
      this.element.appendChild(this.background);
  }

  enabled(x,y) {
    if(typeof(this.matrix[x]) !== 'undefined') {
      if(typeof(this.matrix[x][y]) !== 'undefined') {
        return this.matrix[x][y];
      }
    }

    return false;
  }

  generate(container) {

    this.generateBackground();


    for(let y = 0 ; y < this.height ; y++) {
      for(let x = 0 ; x < this.width ; x++) {
        if(this.enabled(x, y)) {
          let left = x * parseInt(this.cellSize);
          let cube = new Cube(this.cellSize, 100);
          cube.setTopContent(x + ':' +y);
          let top =  y * parseInt(this.cellSize);
          this.viewport.addItem(cube, left, top, this.cellSize);
        }
      }
    }

    this.generateBorders();

    super.generate(container);
    return;
  }

  generateBorders() {


    let topSide = new Cuboid(this.cellSize * this.width, this.cellSize, this.cellSize);
    let top =  -1 * parseInt(this.cellSize);
    this.viewport.addItem(topSide, 0, top, this.cellSize);

    let bottomSide = new Cuboid(this.cellSize * this.width, this.cellSize, this.cellSize);
    top =  (this.height) * parseInt(this.cellSize);
    this.viewport.addItem(bottomSide, 0, top, this.cellSize);


    let leftSide = new Cuboid(this.cellSize, this.cellSize * (this.height + 2), this.cellSize);
    top =  -1 * parseInt(this.cellSize);
    this.viewport.addItem(leftSide, this.cellSize * -1, top, this.cellSize);

    let rightSide = new Cuboid(this.cellSize, this.cellSize * (this.height + 2), this.cellSize);
    top =  -1 * parseInt(this.cellSize);
    this.viewport.addItem(rightSide, this.width * this.cellSize, top, this.cellSize);



  }

  
  generatePlayers() {
    for(let id in this.players) {
      let player = this.players[id].player;
      let cell = this.players[id].cell;

      this.getCellByIndex(cell).addElement(player.getElement());
    }
  } 


}