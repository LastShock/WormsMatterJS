class Map{
    constructor(verticies,x,y){
            this.verticies =verticies;
            this.x=x;
            this.y=y


            let verticies1 = Matter.Vertices.fromPath(verticies);
            this.souradnice = verticies1;
            this.body = Matter.Bodies.fromVertices(this.x, this.y, this.souradnice);
            this.body.isStatic=true;
            Matter.World.add(world, this.body);

    }

    show(){
        push();
        beginShape();
        fill('rgb(0,255,0)');

        for(let i=1; i<this.body.parts.length;i++){
            for(let r=0;r<this.body.parts[i].vertices.length;r++){
                vertex(this.body.parts[i].vertices[r].x, this.body.parts[i].vertices[r].y);
            }
        }
        stroke('rgb(0,255,0)')
        endShape(CLOSE);
        pop();


    }
}