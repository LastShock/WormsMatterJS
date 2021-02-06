class SlingShot {
    constructor(x, y, body, mouse) {
        const options = {
            pointA: {
                x: x,
                y: y
            },
            bodyB: body,
            stiffness: 0.1,
            length: 1
        }
        this.pause = false;

        this.mouse = mouse;
        this.mouseXStart = this.mouse.mouseupPosition.x;
        this.mouseYStart = this.mouse.mouseupPosition.y;

        this.bodyAttach = body;
        this.positionSet = false;
        this.positionOfB;
        this.isLimited == false;

        this.sling = Constraint.create(options)
        World.add(world, this.sling)

    }

    detach() {

       
        if (this.isLimited == true){
            this.sling.stiffness = 0.1
            this.sling.length = 0.5;
            setTimeout(() => {   
                this.sling.bodyB = null;
            }, 10)
        }
        else {
            this.sling.bodyB = null;
        }

       


    }

    show() {
        if (this.sling.bodyB) {
            const posA = this.sling.pointA;
            const posB = this.sling.bodyB.position;
            if (Math.abs(posA.x - posB.x) > 30 || Math.abs(posA.y - posB.y) > 30) {

                this.sling.stiffness = 1
                this.sling.length = 30;
                this.isLimited = true;
                if (this.pause == false) this.pause = true;
                setTimeout(() => {
                    this.pause = false;
                }, 100)
            }
            
            line(posA.x, posA.y, posB.x, posB.y)
        }

    }
    attach(body) {

        this.sling.bodyB = body;
    }
}
function mouseReleased() {
    if (mouseUse == false) {
        mouseUse = true;
        setTimeout(() => {
            mouseUse = false
        }, 2500);

        for (let i = 0; i < wormove.length; i++) {
            if (wormove[i].playing == true) {

                if (wormove[i].weapon.isInside == true && mouseUse == true) {

                    setTimeout(() => {
                        wormove[i].weapon.slingshot.detach()
                    }, 10);

                    setTimeout(() => {
                        mouseDis == false;
                    }, 500);
                    if (wormove[i].weapon.name == "granat") {
                        setTimeout(() => {
                            wormove[i].weapon.explode(i);
                        }, 2500);
                    }
                    else if (wormove[i].weapon.name = "Rocket") {
                        setTimeout(() => {
                            wormove[i].weapon.inAir = true;
                            wormove[i].weapon.grnInAir = true;
                        }, 50);


                    }


                    setTimeout(() => {
                        wormove[i].weapon.inAir = true;
                        wormove[i].weapon.grnInAir = true;
                    }, 200);

                    wormove[i].isInside = false;

                    wormove[i].weapon.mouse == null;



                    Matter.Composite.remove(world, wormove[i].weapon.mConstraint)
                }

            }
        }
    }
 
}
function mousePressed() {
    for (let i = 0; i < wormove.length; i++) {
        if (wormove[i].playing == true && wormove[i].weapon.bodyCreated == true) {
            let positonMouse = wormove[i].weapon.mouse.position;


            let positionGranat = wormove[i].weapon.bodyWeap.position;
            let arg1 = (positionGranat.x - positonMouse.x) * (positionGranat.x - positonMouse.x);
            let arg2 = (positionGranat.y - positonMouse.y) * (positionGranat.y - positonMouse.y);
            let isInside = Math.sqrt(arg1 + arg2);
            if (isInside < 15) {
                wormove[i].weapon.isInside = true;
            }
        }
    }
}