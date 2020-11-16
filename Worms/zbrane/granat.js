class Granat{
    constructor(idWorma,x,y) {
        this.name= "granat"

        this.idWorm= idWorma;
        this.granatX= +15;
        this.granatY= y+10;

        this.dmg=30;
        this.r=10;

        this.throwX=0;
        this.throwY=0;

        this.throw=false;
        this.body= Matter.Bodies.circle(this.granatX,this.granatY,this.r/2);
        Matter.World.add(world, this.body);

    }

    show(){
        if(this.throw==false){
            this.body.position.x=wormove[this.idWorm].body.position.x+15;
            this.body.position.y=wormove[this.idWorm].body.position.y-15;
        }
        for(let mapPiece= 0;mapPiece<map.length;mapPiece++){
                if(map[mapPiece]!=null){
                    var collision = Matter.SAT.collides(map[mapPiece].body, this.body)
                    if(collision.collided){
                        wormove[this.idWorm].weapon= new Granat(this.idWorm,wormove[this.idWorm].x,wormove[this.idWorm].y)
                        this.body.position.x=wormove[this.idWorm].body.position.x+15;
                        this.body.position.y=wormove[this.idWorm].body.position.y-15;
                    }
                    else{
                    }

                }


        }


        const pos= this.body.position;
        push();
        fill('rgb(240,230,140)');
        circle(pos.x ,pos.y, this.r);
        pop();
    }
}
