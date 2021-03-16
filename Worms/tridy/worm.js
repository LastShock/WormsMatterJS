class Worm {
  constructor(x, y, team, name) {
    this.x = x;
    this.y = y;
    this.width = 13;
    this.height = 15;
    this.textureMoveX = 8;
    this.textureMoveY = 23;
    this.imgEnlargeX = 20;
    this.imgEnlargeY = 15;

    this.id = wormove.length;
    this.position;
    this.animaceWorma = true;
    this.animace = 0;
    this.walkingDirection = 0;
    this.animaceJumpRight = false;
    this.animaceJumpLeft = false;
    this.prevPostion;

    this.team = team;
    this.name = name;
    this.alive = true;
    this.hp = 100;
    this.weapon = new Granat(this.id, this.x, this.y);

    this.keyboardDis = false;

    this.playing = false;
    this.attack = false;
    this.canCheckWorm = false;

    this.body = Matter.Bodies.rectangle(this.x, this.y, this.width, this.height);
    this.body.tension = 1;
    this.body.mass = 10000;
    this.body.friction = 1;
    this.body.restitution = 0;
    this.body.frictionStatic = 0.8;
    Matter.Body.setInertia(this.body, 200)

    Matter.World.add(world, this.body);


    this.maxY = 0;
    this.Ystart = 0;
    this.falling = false;
    this.move = false;

    this.falldmgOff = true;
    setTimeout(() => {
      this.static();
      this.hp = 100;

    }, 1000);
  }
  controls() {
    let id = this.id;
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

        if (e.keyCode == "16" && thisObject.move == true) {
          // throw
          for (let mapPiece = 0; mapPiece < map.length; mapPiece++) {
            if (map[mapPiece] != null) {
              var collision = Matter.SAT.collides(map[mapPiece].body, worm);
              if (collision.collided && thisObject.keyboardDis == false) {
                weapon.throw = true;
                thisObject.position = { x: thisObject.body.position.x, y: thisObject.body.position.y };
                break;
              }

            }
          }
        }
        else if (e.keyCode == "49") {
          thisObject.weapon = new Granat(id, thisObject.x, thisObject.y);
        }
        else if (e.keyCode == "50") {
          thisObject.weapon = new ContactGrenade(id, thisObject.x, thisObject.y);
        }
        else if (e.keyCode == "37") {//walk
          if (thisObject.prevPostion == worm.position.x) {
            Body.setPosition(worm, { x: worm.position.x - 2, y: worm.position.y - 1, });
          }
          else {
            Body.setPosition(worm, { x: worm.position.x - 2, y: worm.position.y, });
          }
          thisObject.animace++;
          thisObject.walkingDirection = 0;
          thisObject.prevPostion = thisObject.body.position.x;

          if (thisObject.animace == 4) {
            thisObject.animaceWorma = !thisObject.animaceWorma;
            thisObject.animace = 0;
          }
          thisObject.move = true;
        }
        else if (e.keyCode == "39") { //walk
          Body.setPosition(worm, { x: worm.position.x + 2, y: worm.position.y - 1, });
          thisObject.walkingDirection = 1;
          thisObject.animace++;
          if (thisObject.animace == 4) {
            thisObject.animaceWorma = !thisObject.animaceWorma;
            thisObject.animace = 0;
          }
          thisObject.move = true;
        }
        else if (e.keyCode == "67") { //jump

          for (let mapPiece = 0; mapPiece < map.length; mapPiece++) {
            if (map[mapPiece] != null) {
              var collision = Matter.SAT.collides(map[mapPiece].body, worm);
              if (collision.collided && thisObject.keyboardDis == false) {
                thisObject.walkingDirection = 1;
                thisObject.animaceJumpLeft = true;
                thisObject.keyboardDis = true;
                thisObject.canCheckWorm = false;
                setTimeout(function () {
                  thisObject.keyboardDis = false;
                }, 1000);
                setTimeout(() => {
                  thisObject.canCheckWorm = true;
                }, 200);
                jumping[Math.floor(Math.random() * 2)].play();
                Body.applyForce(worm, { x: worm.position.x, y: worm.position.y }, { x: 90, y: -300 });
                thisObject.move = true;
                break;
              }
            }
          }
        }
        else if (e.keyCode == "88") {//jump
          for (let mapPiece = 0; mapPiece < map.length; mapPiece++) {
            if (map[mapPiece] != null) {

              var collision = Matter.SAT.collides(map[mapPiece].body, worm);

              if (collision.collided && thisObject.keyboardDis == false) {
                thisObject.keyboardDis = true;
                thisObject.walkingDirection = 0;
                thisObject.animaceJumpRight = true;
                thisObject.canCheckWorm = false;

                setTimeout(function () {
                  thisObject.keyboardDis = false;
                }, 1000);
                setTimeout(() => {
                  thisObject.canCheckWorm = true;
                }, 200);
                jumping[Math.floor(Math.random() * 2)].play();
                Body.applyForce(worm, { x: worm.position.x, y: worm.position.y }, { x: -90, y: -300 }
                );
                thisObject.move = true;
                break;
              }
            }
          }
        }
        else if (e.keyCode == "27" && developer == true) {
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
    if (timeRemaning < 1) {
      this.SwapWorm(this.id);
    }
    fill(255, 0, 0);
    textSize(40);
    text(Math.trunc(timeRemaning), 1450, 32);
  }
  showHP() {
    const pos = this.body.position;
    if (this.team == 1) {
      push();
      fill(255, 0, 0);
      textSize(10);
      text(this.name + "- " + this.hp + " hp", pos.x - 30, pos.y - 30);
      pop();
    } else if (this.team == 2) {
      push();
      fill(0, 0, 255);
      textSize(10);
      text(this.name + "- " + this.hp + " hp", pos.x - 30, pos.y - 30);
      pop();
    }
  }
  static() {
    this.position = { x: this.body.position.x, y: this.body.position.y };
    this.staticWorm = true;
  }
  checkPosition() {
    const pos = this.body.position;
    if (pos.y > 720) {

      audioFalling.play();
      pos.x = -500 * this.id;
      Matter.Composite.remove(world, this.body);
      this.body.isStatic = true;
      this.alive = false;
      if (this.playing = this.playing) {
        this.SwapWorm(this.id);
      }

      this.hp = 0;
    }
    else if (pos.y >= 720 - water + 5) {
      pos.x = -500 * this.id;
      this.hp = 0;
      Matter.Composite.remove(world, this.body);
      if (this.playing == false) {
        this.body.isStatic = true;
        this.alive = false;
      }

      if (this.playing == true) {
        if (this.weapon.bodyCreated == true) {
          this.weapon.removeBody(this.id);

        }
        this.body.isStatic = true;
        this.alive = false;
        this.SwapWorm(this.id);
      }

    }
    else if (this.hp <= 0) {
      pos.x = -500 * this.id;
      Matter.Composite.remove(world, this.body);
      audioDying.play();
      this.body.isStatic = true;
      this.alive = false;
      if (this.playing == true) {
        this.SwapWorm(this.id);

      }

    }
  }
  show() {
    if (this.playing == true && this.staticWorm == true) {
      this.staticWorm = false;
    }
    else if (this.staticWorm == true) {
      Matter.Body.setPosition(this.body, this.position);
    }

    if (this.alive == true) {
      if (this.playing == true) {
        this.checkTeam();
        this.controls();
        this.showTime();
        this.showTeamHpBar();
        this.showPlaying(this.id);
      }
      const pos = this.body.position;
      this.showHP();
      push();
      fill("rgb(240,230,140)");
      if (this.walkingDirection == 0 && this.animaceJumpLeft == false && this.animaceJumpRight == false) {
        if (this.animaceWorma == true) {
          image(imgWormLeft, pos.x - this.textureMoveX, pos.y - this.textureMoveY, this.width + this.imgEnlargeX, this.height + this.imgEnlargeY);
        }
        else if (this.animaceWorma == false) {
          image(imgWormLeft2, pos.x - this.textureMoveX, pos.y - this.textureMoveY, this.width + this.imgEnlargeX, this.height + this.imgEnlargeY);
        }
      }
      else if (this.walkingDirection == 1 && this.animaceJumpLeft == false && this.animaceJumpRight == false) {
        if (this.animaceWorma == true) {
          image(imgWormRight, pos.x, pos.y - this.textureMoveY, this.width + this.imgEnlargeX, this.height + this.imgEnlargeY);
        }
        else if (this.animaceWorma == false) {
          image(imgWormRight2, pos.x, pos.y - this.textureMoveY, this.width + this.imgEnlargeX, this.height + this.imgEnlargeY);
        }
      }
      else if (this.animaceJumpLeft) {
        image(imgJumpLeft, pos.x, pos.y - this.textureMoveY, this.width + this.imgEnlargeX, this.height + this.imgEnlargeY);
      }
      else if (this.animaceJumpRight) {
        image(imgJumpRight, pos.x, pos.y - this.textureMoveY, this.width + this.imgEnlargeX, this.height + this.imgEnlargeY);
      }

      pop();
      this.checkPosition();

      if (this.maxY < this.body.position.y) this.maxY = this.body.position.y;

      for (let mapPiece = 0; mapPiece < map.length; mapPiece++) {
        if (map[mapPiece] != null) {
          var collision = Matter.SAT.collides(map[mapPiece].body, this.body);
          if (collision.collided) {

            if (this.canCheckWorm == true) {
              if (this.animaceJumpLeft) this.animaceJumpLeft = false;
              if (this.animaceJumpRight) this.animaceJumpRight = false;
              this.canCheckWorm = false;
            }
            if (Math.abs(this.Ystart - this.maxY) > 100) {
              this.hp = this.hp - Math.round(Math.abs(this.Ystart - this.maxY) / 10);
              audioOuch.play();
              this.falling = false;
              if (this.playing == true) this.keyboardDis = true;

              setTimeout(() => {
                if (this.playing == true) {
                  this.SwapWorm(this.id);
                  this.keyboardDis = false;
                }
              }, 500);
            }
            this.maxY = this.body.position.y;
            this.Ystart = this.body.position.y;
            break;
          }
        }
        if (collision.collided == false && this.falling == false) {
          this.keyboardDis = true;
          this.staticWorm == false;

          this.falling = true;
          this.maxY = this.body.position.y;
          this.Ystart = this.body.position.y;
        }
      }
    } else if (this.alive == false && this.playing == true) {
      this.SwapWorm(this.id);
    }
  }
  SwapWorm(idWorm) {
    if (this.weapon.wasThrowed == false) {
      this.checkTeam();
      this.move = false;
      mouseUse = false;

      time1 = new Date();
      time1.setSeconds(time1.getSeconds() + swapTime);

      setTimeout(() => {
        this.static();
      }, 5000);

      this.attack = true;
      this.playing = false;

      for (let i = idWorm; i <= wormove.length; i++) {
        if (i == wormove.length) {
          i = -1;
          continue;
        }

        if (wormove[i].id != idWorm) {
          setTimeout(() => {
            wormove[i].keyboardDis = false;
          }, 200);

          wormove[i].staticWorm = false;
          wormove[i].keyboardDis = true;
          wormove[i].playing = true;
          wormove[i].attack = false;
          this.checkTeam();

          break;
        }
        Body.applyForce(this.body, { x: this.body.position.x, y: this.body.position.y }, { x: 0, y: - 1 })
      }

    }

  }
  checkTeam() {
    let aliveTeam = 0;
    for (let i = 0; i < wormove.length; i++) {
      if (wormove[i] != null && wormove[i].team == this.team && wormove[i].alive == true) {
        aliveTeam++;
      }
    }
    if (aliveTeam == 0) {
      if (isGameOver == true) {
        alert("Team: " + this.team + " prohrál");

        startGame();
      }
      isGameOver = true;
    }
  }
  checkTime(idWorm) {
    for (let mapPiece = 0; mapPiece < map.length; mapPiece++) {
      if (map && map[mapPiece] && map[mapPiece].body) {
        var collision = Matter.SAT.collides(map[mapPiece].body, this.body);
        if (collision.collided) {
          let timeRemaning = (time1 - time2) / 1000;
          if (timeRemaning < 1) {
            this.SwapWorm(idWorm);
          }
        }
      }
    }
  }
  showTeamHpBar() {


    let hpTeam1 = 0;
    let hpTeam2 = 0;

    let wormsHpOnTeam = 100 * (wormove.length / 2);

    wormove.forEach(worm => {

      if (worm.team === 1) {
        hpTeam1 += worm.hp;
      }
      else {
        hpTeam2 += worm.hp;
      }
    })
    let teamHpPercent = (hpTeam1 / wormsHpOnTeam) * 100;

    push();
    fill('rgb(255,0,0)');
    rect(canvasWidth / 2 - 150, 0, (300 / 100) * teamHpPercent, 15);
    pop();


    teamHpPercent = (hpTeam2 / wormsHpOnTeam) * 100;

    push();
    fill('rgb(0,0,255)');
    rect(canvasWidth / 2 - 150, 15, (300 / 100) * teamHpPercent, 15);
    pop();

  }
  showPlaying(idWorm) {
    let position = wormove[idWorm].body.position

    push()
    var angle = atan2(position.y - position.y - 100, position.x - position.x - 100);
    translate(position.x, position.y - 45);
    rotate(angle - HALF_PI + 0.8);
    triangle(-10 * 0.5, 10, 10 * 0.5, 10, 0, -10 / 2);
    pop();

  }

}
