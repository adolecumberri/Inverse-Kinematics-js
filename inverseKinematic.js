
function inverseKinematic() {

    let startTime = new Date().getTime(); //timer starts
    let canvas = document.getElementById("canvas"); //create canvas
    let ctx = canvas.getContext("2d");

    let mouseX
    let mouseY
    
    canvas.style.backgroundColor = '#515151'
    // ctx.fillStyle = '#ffffff';

    class Segment {
        //a and b are points of vector.
        a = { x: 0, y: 0 }; //Pvector
        b = { x: 0, y: 0 }; //Pvector
        angle;
        len;
        constructor({ x, y, len, angle, ctx }) {
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

        paingLine() {
            this.ctx.beginPath()
            this.ctx.moveTo(this.a.x, this.a.y)
            this.ctx.lineTo(this.b.x, this.b.y)
            this.ctx.lineWidth = 4
            ctx.strokeStyle = "#FFFFFF";
            this.ctx.stroke()
        }

        //target X and target Y
        follow(tx, ty) {
            let dir = {
                x: tx - this.a.x,
                y: ty - this.a.y
            }

            if(mouseX && mouseY)
            this.angle = Math.atan2(ty - this.a.y, tx - this.a.x)
        }
        update() {
            this.calculateB()
        }

        paintHelp() {
            //letras
            this.ctx.font = "16px Arial";
            ctx.fillStyle = "#ffffff";
            this.ctx.fillText("A", this.a.x - 8, this.a.y - 8);
            this.ctx.fillText("B", this.b.x - 8, this.b.y - 8);
            this.ctx.fillText(`(${mouseX},${mouseY})`, mouseX, mouseY)


            this.ctx.beginPath()
            this.ctx.moveTo(this.a.x, this.a.y)
            this.ctx.lineTo(mouseX, mouseY)
            this.ctx.lineWidth = 1
            ctx.strokeStyle = "#FFFFFF";
            this.ctx.stroke()
            this.ctx.beginPath()
            this.ctx.moveTo(this.b.x, this.b.y)
            this.ctx.lineTo(mouseX, mouseY)

            this.ctx.lineWidth = 1
            ctx.strokeStyle = "#FFFFFF";
            this.ctx.stroke()
        }
        show() {
            this.ctx.fillRect(0, 0, 500, 500)
            this.paingLine()
            this.paintHelp()
        }
    }

    let seg = new Segment({ x: 200, y: 300, len: 100, angle: 0, ctx })

    //general update.
    const update = () => {
        ctx.fillStyle = '#515151'
        // seg.follow(mouseX, mouseY)
        seg.update()
        seg.show()
        setTimeout(update, 16);
    };

    //canvas size update.
    // function resize() {
    //     canvas.setAttribute('width', window.innerWidth);
    //     canvas.setAttribute('height', window.innerHeight);

    //     canvasHeight = window.innerHeight
    //     canvasWidth = window.innerWidth
    // }

    function debounce(func, time = 300) {
        var timer;
        return function (event) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(func, time, event);
        };
    }

    (function () {
        // window.onresize = debounce(resize);
        // resize();
        canvas.addEventListener('mousemove', (event) => {
            console.log(event)
            mouseX = event.offsetX
            mouseY = event.offsetY
        });
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