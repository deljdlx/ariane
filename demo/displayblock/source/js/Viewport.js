
class Viewport
{


    items = [];

    constructor(container)
    {
        this.states = {
            drag: {
                enable: false,
                left: null,
                top: null
            },
            rotation: {
                enable: false,
                left: null,
                top: null
            }
        };



        this.unit = 'px';


        this.zoom = 100;
        this.perspective = 1600;

        this.translation = -1200;
        this.rotationX = 45;
        this.rotationY = 0;
        this.rotationZ = 45;


        this.left = 0;
        this.top = 0;

        //this.width = width;
        //this.height = height;

        this.container = container;

        this.layout = document.createElement('div');
        this.layout.classList.add('layout');


        this.element = document.createElement('div');
        this.element.classList.add('perspective');

        this.element.style.left = (document.body.offsetWidth / 2) + this.unit;
        this.element.style.top = (document.body.offsetHeight / 3) + this.unit  ;

        this.applyTransformations();
        
        this.layout.appendChild(this.element);

        

        this.board = new Free(this);

        document.body.addEventListener('wheel', (evt) => this.handleWheel(evt));
        document.body.addEventListener('mousedown', (evt) => this.dragStart(evt));
        document.body.addEventListener('mouseup', (evt) => this.dragStop(evt));
        document.body.addEventListener('mousemove', (evt) => this.drag(evt));

        document.body.addEventListener('contextmenu', (evt) => this.rotate(evt));
    }


    setBoard(board) {
        this.board = board;
        this.board.setViewport(this);
    }

    addItem(item, x, y, z) {
        this.items.push(item);
        this.board.addItem(item, x, y, z);
    }


    rotate(evt) {
        evt.preventDefault();
    }



    drag(evt) {

        evt.preventDefault;

        if(this.states.drag.enable) {
            let xDelta = (evt.clientX - this.states.drag.left); // (this.perspective / 20);
            this.left = xDelta;
            let yDelta = (evt.clientY - this.states.drag.top); // (this.perspective / 20);
            this.top = yDelta;
            this.applyTransformations();
        }
        else if(this.states.rotation.enable) {

            

            let xDelta = (evt.clientX - this.states.drag.left); // (this.perspective / 20);
            let yDelta = (evt.clientY - this.states.drag.top); // (this.perspective / 20);
            this.rotationZ = xDelta/10;

            this.applyTransformations();
        }
    }

    dragStart(evt) {
        console.log('drag-start');
        evt.preventDefault();

        console.log(evt.which);

        if(evt.which == 1) {
            this.states.drag.enable = true;
            this.states.drag.left = evt.clientX - this.left;
            this.states.drag.top = evt.clientY - this.top;
        }
        else if(evt.which == 3) {
            this.states.rotation.enable = true;
            this.states.rotation.left = evt.clientX - this.left;
            this.states.rotation.top = evt.clientY - this.top;
        }

    }

    dragStop(evt) {
        console.log('drag-stop');
        evt.preventDefault();
        this.states.drag.enable = false;
        this.states.drag.left = null;
        this.states.drag.top = null;

        this.states.rotation.enable = false;
        this.states.rotation.left = null;
        this.states.rotation.top = null;
    }
    

    handleWheel(evt) {
        //evt.preventDefault();
        let delta = evt.deltaY;
        if(delta > 0) {
            this.translate(-70);
        }
        else {
            this.translate(70);
        }
        this.applyTransformations();
    }

    translate(value) {
        this.translation += value;
        this.applyTransformations();
    }

    applyTransformations()
    {
        this.element.style.zoom = this.zoom + '%';

        this.layout.style.left = this.left + this.unit;
        this.layout.style.top = this.top + this.unit;

        this.element.style.transform = `
            perspective(` +this.perspective + this.unit + `)
            rotateX(` + this.rotationX + `deg)
            rotateY(` + this.rotationY + `deg)
            rotateZ(` + this.rotationZ + `deg)
            translateZ(` +this.translation + this.unit + `)
            translateX(` +this.translation + this.unit + `)
            translateY(` +this.translation + this.unit + `)
        `;
    }

    generate() {
        //this.board.setCellSize(cellSize);

        
        this.container.appendChild(this.layout);
        
        this.board.generate(
            this.element
        );
    }

    getBoard() {
        return this.board;
    }

    randomize() {
      this.board.randomize();
    }
}