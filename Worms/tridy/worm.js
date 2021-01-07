class Worm{
    constructor(x,y,team){
        this.x = x;
        this.y=y;
        this.width=13;
        this.height=15;
        this.idFPl= wormove.length;
        this.position;

        this.team=team;
        this.alive= true;
        this.hp= 100;
        this.weapon=new Granat(this.idFPl, this.x,this.y);

        this.keyboardDis= false;
        this.inAir=false;

        this.playing=false;
        this.attack=false;

        this.body= Matter.Bodies.rectangle(this.x, this.y, this.width, this.height)
        this.body.tension=1;
        this.body.mass=10000;
        Matter.World.add(world, this.body);

    }
    
    controls(){
        
        let id = this.idFPl;
        let worm=this.body;
        let weapon = this.weapon;
        let play= this.playing;
        let attack= this.attack;
        let thisObject= this;
            
        
        this.checkTime(id);
        
            document.onkeydown = checkKey;

            function checkKey(e) {
                if(play==true && attack==false&&weapon.throw==false&&thisObject.keyboardDis==false){
                    e = e || window.event;
    
                    if(e.keyCode=='32'){// throw
                        for(let mapPiece= 0;mapPiece<map.length;mapPiece++){
                            if(map[mapPiece]!=null){
                                var collision = Matter.SAT.collides(map[mapPiece].body, worm)
                                if(collision.collided&&thisObject.keyboardDis==false){
                                    weapon.throw=true;
                                    thisObject.position={x: thisObject.body.position.x, y:thisObject.body.position.y};

                                }
                            }
                            
                        }                    
                    }
                    else if(e.keyCode=='49'){
                        thisObject.weapon=new Granat(id, thisObject.x,thisObject.y);

                    }
                    else if(e.keyCode=='50'){

                        thisObject.weapon=new Rocket(id, thisObject.x,thisObject.y);


                    }
    
                    else if (e.keyCode == '37') {
                        Body.setPosition(worm,{x: worm.position.x-2, y: worm.position.y-1})
                        animaceWorma=!animaceWorma;
    
                    }
                    else if (e.keyCode == '39') {   //walk
                        Body.setPosition(worm,{x: worm.position.x+2, y: worm.position.y-1})
                        animaceWorma=!animaceWorma;

                    }
                    else if(e.keyCode=='67'){   //jump
                            for(let mapPiece= 0;mapPiece<map.length;mapPiece++){
                                if(map[mapPiece]!=null){
                                    var collision = Matter.SAT.collides(map[mapPiece].body, worm)
                                        if(collision.collided&&thisObject.keyboardDis==false){
                                            thisObject.keyboardDis=true;
                                            setTimeout(function(){thisObject.keyboardDis=false },1800);
                                            setTimeout(function(){thisObject.inAir=false },1800);
                                            thisObject.inAir=true;
                                            Body.applyForce( worm, {x: worm.position.x, y: worm.position.y}, {x: 100.0, y:-300.5});
                                }
                            }
                        }                       
                    }
                    else if(e.keyCode=='88'){    //jump
                            for(let mapPiece= 0;mapPiece<map.length;mapPiece++){
                                if(map[mapPiece]!=null){
                                    var collision = Matter.SAT.collides(map[mapPiece].body, worm)
                                    if(collision.collided&&thisObject.keyboardDis==false){
                                        thisObject.keyboardDis=true;
                                        setTimeout(function(){thisObject.keyboardDis=false }, 1800);
                                        setTimeout(function(){thisObject.inAir=false },1800);
                                        thisObject.inAir=true;
                                        Body.applyForce( worm, {x: worm.position.x, y: worm.position.y}, {x: -100.0, y:-300.5});
                                    }
                                    else{
                                    }
                                }
                            }   
                    }
                    else if(e.keyCode=='27'){
                        thisObject.SwapWorm(id);
                    }
                    this.attack=attack;
                }
            }
        this.weapon=weapon;

    }
    showTime(){
        time2= new Date();
        let timeRemaning;
        if(swapTime+ time1.getSeconds()-time2.getSeconds()>60){
            timeRemaning=swapTime+ time1.getSeconds()-time2.getSeconds()-60
        }
       
        else timeRemaning=swapTime+ time1.getSeconds()-time2.getSeconds()
        
        
        fill(255,0,0)
        textSize(40);
        text(timeRemaning, 1450,32);
    }
    showHP(){
        const pos = this.body.position;
        if(this.team==1){
            push()
            fill(255,0,0)
            textSize(15);
            text("Team 1- " + this.hp+" hp", pos.x-30, pos.y-30);
            pop()

        }
        else if (this.team==2){
            push()
            fill(0,0,255)
            textSize(10);
            text("Team 2- " + this.hp +" hp", pos.x, pos.y-30);
            pop()

        }

    }
    static(){
        this.position={x: this.body.position.x, y:this.body.position.y};
        this.staticWorm=true;
    }
    checkPosition(){
        const pos = this.body.position;
        
        if(pos.y>730){
            pos.x=-500;
            pos.x=-100;
            this.body.isStatic=true;
            this.alive=false;
            this.SwapWorm(this.idFPl);

        }
        
        else if(pos.y>=720-water){
            pos.x=-500;
            pos.x=-100;
            if(this.playing==false){
                this.weapon.removeBody(this.idFPl);
                this.body.isStatic=true;
                this.alive=false;
            }
           
            if(this.playing==true){
                this.weapon.removeBody(this.idFPl);
                this.body.isStatic=true;
                this.alive=false;
                this.SwapWorm(this.idFPl);
            }
        }
        else if(this.hp<=0){
            pos.x=-500;
            pos.x=-100;
            this.body.isStatic=true;
            this.alive=false;
            this.SwapWorm(this.idFPl);
        }
    }
    show(){
        frameRate(60);
        this.checkTeam()

        if(this.staticWorm==true){
            Matter.Body.setPosition(this.body, this.position);

        }

        if(this.alive==true){
            push();
            if (this.playing == true) {
                this.controls();
            }
            const pos = this.body.position;
            this.showHP();
            push()
            fill('rgb(240,230,140)');
            if(animaceWorma==true){
                image(imgWorm,pos.x,pos.y-25, this.width+20, this.height+15);

            }
            else if(animaceWorma==false) {

                image(imgWorm2,pos.x,pos.y-25, this.width+20, this.height+15);

            }
            pop();
            this.showTime();
            this.checkPosition();

        }
        else if(this.alive==false&&this.playing==true){
           this.SwapWorm(this.idFPl);
       }
    }
    SwapWorm(idWorm){
            time1= new Date();
            this.attack=true;
            this.playing=false;
            let team =wormove[idWorm].team

            for(let i= idWorm; i<=wormove.length;i++){
                if(i==wormove.length){
                    i=-1;
                    continue;
                }
                if(wormove[i].team!=team){
                    wormove[i].playing=true;
                    wormove[i].attack=false;
                    break;
                }
               
               
            }
    }
    checkTeam(){
        let aliveTeam = 0;
        
        for(let i =0;i<wormove.length;i++){
            if(wormove[i].team==this.team&&wormove[i].alive==true){
                aliveTeam++;
            }
        }
        if(aliveTeam==0){
            alert("Team: "+ this.team +" prohrál");
            location.reload();
        }
    }
   
    checkTime(idWorm){
            for(let mapPiece= 0;mapPiece<map.length;mapPiece++){
                if(map && map[mapPiece] && map[mapPiece].body){
                    var collision = Matter.SAT.collides(map[mapPiece].body, this.body)
                    if(collision.collided){
                        time2= new Date();
        
                        if(swapTime+ time1.getSeconds()>60){
                            if(((swapTime+ time1.getSeconds())-60)==time2.getSeconds()){
                                this.SwapWorm(idWorm);
                            }
                        }
                        else if(time1.getSeconds()+swapTime== time2.getSeconds()){
                                this.SwapWorm(idWorm);
                            }
                        }
                }
               
                }
    }
}


