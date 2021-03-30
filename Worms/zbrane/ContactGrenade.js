class ContactGrenade {

    constructor(idWorma, x, y) {
        this.name = "Contact Grenade";

        this.idWorm = idWorma;
        this.granatX = x + 15;
        this.granatY = y + 10;
        this.enlargeGranate = 0;


        this.dmg = 30;
        this.r = 20;

        this.slingshot;

        this.throw = false;
        this.wasThrowed = false;


        this.inAir = false;

        this.grnInAir = false;

        this.mouse;

        this.isInside = false;

        this.bodyCreated = false;

        this.didHit = false;
    }

    show() {
        frameRate(60);

        if (this.throw == false) {
            push();
            fill('rgb(240,230,140)');
            if (wormove[this.idWorm].walkingDirection == 0) {
                image(imgRedGr, wormove[this.idWorm].body.position.x + 17, wormove[this.idWorm].body.position.y - 23, this.r + this.enlargeGranate, this.r + this.enlargeGranate);
            }
            else if (wormove[this.idWorm].walkingDirection == 1) {
                image(imgRedGr, wormove[this.idWorm].body.position.x - 5, wormove[this.idWorm].body.position.y - 23, this.r + this.enlargeGranate, this.r + this.enlargeGranate);
            }
            if (wormove[this.idWorm].animaceJumpRight) {
                image(imgRedGr, wormove[this.idWorm].body.position.x + 17, wormove[this.idWorm].body.position.y - 23, this.r + this.enlargeGranate, this.r + this.enlargeGranate);
            }
            else if (wormove[this.idWorm].animaceJumpLeft) {
                image(imgRedGr, wormove[this.idWorm].body.position.x - 5, wormove[this.idWorm].body.position.y - 23, this.r + this.enlargeGranate, this.r + this.enlargeGranate);
            }
            pop();
        }
        else if (this.throw == true && this.bodyCreated == false) {
            this.bodyCreated = true;
            this.bodyWeap = Matter.Bodies.circle(wormove[this.idWorm].body.position.x + 15, wormove[this.idWorm].body.position.y - 20, this.r / 2);
            Matter.World.add(world, this.bodyWeap);
            this.bodyWeap.mass = 500;
            this.bodyWeap.restitution = 0.1;
            this.bodyWeap.friction = 1;
            this.bodyWeap.frictionStatic = 1;
            this.bodyWeap.isSensor = true;


            this.mouse = Mouse.create(canvas.elt);
            const options = {
                mouse: this.mouse
            };
            this.mouse.pixelRatio = pixelDensity();

            this.mConstraint = MouseConstraint.create(engine, options);
            World.add(world, this.mConstraint);

            this.slingshot = new SlingShot(wormove[this.idWorm].body.position.x + 15, wormove[this.idWorm].body.position.y - 46, this.bodyWeap, this.mouse, this.idWorm);



        }
        else if (this.throw == true && this.bodyCreated == true) {
            Matter.Body.setPosition(wormove[this.idWorm].body, wormove[this.idWorm].position)
            const angle = this.bodyWeap.angle;

            this.slingshot.show();

            push();
            translate(this.bodyWeap.position.x, this.bodyWeap.position.y);
            rotate(angle);
            fill('rgb(240,230,140)');
            image(imgRedGr, -11, -7, this.r + this.enlargeGranate, this.r + this.enlargeGranate);
            pop();

            if (this.grnInAir == true) {
                Body.applyForce(this.bodyWeap, { x: this.bodyWeap.position.x, y: this.bodyWeap.position.y }, { x: wind, y: 0 });
                if (
                    this.bodyWeap.position.x > canvasWidth ||
                    this.bodyWeap.position.y > canvasHeight ||
                    this.bodyWeap.position.x < 0 ||
                    this.bodyWeap.position.y < 0)
                    this.explode(this.idWorm);
            }


            if (this.inAir === true) {
                for (let mapPiece = 0; mapPiece < map.length; mapPiece++) {
                    if (map[mapPiece] != null) {
                        var collision = Matter.SAT.collides(map[mapPiece].body, this.bodyWeap)
                        if (collision.collided && this.didHit === false) {
                            this.didHit = true;
                            setTimeout(() => {
                                this.explode(this.idWorm)

                            }, 40)


                        }
                    }
                }
            }

            for (let worm = 0; worm < wormove.length; worm++) {
                var collision = Matter.SAT.collides(wormove[worm].body, this.bodyWeap)
                if (collision.collided) {
                    wormove[worm].static();
                    Body.setVelocity(wormove[worm].body, { x: 0, y: -0 });
                    setTimeout(() => {
                        wormove[worm].staticWorm = false;
                    }, 100)
                }
            }



        }

        if (this.checkTime(this.idWorm) && this.bodyCreated == true) {
            if (this.wasThrowed == false) {
                if (this.inAir != true) {
                    Matter.Composite.remove(world, this.bodyWeap)
                    this.bodyCreated = false;
                    this.throw = false;
                    this.inAir = false;
                }
                else {
                    this.bodyCreated = false;
                    this.throw = false;
                    this.inAir = false;
                }
                wormove[this.idWorm].SwapWorm(this.idWorm);
            }

        }
    }
    showExplosion() {
        push();
        fill('rgb(240,230,140)');
        image(imgExplosion, this.explosionX - 25, this.explosionY - 25, 50, 50);
        pop();
    }
    explode(idWorm) {

        audioExplode.play();

        this.wasThrowed = false;
        this.explosionX = this.bodyWeap.position.x;
        this.explosionY = this.bodyWeap.position.y;
        this.slingshot = null;
        this.exploded = true;


        setTimeout(() => {
            this.exploded = false;
        }, 500)


        let positionGranat = this.bodyWeap.position;


        wormove[idWorm].weapon.bodyCreated = false;
        wormove[idWorm].weapon.throw = false;
        wormove[idWorm].weapon.inAir = false;


        let radius = 125;
        let dmgDone = false;



        for (let i = 0; i < wormove.length; i++) {
            let arg1 = (wormove[i].body.position.x - positionGranat.x) * (wormove[i].body.position.x - positionGranat.x);
            let arg2 = (wormove[i].body.position.y - positionGranat.y) * (wormove[i].body.position.y - positionGranat.y);
            let isInside = Math.sqrt(arg1 + arg2);

            if (isInside <= radius && dmgDone == false) {
                if (positionGranat.x > wormove[i].body.position.x) {
                    if (wormove[i].body.isStatic == true) {
                        wormove[i].body.isStatic = false;
                    }
                    audioOuch.play();
                    let dmgImpact = 1 - (positionGranat.x - wormove[i].body.position.x) / radius;
                    wormove[i].staticWorm = false;

                    wormove[i].walkingDirection = 1;
                    wormove[i].animaceJumpLeft = true;
                    setTimeout(() => {
                        wormove[i].canCheckWorm = true;
                    }, 800);

                    Body.applyForce(wormove[i].body, { x: wormove[i].body.position.x, y: wormove[i].body.position.y }, { x: -125 * dmgImpact, y: -350 * dmgImpact });
                    let dmg = dmgImpact * 40;
                    dmg = Math.trunc(dmg)
                    wormove[i].hp -= dmg;
                    dmgDone == true;


                }
                else if (positionGranat.x < wormove[i].body.position.x) {
                    if (wormove[i].body.isStatic == true) {
                        wormove[i].body.isStatic = false;
                    }
                    audioOuch.play();
                    let dmgImpact = 1 + (positionGranat.x - wormove[i].body.position.x) / radius;
                    wormove[i].staticWorm = false;

                    wormove[i].walkingDirection = 0;
                    wormove[i].animaceJumpRight = true;
                    setTimeout(() => {
                        wormove[i].canCheckWorm = true;
                    }, 800);

                    Body.applyForce(wormove[i].body, { x: wormove[i].body.position.x, y: wormove[i].body.position.y }, { x: 125 * dmgImpact, y: -350 * dmgImpact });
                    let dmg = dmgImpact * 40;
                    dmg = Math.trunc(dmg)
                    wormove[i].hp -= dmg;
                    dmgDone == true;


                }


            }
            Matter.Composite.remove(world, wormove[idWorm].weapon.bodyWeap);
            wormove[idWorm].SwapWorm(idWorm);

        }



        this.didHit = false;
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
