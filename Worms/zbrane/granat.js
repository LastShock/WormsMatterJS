class Granat {

    constructor(idWorma, x, y) {
        this.name = "granat"

        this.idWorm = idWorma;
        this.granatX = x + 15;
        this.granatY = y + 10;

        this.dmg = 30;
        this.r = 10;

        this.slingshot;

        this.throw = false;

        this.exploded = false;

        this.inAir = false;

        this.grnInAir = false;

        this.mouse;

        this.isInside = false;

        this.bodyCreated = false;
    }

    show() {
        frameRate(60);

        if (this.throw == false) {
            push();
            fill('rgb(240,230,140)');
            if (wormove[this.idWorm].walkingDirection == 0) {
                image(imgGr, wormove[this.idWorm].body.position.x + 17, wormove[this.idWorm].body.position.y - 23, this.r + 10, this.r + 10);
            }
            else if (wormove[this.idWorm].walkingDirection == 1) {
                image(imgGr, wormove[this.idWorm].body.position.x - 5, wormove[this.idWorm].body.position.y - 23, this.r + 10, this.r + 10);
            }
            pop();
        }

        else if (this.throw == true && this.bodyCreated == false) {
            this.bodyCreated = true;
            this.bodyWeap = Matter.Bodies.circle(wormove[this.idWorm].body.position.x + 15, wormove[this.idWorm].body.position.y - 20, this.r / 2 - 9);


            Matter.World.add(world, this.bodyWeap);
            this.bodyWeap.mass = 500;
            this.bodyWeap.restitution = 0.4;


            this.slingshot = new SlingShot(wormove[this.idWorm].body.position.x + 15, wormove[this.idWorm].body.position.y - 46, this.bodyWeap);

            this.mouse = Mouse.create(canvas.elt);
            const options = {
                mouse: this.mouse
            };
            this.mouse.pixelRatio = pixelDensity();

            this.mConstraint = MouseConstraint.create(engine, options);
            World.add(world, this.mConstraint);

        }
        else if (this.throw == true && this.bodyCreated == true) {
            this.slingshot.show();
            Matter.Body.setPosition(wormove[this.idWorm].body, wormove[this.idWorm].position)

            push();
            fill('rgb(240,230,140)');
            image(imgGr, this.bodyWeap.position.x - 10, this.bodyWeap.position.y - 5, this.r + 10, this.r + 10);
            pop();
            if (this.grnInAir == true) {
                Body.applyForce(this.bodyWeap, { x: this.bodyWeap.position.x, y: this.bodyWeap.position.y }, { x: wind, y: 0 });

            }



            if (this.inAir == true) {
                for (let mapPiece = 0; mapPiece < map.length; mapPiece++) {
                    if (map[mapPiece] != null) {

                        var collision = Matter.SAT.collides(map[mapPiece].body, this.bodyWeap)

                        if (collision.collided) {
                            this.grnInAir = false;
                        }

                    }
                }
            }
            for (let worm = 0; worm < wormove.length; worm++) {
                var collision = Matter.SAT.collides(wormove[worm].body, this.bodyWeap)
                if (collision.collided) {
                    wormove[worm].static();
                    setTimeout(() => {
                        wormove[worm].staticWorm = false;
                    }, 200)
                }
            }


            let position = this.bodyWeap.position;
            if (position.x > 1900 || position.x < 0 || position.y > 800 || position.y < -200) {
                Matter.Composite.remove(world, this.bodyWeap)
                this.bodyCreated = false;
                this.throw = false;
                this.inAir = false;
                wormove[this.idWorm].SwapWorm(this.idWorm);
            }


        }

        if (this.checkTime(this.idWorm) && this.bodyCreated == true) {
            Matter.Composite.remove(world, this.bodyWeap)
            this.bodyCreated = false;
            this.throw = false;
            this.inAir = false;
            wormove[this.idWorm].SwapWorm(this.idWorm);
        }
    }
    showExplosion() {
        push();
        image(imgExplosion, this.explosionX - 25, this.explosionY - 25, 50, 50);
        pop();
    }
    explode(idWorm) {

        audio.play();

        this.exploded = true;
        this.explosionX = this.bodyWeap.position.x;
        this.explosionY = this.bodyWeap.position.y;

        setTimeout(() => {
            this.exploded = false;
        }, 500)

        let positionGranat = this.bodyWeap.position;


        wormove[idWorm].weapon.bodyCreated = false;
        wormove[idWorm].weapon.throw = false;
        wormove[idWorm].weapon.inAir = false;
        wormove[idWorm].SwapWorm(idWorm);

        Matter.Composite.remove(world, wormove[idWorm].weapon.bodyWeap)

        let radius = 150;
        let dmgDone = false;



        for (let i = 0; i < wormove.length; i++) {
            let arg1 = (wormove[i].body.position.x - positionGranat.x) * (wormove[i].body.position.x - positionGranat.x);
            let arg2 = (wormove[i].body.position.y - positionGranat.y) * (wormove[i].body.position.y - positionGranat.y);
            let isInside = Math.sqrt(arg1 + arg2);

            if (isInside <= radius && dmgDone == false) {
                if (positionGranat.x > wormove[i].body.position.x) {
                    if (wormove[i].staticWorm == true) {
                        wormove[i].staticWorm = false;
                    }
                    let random = 1 - (positionGranat.x - wormove[i].body.position.x) / radius;
                    Body.applyForce(wormove[i].body, { x: wormove[i].body.position.x, y: wormove[i].body.position.y }, { x: -100 * random, y: -300 * random });
                    let dmg = random * 30;
                    dmg = Math.trunc(dmg)
                    wormove[i].hp -= dmg;
                    dmgDone == true;

                }
                else if (positionGranat.x < wormove[i].body.position.x) {
                    if (wormove[i].staticWorm == true) {
                        wormove[i].staticWorm = false;
                    }
                    let random = 1 + (positionGranat.x - wormove[i].body.position.x) / radius;
                    Body.applyForce(wormove[i].body, { x: wormove[i].body.position.x, y: wormove[i].body.position.y }, { x: 100 * random, y: -300 * random });
                    let dmg = random * 30;
                    dmg = Math.trunc(dmg)
                    wormove[i].hp -= dmg;
                    dmgDone == true;


                }


            }


        }
        if (destructionOn == true) {
            for (let mapPiece = 0; mapPiece < map.length; mapPiece++) {
                if (map[mapPiece] != null) {

                    var collision = Matter.SAT.collides(map[mapPiece].body, this.bodyWeap)

                    if (collision.collided) {
                        random.destroy(map[mapPiece], positionGranat.x, positionGranat.y)

                    }
                }
            }

        }



    }
    removeBody(idWorm) {
        if (this.bodyCreated == true) {
            wormove[idWorm].weapon.bodyCreated = false;
            wormove[idWorm].weapon.throw = false;
            wormove[idWorm].weapon.inAir = false;
            Matter.Composite.remove(world, wormove[idWorm].weapon.bodyWeap)
        }
    }
    checkTime(idWorm) {
        for (let mapPiece = 0; mapPiece < map.length; mapPiece++) {
            if (map && map[mapPiece] && map[mapPiece].body) {
                var collision = Matter.SAT.collides(map[mapPiece].body, wormove[idWorm].body)
                if (collision.collided) {
                    time2 = new Date();

                    if (swapTime + time1.getSeconds() > 60) {
                        if (swapTime + time1.getSeconds() - 60 == time2.getSeconds()) {
                            return true;
                        }
                    }
                    else if (time1.getSeconds() + swapTime == time2.getSeconds()) {
                        return true;

                    }
                }
            }

        }
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

                if (wormove[i].weapon.isInside == true) {

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
                        }, 200);


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
            if (isInside < 50) {
                wormove[i].weapon.isInside = true;
            }
        }
    }
}