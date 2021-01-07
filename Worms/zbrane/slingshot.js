class SlingShot{
    constructor(x,y,body){
        const options={ 
            pointA:{
                x:x,
                y:y
            },
            bodyB: body,
            stiffness: 0.1,
            length: 10
        }
        this.sling = Constraint.create(options)
        World.add(world, this.sling)
    }

    detach(){
        this.sling.bodyB= null;
    }

    show(){
        if(this.sling.bodyB){
            const posA= this.sling.pointA;
            const posB= this.sling.bodyB.position;
            line(posA.x, posA.y, posB.x, posB.y)
        }
        
    }
    attach(body){
        this.sling.bodyB= body;
    }
}