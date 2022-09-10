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