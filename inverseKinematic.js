

function inverseKinematic() {
    let tail
    let canvas = document.getElementById("canvas"); //create canvas
    let ctx = canvas.getContext("2d");

    let mouseX = 0
    let mouseY = 0

    canvas.style.backgroundColor = '#515151'

    class Segment {
        //a and b are points of vector.
        a = { x: 0, y: 0 } //Pvector
        b = { x: 0, y: 0 } //Pvector
        len
        parent = null
        child = null
        id = undefined
        stokeWeight = undefined
        constructor({ parent, x, y, len, ctx, id, stokeWeight = 2 }) {
            this.len = len
            this.angle = 0
            this.ctx = ctx
            this.id = id
            this.stokeWeight = stokeWeight

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
            this.ctx.lineWidth = this.stokeWeight
            ctx.strokeStyle = "#FFFFFF";
            this.ctx.stroke()
        }

        //target X and target Y
        follow(tx, ty) {

            let dir = {
                x: tx - this.a.x,
                y: ty - this.a.y
            } // target - a

            this.angle = Math.atan2(dir.y, dir.x)
            let currentMagnitude = Math.sqrt(dir.x * dir.x + dir.y * dir.y)
            //updates vector Magnitude
            dir.x = dir.x * this.len / currentMagnitude
            dir.y = dir.y * this.len / currentMagnitude
            //invert vector direction
            dir.x *= -1
            dir.y *= -1

            this.a = {
                x: tx + dir.x,
                y: ty + dir.y
            }


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
            this.calculateB()
            this.paingLine()
            // this.paintHelp()
        }
    }

    let create = () => {
        let current = new Segment({ x: 400, y: 400, len: 5, ctx, id: -1, stokeWeight: 0 })
        for (let i = 0; i < 100; i++) {
            let next = new Segment({ parent: current, len: 5, ctx, id: i, stokeWeight: i / 10 })
            current.child = next
            current = next
        }
        tail = current; // saved the last one
    }

    //general update.
    const update = () => {
        ctx.fillStyle = '#515151'
        //reset canvas each frame before paint it
        ctx.fillRect(0, 0, 500, 500)

        //tail is the last one
        tail.follow(mouseX, mouseY)
        tail.show()
        let next = tail.parent
        //this runs the segment backwards
        while (next != null) {
            if (next.child === null) debugger
            next.follow(next.child.a.x, next.child.a.y)
            next.show()
            next = next.parent
        }

        setTimeout(update, 16);
    };

    (function () {
        canvas.addEventListener('mousemove', (event) => {
            mouseX = event.offsetX
            mouseY = event.offsetY
        });
        create()
        update()
    })()

}

inverseKinematic()
