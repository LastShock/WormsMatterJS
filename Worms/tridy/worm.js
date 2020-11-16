class Worm{
    constructor(x,y,team){
        this.x = x;
        this.y=y;
        this.width=13;
        this.height=15;
        let cou=0;

        this.team=team;
        let alive= true;
        this.hp= 100;

        this.playing=false;
        //this.weapon=new Granat(wormove.length, this.x,this.y);

        this.attack=false;

        this.body= Matter.Bodies.rectangle(this.x, this.y, this.width, this.height)
        Matter.World.add(world, this.body);

        this.idFPl= wormove.length;

    }
    controls(){
        document.onkeydown = checkKey;
        let id = this.idFPl;
        let worm=this.body;
        let weapon = this.weapon;
        let play= this.playing;
        let attack= this.attack;


        function checkKey(e) {
            if(play==true && attack==false){
                e = e || window.event;

                if (e.keyCode == '87') {
                    weapon.throwY-=0.0002;
                }
                else if (e.keyCode == '83') {
                    weapon.throwY+=0.0002;
                }
                else if(e.keyCode=='68'){
                    weapon.throwX+=0.0002;
                }
                else if(e.keyCode=='65'){
                    weapon.throwX-=0.0002;

                }

                else if(e.keyCode=='32'){
                    weapon.throw=true;
                    if(weapon.name="granat"){
                        Body.applyForce(weapon.body, {x: weapon.body.position.x, y: weapon.body.position.y}, {x: weapon.throwX, y:weapon.throwY})
                    }

                    wormove[id].attack=true;
                    wormove[id].playing=false;

                    if(id+1==wormove.length){
                        wormove[0].playing=true;
                        wormove[0].attack=false;



                    }
                    else{
                        wormove[id+1].playing=true;
                        wormove[id+1].attack=false;

                    }

                }

                else if (e.keyCode == '37') {
                    Body.setPosition(worm,{x: worm.position.x-2, y: worm.position.y})

                }
                else if (e.keyCode == '39') {
                    Body.setPosition(worm,{x: worm.position.x+2, y: worm.position.y})
                }

                else if(e.keyCode=='67'){
                   for(let mapPiece= 0;mapPiece<map.length;mapPiece++){
                        var collision = Matter.SAT.collides(map[mapPiece].body, worm)
                       if(collision.collided){
                           Body.applyForce( worm, {x: worm.position.x, y: worm.position.y}, {x: 0.0010, y:-0.006});
                       }
                       else{
                       }
                    }

                }
                else if(e.keyCode=='88'){
                    for(let mapPiece= 0;mapPiece<map.length;mapPiece++){
                        var collision = Matter.SAT.collides(map[mapPiece].body, worm)
                        if(collision.collided){
                            console.log(collision)

                            Body.applyForce( worm, {x: worm.position.x, y: worm.position.y}, {x: -0.0010, y:-0.006});
                        }
                        else{
                        }
                    }

                }


                else if(e.keyCode=='27'){
                    wormove[id].playing=false;
                    console.log(id+1==wormove.length)
                    if(id+1==wormove.length){
                        wormove[0].playing=true;
                        wormove[0].attack=false;


                    }
                    else{
                        wormove[id+1].playing=true;
                        wormove[id+1].attack=false;



                    }
                }
                this.attack=attack;

            }


        }
        this.weapon=weapon;


    }
    showHP(){
        if(this.playing==false) this.body.isStatic=true;
        else this.body.isStatic= false;
        const pos = this.body.position;
        let str;
        if(this.team==1){
            fill(255,0,0)
            textSize(15);
            text("Team 1- " + this.hp+" hp", pos.x-30, pos.y-30);

        }
        else if (this.team==2){
            fill(0,0,255)
            textSize(10);
            text("Team 2- " + this.hp +" hp", pos.x, pos.y-30);

        }

    }
    show(){
        push();
        if (this.playing == true) {
            this.controls();
        }
        const pos = this.body.position;
        this.showHP()
        push()

        fill('rgb(240,230,140)');
        rect(pos.x,pos.y-8, this.width, this.height);
        pop();

    }
}