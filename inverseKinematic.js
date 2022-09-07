
let seg

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
        angle = 0;
        len;
        parent = null;
        child = null;
        constructor({ parent, x, y, len, angle, ctx }) {
            this.len = len
            this.angle = angle
            this.ctx = ctx

            if (parent) {
                this.parent = parent
                this.a.x = parent.b.x
                this.a.y = parent.b.y
                // this.follow(parent.a.x, parent.b.y)
            } else {
                this.a.x = x
                this.a.y = y
            }
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


            let dir, targetX, targetY

            if (tx === undefined && ty === undefined) {
                dir = {
                    x: tx - this.a.x,
                    y: ty - this.a.y
                }
            } else {
                if(!this.child) debugger
              targetX = this.child.a.x
              targetY = this.child.a.y  
              this.follow(targetX, targetY)
            }

//check error here
            if (tx && ty) {
                this.angle = Math.atan2(dir.y, dir.x)

                //current Magnitude. (length of the vector)
                let currentMagnitude = Math.sqrt(dir.x * dir.x + dir.y * dir.y)
                //updates vector Magnitude
                dir.x = dir.x * this.len / currentMagnitude
                dir.y = dir.y * this.len / currentMagnitude
                //invert vector direction
                dir.x *= -1
                dir.y *= -1

                //actualizacion del punto A
                this.a = {
                    x: tx + dir.x,
                    y: ty + dir.y
                }
            }


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
            // this.ctx.fillRect(0, 0, 500, 500)
            this.paingLine()
            // this.paintHelp()
        }
    }

    // let seg2 = new Segment({ parent: seg, len: 100, angle: 10, ctx })
    let current = new Segment({ x: 200, y: 300, len: 100, angle: -45, ctx })

    for (let i = 0; i < 3; i++) {
        let next = new Segment({ parent: current, len: 100, angle: 1, ctx })
        current.child = next
        current = next
    }

    seg = current

    //general update.
    const update = () => {
        ctx.fillStyle = '#515151'
        ctx.fillRect(0, 0, 500, 500)

        let next = seg
        next.follow(mouseX, mouseY)
        next = next.parent
        while (next != null) {
            next.update()
            next.show()
            next.follow()
            next = next.parent
        }

        // seg.update()
        // seg.show()

        // seg2.follow(mouseX, mouseY)
        // seg2.update()
        // seg2.show()

        // seg2.follow(mouseX, mouseY)
        // seg.follow(seg2.a.x, seg2.a.y)
        setTimeout(update, 16);
    };

    //canvas size update.
    // function resize() {
    //     canvas.setAttribute('width', window.innerWidth);
    //     canvas.setAttribute('height', window.innerHeight);

    //     canvasHeight = window.innerHeight
    //     canvasWidth = window.innerWidth
    // }

    (function () {
        // window.onresize = debounce(resize);
        // resize();
        canvas.addEventListener('mousemove', (event) => {
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