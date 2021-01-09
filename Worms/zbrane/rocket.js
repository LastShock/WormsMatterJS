class Rocket {

    constructor(idWorma, x, y) {
        this.name = "Rocket";

        this.idWorm = idWorma;
        this.granatX = x + 15;
        this.granatY = y + 10;

        this.dmg = 30;
        this.r = 10;

        this.slingshot;

        this.throw = false;

        this.inAir = false;

        this.grnInAir = false;

        this.mouse;

        this.isInside = false;

        this.bodyCreated = false;
    }

    show() {
        frameRate(144);

        if (this.throw == false) {
            push();
            fill('rgb(240,230,140)');
            image(imgRedGr, wormove[this.idWorm].body.position.x + 15, wormove[this.idWorm].body.position.y - 20, this.r + 10, this.r + 10);
            pop();
        }
        else if (this.throw == true && this.bodyCreated == false) {
            this.bodyCreated = true;
            this.bodyWeap = Matter.Bodies.circle(wormove[this.idWorm].body.position.x + 15, wormove[this.idWorm].body.position.y - 20, this.r / 2 + 10);
            this.bodyWeap.mass = 500;
            this.bodyWeap.restitution = 0.4;

            Matter.World.add(world, this.bodyWeap);

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
            Matter.Body.setPosition(wormove[this.idWorm].body, wormove[this.idWorm].position)

            this.slingshot.show();
            push();
            fill('rgb(240,230,140)');
            image(imgRedGr, this.bodyWeap.position.x - 10, this.bodyWeap.position.y - 5, this.r + 10, this.r + 10);
            pop();
            if (this.grnInAir == true) {
                Body.applyForce(this.bodyWeap, { x: this.bodyWeap.position.x, y: this.bodyWeap.position.y }, { x: wind, y: 0 });

            }


            if (this.inAir == true) {
                for (let mapPiece = 0; mapPiece < map.length; mapPiece++) {
                    if (map[mapPiece] != null) {

                        var collision = Matter.SAT.collides(map[mapPiece].body, this.bodyWeap)

                        if (collision.collided) {
                            this.explode(this.idWorm)
                        }
                    }
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
        fill('rgb(240,230,140)');
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



        for (let i = 0; i < wormove.length; i++) {
            let arg1 = (wormove[i].body.position.x - positionGranat.x) * (wormove[i].body.position.x - positionGranat.x);
            let arg2 = (wormove[i].body.position.y - positionGranat.y) * (wormove[i].body.position.y - positionGranat.y);
            let isInside = Math.sqrt(arg1 + arg2);

            if (isInside <= radius) {
                if (positionGranat.x > wormove[i].body.position.x) {
                    let random = 1 - (positionGranat.x - wormove[i].body.position.x) / radius;
                    Body.applyForce(wormove[i].body, { x: wormove[i].body.position.x, y: wormove[i].body.position.y }, { x: -100 * random, y: -300 * random });
                    let dmg = random * 30;
                    dmg = Math.trunc(dmg)
                    wormove[i].hp -= dmg;

                }
                else if (positionGranat.x < wormove[i].body.position.x) {
                    let random = 1 + (positionGranat.x - wormove[i].body.position.x) / radius;
                    Body.applyForce(wormove[i].body, { x: wormove[i].body.position.x, y: wormove[i].body.position.y }, { x: 100 * random, y: -300 * random });
                    let dmg = random * 30;
                    dmg = Math.trunc(dmg)
                    wormove[i].hp -= dmg;


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
        wormove[idWorm].weapon.bodyCreated = false;
        wormove[idWorm].weapon.throw = false;
        wormove[idWorm].weapon.inAir = false;
        Matter.Composite.remove(world, wormove[idWorm].weapon.bodyWeap)
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
