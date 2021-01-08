class Map{
    constructor(verticies,x,y){
           
            this.id=map.length;
            
            this.verticies =verticies;
            this.x=x;
            this.y=y


            let verticies1 = Matter.Vertices.fromPath(verticies);
            this.souradnice = verticies1;
            this.body = Matter.Bodies.fromVertices(this.x, this.y, this.souradnice);
            this.body.isStatic=true;
            this.body.friction =0.8;
            Matter.World.add(world, this.body);

            let minBeforeX=20000;
            let minAfterX=20000;
            let minBeforeY=20000;
            let minAfterY=20000;
            for(let i=0;i<this.souradnice.length;i++){
                if(this.souradnice[i].x<minBeforeX) minBeforeX=this.souradnice[i].x
                if(this.souradnice[i].y<minBeforeY) minBeforeY=this.souradnice[i].y

                }
            for(let i=0;i<this.body.vertices.length;i++){
                if(this.body.vertices[i].x<minAfterX) minAfterX=this.body.vertices[i].x
                if(this.body.vertices[i].y<minAfterY) minAfterY=this.body.vertices[i].y
            }
            this.P5x=minAfterX-minBeforeX
            this.P5y=minAfterY-minBeforeY

           
    }

    show(){
        
        push();
        beginShape();
        fill('rgb(0,255,0)');
        stroke('brown');
        strokeWeight(2)
        for(let i =0;i<this.souradnice.length;i++){
            vertex(this.souradnice[i].x+this.P5x, this.souradnice[i].y+this.P5y); 
        }
        vertex(this.souradnice[0].x+this.P5x, this.souradnice[0].y+this.P5y); 

        endShape();
        pop();
    }
       
}
                
        
