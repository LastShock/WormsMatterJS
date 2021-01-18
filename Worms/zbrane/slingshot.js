class SlingShot {
    constructor(x, y, body, mouse) {
        const options = {
            pointA: {
                x: x,
                y: y
            },
            bodyB: body,
            stiffness: 0.2,
            length: 0.5
        }
        this.pause = false;

        this.mouse = mouse;
        this.mouseXStart = this.mouse.mouseupPosition.x;
        this.mouseYStart = this.mouse.mouseupPosition.y;

        this.bodyAttach = body;
        this.positionSet = false;
        this.positionOfB;

        this.sling = Constraint.create(options)
        World.add(world, this.sling)

    }

    detach() {
        this.sling.stiffness = 0.5;
        this.sling.length = 5;

        setTimeout(() => {
            this.sling.bodyB = null;
        }, 10);

    }

    show() {

        if (this.sling.bodyB) {
            const posA = this.sling.pointA;
            const posB = this.sling.bodyB.position;
            if (Math.abs(posA.x - posB.x) >= 30 || Math.abs(posA.y - posB.y) >= 30) {
              
                this.sling.stiffness = 1
                this.sling.length = 31;
                if(this.pause == false) this.pause = true;
                setTimeout(() => {
                    this.pause = false;
                }, 100)
            }
            else if (Math.abs(posA.x - posB.x) < 20 && Math.abs(posA.y - posB.y) < 20 && this.pause == false) {
                console.log("X: " + Math.abs(posA.x - posB.x))
                console.log("Y: " + Math.abs(posA.y - posB.y))
                this.sling.stiffness = 0.2;
                this.sling.length = 0.5;
            }
            line(posA.x, posA.y, posB.x, posB.y)
        }

    }
    attach(body) {

        this.sling.bodyB = body;
    }
}