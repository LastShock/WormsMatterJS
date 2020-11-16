class RPG{
    constructor(idWorma,x,y) {
        this.idWorm= idWorma;
        this.granatX= +15;
        this.granatY= y+10;

        this.dmg=30;
        this.r=10;

        this.throwX=0;
        this.throwY=0;

        this.throw=false;
        this.body= Matter.Bodies.rectangle(this.granatX,this.granatY,20,10);
        Matter.World.add(world, this.body);

    }
    show(){
        if(this.throw==false){
            this.body.position.x=wormove[this.idWorm].body.position.x+15;
            this.body.position.y=wormove[this.idWorm].body.position.y-15;
        }

        const pos= this.body.position;
        push();
        fill('rgb(240,230,140)');
        rect(pos.x ,pos.y, 20,10);
        pop();
    }
}