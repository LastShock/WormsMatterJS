class SlingShot {
    constructor(x, y, body, mouse, idWorm) {
        const options = {
            pointA: {
                x: x,
                y: y
            },
            bodyB: body,
            stiffness: 0.1,
            length: 1
        }

        this.mouse = mouse;
        this.mouseXStart = this.mouse.mouseupPosition.x;
        this.mouseYStart = this.mouse.mouseupPosition.y;

        this.bodyAttach = body;
        this.positionSet = false;
        this.positionOfB;
        this.isLimited = false;

        this.idWorm = idWorm;

        this.sling = Constraint.create(options);
        World.add(world, this.sling);


    }

    detach() {


        if (this.isLimited == true) {
            console.log(this.sling.length)
            if (this.sling.length >= 30) {
                this.sling.stiffness = 0.15
                this.sling.length = 0.5;
            }
            setTimeout(() => {
                this.sling.bodyB = null;
            }, 20)
        }
        else {
            this.sling.bodyB = null;
        }

        var skap = new Audio('sounds/skap.mp3');
        setTimeout(() => {
            skap.play();
        }, 500)



    }

    show() {
        if (buggyclick == true) {
            this.sling.stiffness = 1;
            this.sling.length = 1
            setTimeout(() => {
                this.sling.stiffness = 0.1;
            })
            buggyclick = false;
        }
        else if (this.sling.bodyB) {
            const posA = this.sling.pointA;
            const posB = this.sling.bodyB.position;
            if (Math.abs(posA.x - posB.x) >= 30 || Math.abs(posA.y - posB.y) >= 30) {

                this.sling.stiffness = 1;
                this.sling.length = 30;
                this.isLimited = true;
                buggyclick = false;

            }
            else if (this.isLimited == false) {
                buggyclick = false;
                this.sling.stiffness = 0.1;
                this.sling.length = 1;
            }

            line(posA.x, posA.y, posB.x, posB.y)
        }

    }
    attach(body) {
        this.sling.bodyB = body;
    }
}
function mouseReleased() {

    let indexPlayingWorm;
    let positonMouse;
    for (let i = 0; i < wormove.length; i++) {
        if (wormove[i].playing == true) {
            indexPlayingWorm = i;
            if (wormove[indexPlayingWorm].weapon.bodyCreated == true) {
                positonMouse = wormove[indexPlayingWorm].weapon.mouse.position;

            }
            break;

        }
    }


    if (mouseUse == false && wormove[indexPlayingWorm].weapon.isInside == true) {

        mouseUse = true;
        setTimeout(() => {
            mouseUse = false
        }, 2500);



        if (wormove[indexPlayingWorm].weapon.throw != false && buggyclick == false && mouseUse == true) {

            setTimeout(() => {
                wormove[indexPlayingWorm].weapon.slingshot.detach();
                wormove[indexPlayingWorm].weapon.bodyWeap.isSensor = false;

            }, 20);


            setTimeout(() => {
                mouseDis = false;
            }, 500);
            if (wormove[indexPlayingWorm].weapon.name == "granat") {
                wormove[indexPlayingWorm].weapon.wasThrowed = true;
                setTimeout(() => {
                    wormove[indexPlayingWorm].weapon.explode(indexPlayingWorm);

                }, 2500);
            }
            else if (wormove[indexPlayingWorm].weapon.name = "Rocket") {
                wormove[indexPlayingWorm].weapon.wasThrowed = true;


                setTimeout(() => {
                    wormove[indexPlayingWorm].weapon.inAir = true;
                    wormove[indexPlayingWorm].weapon.grnInAir = true;
                }, 50);


            }


            setTimeout(() => {
                wormove[indexPlayingWorm].weapon.inAir = true;
                wormove[indexPlayingWorm].weapon.grnInAir = true;
            }, 200);

            wormove[indexPlayingWorm].isInside = false;

            wormove[indexPlayingWorm].weapon.mouse == null;



            Matter.Composite.remove(world, wormove[indexPlayingWorm].weapon.mConstraint);
        }
        else {
            if (!wormove[indexPlayingWorm].bodyWeap) {
                wormove[indexPlayingWorm].bodyWeap.slingshot.length == 1;
                wormove[indexPlayingWorm].bodyWeap.slingshot.stiffness = 0.1;
            }




        }

    }

}
function mousePressed() {
    buggyclick = false;

    for (let i = 0; i < wormove.length; i++) {


        if (wormove[i].playing == true && wormove[i].weapon.bodyCreated == true) {
            let positonMouse = wormove[i].weapon.mouse.position;

            let positionGranat = wormove[i].weapon.bodyWeap.position;
            let arg1 = (positionGranat.x - positonMouse.x) * (positionGranat.x - positonMouse.x);
            let arg2 = (positionGranat.y - positonMouse.y) * (positionGranat.y - positonMouse.y);
            let isInside = Math.sqrt(arg1 + arg2);




            if (mouseUse == false) {
                if (wormove[i].playing == true && wormove[i].weapon.bodyCreated == true) {

                    if (isInside < 8) {
                        wormove[i].weapon.isInside = true;
                        buggyclick = false;


                    }
                    else {

                        buggyclick = true;
                        mouseUse = false;
                    }

                    break;
                }
            }

        }
        else {
            if (wormove[i].weapon.bodyCreated == true) {
                buggyclick = true;
            }
        }
    }

}