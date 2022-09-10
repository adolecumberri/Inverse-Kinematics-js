
# inverse kinematics

inverse kinematics done un pure vanilla JS for canvas.

Without libraries!!!

## Screenshots

<img src="/test.PNG" alt="ex2"/>

## Usage/Examples

Use the class Segment and...

### 1º Create the string
```javascript
//create last segment of the string
let tail;
//creates X (100) segments and link them better parent/child properties.
let create = () => {
        let current = new Segment({ x: 400, y: 400, len: 5, ctx, id: -1, stokeWeight: 0 })
        for (let i = 0; i < 100; i++) {
            let next = new Segment({ parent: current, len: 5, ctx, id: i, stokeWeight: i / 10 })
            current.child = next
            current = next
        }
        tail = current; // saved the last one
    }
}
```

### 2º Create the update function
```javascript 
  //general update.
    const update = () => {
        ctx.fillStyle = '#515151'
        //reset canvas each frame before paint it
        ctx.fillRect(0, 0, 500, 500)

        //tail is the last one after the create function has been used
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

        setTimeout(update, 16)
    }
```
  
  ### 3º Loop function launcher
```javascript
    (function () {
        canvas.addEventListener('mousemove', (event) => {
            mouseX = event.offsetX
            mouseY = event.offsetY
        });
        create()
        update()
    })()

}
```
# Based on:

https://www.youtube.com/watch?v=hbgDqyy8bIw&ab_channel=TheCodingTrain