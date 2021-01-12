class Worm {
    constructor(x, y, team) {
        this.x = x;
        this.y = y;
        this.width = 13;
        this.height = 15;
        this.idFPl = wormove.length;
        this.position;
        this.animaceWorma = true;
        this.animace = 0;
        this.walkingDirection = 0;
        this.animaceJumpRight = false; 
        this.animaceJumpLeft = false; 


        this.team = team;
        this.alive = true;
        this.hp = 100;
        this.weapon = new Granat(this.idFPl, this.x, this.y);

        this.keyboardDis = false;
        this.inAir = false;

        this.playing = false;
        this.attack = false;

        this.body = Matter.Bodies.rectangle(this.x, this.y, this.width, this.height)
        this.body.tension = 1;
        this.body.mass = 10000;
        Matter.World.add(world, this.body);
        this.body.friction = 1;

    }

    controls() {

        let id = this.idFPl;
        let worm = this.body;
        let weapon = this.weapon;
        let play = this.playing;
        let attack = this.attack;
        let thisObject = this;
        this.checkTime(id);

        document.onkeydown = checkKey;

        function checkKey(e) {
            if (play == true && attack == false && weapon.throw == false && thisObject.keyboardDis == false) {
                e = e || window.event;

                if (e.keyCode == '32') {// throw
                    for (let mapPiece = 0; mapPiece < map.length; mapPiece++) {
                        if (map[mapPiece] != null) {
                            var collision = Matter.SAT.collides(map[mapPiece].body, worm)
                            if (collision.collided && thisObject.keyboardDis == false) {
                                weapon.throw = true;
                                thisObject.position = { x: thisObject.body.position.x, y: thisObject.body.position.y };

                            }
                        }

                    }
                }
                else if (e.keyCode == '49') {
                    thisObject.weapon = new Granat(id, thisObject.x, thisObject.y);

                }
                else if (e.keyCode == '50') {

                    thisObject.weapon = new Rocket(id, thisObject.x, thisObject.y);


                }
                else if (e.keyCode == '37') {   //walk
                    Body.setPosition(worm, { x: worm.position.x - 2, y: worm.position.y-1 })
                    thisObject.animace++;
                    thisObject.walkingDirection = 0;

                    if (thisObject.animace == 4) {
                        thisObject.animaceWorma = !thisObject.animaceWorma
                        thisObject.animace = 0;
                    }
                }
                else if (e.keyCode == '39') {
                    Body.setPosition(worm, { x: worm.position.x + 2, y: worm.position.y-1 })
                    thisObject.walkingDirection = 1;
                    thisObject.animace++
                    if (thisObject.animace == 4) {
                        thisObject.animaceWorma = !thisObject.animaceWorma
                        thisObject.animace = 0;
                    }
                }
                else if (e.keyCode == '67') {   //jump
                    for (let mapPiece = 0; mapPiece < map.length; mapPiece++) {
                        if (map[mapPiece] != null) {
                            var collision = Matter.SAT.collides(map[mapPiece].body, worm)
                            if (collision.collided && thisObject.keyboardDis == false) {
                                thisObject.walkingDirection = 1;
                                thisObject.animaceJumpLeft = false 
                                setTimeout(function () { thisObject.animaceJumpLeft = false }, 1000);
                                thisObject.keyboardDis = true;
                                setTimeout(function () { thisObject.keyboardDis = false }, 1000);
                                setTimeout(function () { thisObject.inAir = false }, 1800);
                                thisObject.inAir = true;
                                Body.applyForce(worm, { x: worm.position.x, y: worm.position.y }, { x: 100.0, y: -300.5 });
                            }
                        }
                    }
                }
                else if (e.keyCode == '88') {    //jump
                    for (let mapPiece = 0; mapPiece < map.length; mapPiece++) {
                        if (map[mapPiece] != null) {
                            var collision = Matter.SAT.collides(map[mapPiece].body, worm)
                            if (collision.collided && thisObject.keyboardDis == false) {
                                thisObject.keyboardDis = true;
                                thisObject.walkingDirection = 0;
                                thisObject.animaceJumpLeft = false 
                                setTimeout(function () { thisObject.animaceJumpLeft = false }, 1000);
                                setTimeout(function () { thisObject.keyboardDis = false }, 1000);
                                setTimeout(function () { thisObject.inAir = false }, 1800);
                                thisObject.inAir = true;
                                Body.applyForce(worm, { x: worm.position.x, y: worm.position.y }, { x: -100.0, y: -300.5 });
                            }
                            else {
                            }
                        }
                    }
                }
                else if (e.keyCode == '27' && devloper == true) {
                    thisObject.SwapWorm(id);
                }
                this.attack = attack;
            }
        }
        this.weapon = weapon;

    }
    showTime() {
        time2 = new Date();
        let timeRemaning = (time1 - time2) / 1000;

        fill(255, 0, 0)
        textSize(40);
        text(Math.round(timeRemaning), 1450, 32);
    }
    showHP() {
        const pos = this.body.position;
        if (this.team == 1) {
            push()
            fill(255, 0, 0)
            textSize(15);
            text("Team 1- " + this.hp + " hp", pos.x - 30, pos.y - 30);
            pop()

        }
        else if (this.team == 2) {
            push()
            fill(0, 0, 255)
            textSize(10);
            text("Team 2- " + this.hp + " hp", pos.x, pos.y - 30);
            pop()

        }

    }
    static() {
        this.position = { x: this.body.position.x, y: this.body.position.y };
        this.staticWorm = true;
    }
    checkPosition() {
        const pos = this.body.position;

        if (pos.y > 740) {
            pos.x = -500;
            pos.x = -100;
            this.body.isStatic = true;
            this.alive = false;
            this.SwapWorm(this.idFPl);

        }

        else if (pos.y >= 720 - water) {
            pos.x = -500;
            pos.x = -100;
            if (this.playing == false) {
                this.weapon.removeBody(this.idFPl);
                this.body.isStatic = true;
                this.alive = false;
            }

            if (this.playing == true) {
                this.weapon.removeBody(this.idFPl);
                this.body.isStatic = true;
                this.alive = false;
                this.SwapWorm(this.idFPl);
            }
        }
        else if (this.hp <= 0) {
            pos.x = -500;
            pos.x = -100;
            this.body.isStatic = true;
            this.alive = false;
            this.SwapWorm(this.idFPl);
        }
        this.checkTeam();
    }
    show() {
        frameRate(60);
       
        if (this.staticWorm == true) {
            Matter.Body.setPosition(this.body, this.position);

        }

        if (this.alive == true) {
            push();
            if (this.playing == true) {
                this.controls();
            }
            const pos = this.body.position;
            this.showHP();
            push()
            fill('rgb(240,230,140)');
            if (this.walkingDirection == 0 && this.animaceJumpLeft == false && this.animaceJumpRight == false) {
                if (this.animaceWorma == true) {
                    image(imgWormLeft, pos.x - 10, pos.y - 23, this.width + 20, this.height + 15);

                }
                else if (this.animaceWorma == false) {

                    image(imgWormLeft2, pos.x - 10, pos.y - 23, this.width + 20, this.height + 15);

                }
            }
            else if (this.walkingDirection == 1 && this.animaceJumpLeft == false && this.animaceJumpRight == false) {
                if (this.animaceWorma == true) {
                    image(imgWormRight, pos.x, pos.y - 23, this.width + 20, this.height + 15);
                }
                else if (this.animaceWorma == false) {
                    image(imgWormRight2, pos.x, pos.y - 23, this.width + 20, this.height + 15);
                }
            }
            else if (this.animaceJumpLeft){
                image(imgJumpLeft, pos.x, pos.y - 23, this.width + 20, this.height + 15);

            }
            else if(this.animaceJumpRight){
                image(imgJumpRight, pos.x, pos.y - 23, this.width + 20, this.height + 15);

            }

            pop();
            this.showTime();
            this.checkPosition();

        }
        else if (this.alive == false && this.playing == true) {
            this.SwapWorm(this.idFPl);
        }
        
    }
    SwapWorm(idWorm) {
        
        mouseUse = false;
        time1 = new Date();
        time1.setSeconds(time1.getSeconds() + swapTime);
        this.attack = true;
        this.playing = false;
        let team = wormove[idWorm].team;

        for (let i = idWorm; i <= wormove.length; i++) {
            if (i == wormove.length) {
                i = -1;
                continue;
            }
            if (wormove[i].team != team) {
                setTimeout(()=>{
                    wormove[i].keyboardDis = false;
                    
                }, 500)
                wormove[i].keyboardDis = true;
                wormove[i].playing = true;
                wormove[i].attack = false;
                break;
            }


        }
        this.checkTeam();
    }
    checkTeam() {
        let aliveTeam = 0;
        for (let i = 0; i < wormove.length; i++) {
            if (wormove[i].team == this.team && wormove[i].alive == true) {
                aliveTeam++;
            }
        }
        if (aliveTeam == 0) {

            if (isGameOver == true) {
                alert("Team: " + this.team + " prohrál");
                location.reload();
            }
            isGameOver = true;


        }
    }
    checkTime(idWorm) {
        for (let mapPiece = 0; mapPiece < map.length; mapPiece++) {
            if (map && map[mapPiece] && map[mapPiece].body) {
                var collision = Matter.SAT.collides(map[mapPiece].body, this.body)
                if (collision.collided) {
                    time2 = new Date();

                  
                    if (time1 <= time2 ) {
                        this.SwapWorm(idWorm);
                    }
                }
            }

        }
    }
}


