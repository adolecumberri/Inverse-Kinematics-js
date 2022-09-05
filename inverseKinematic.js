
function inverseKinematic() {

    let startTime = new Date().getTime(); //timer starts
    let canvas = document.getElementById("canvas"); //create canvas
    let ctx = canvas.getContext("2d");

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    let count = canvas.width >= canvas.height ? canvas.width * canvas.width : canvas.height * canvas.height;
    canvas.style.backgroundColor = '#515151' 
    // ctx.fillStyle = '#ffffff';

    class Segment{
        //a and b are points of vector.
        a = {x: 0, y:0}; //Pvector
        b = {x: 0, y:0}; //Pvector
        angle;
        len;
        constructor({x,y,len,angle, ctx}) {
            this.x = x
            this.y = y

            this.a.x = x
            this.a.y = y
            this.len = len
            this.angle = angle
            this.ctx = ctx

            this.calculateB()
        }

        calculateB() {
            let dx = this.len * Math.cos(this.angle)
            let dy = this.len * Math.sin(this.angle)
            this.b.x = this.a.x + dx
            this.b.y = this.a.y + dy
        }

        paingLine () {
            this.ctx.beginPath()
            this.ctx.moveTo(this.a.x, this.a.y)
            this.ctx.lineTo(this.b.x, this.b.y)
            this.ctx.lineWidth = 4
            ctx.strokeStyle = "#FFFFFF";
            this.ctx.stroke()
        }

        update() {
            this.calculateB()
        }

        show(){
            this.ctx.fillStyle = '#515151'
            this.ctx.fillRect(0, 0, canvasWidth, canvasHeight)
            this.paingLine()

        }
    }

    let seg = new Segment({x: 200, y: 300, len: 100, angle: 0, ctx})

    //general update.
    const update = () => {
        seg.show()
        seg.update()
        setTimeout(update, 16);
    };

    //canvas size update.
    function resize() {
        canvas.setAttribute('width', window.innerWidth);
        canvas.setAttribute('height', window.innerHeight);

        canvasHeight = window.innerHeight
        canvasWidth = window.innerWidth
    }

    function debounce(func, time = 300) {
        var timer;
        return function (event) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(func, time, event);
        };
    }

    (function () {
        window.onresize = debounce(resize);
        resize();

        // for (let i = 0; i < dropsAmount; i++) {
        //     drops.push(new Drop());
        // }

        // // first render
        // for (let i = 0; i < dropsAmount; i++) {
        //     drops.forEach((drop) => {
        //         drop.update();
        //     });
        // }

        update();
    })();

}

inverseKinematic()