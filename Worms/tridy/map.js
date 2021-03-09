class Map {
    constructor(verticies, x, y) {

        this.id = map.length;

        this.verticies = verticies;
        this.x = x;
        this.y = y


        let verticies1 = Matter.Vertices.fromPath(verticies);


        this.souradnice = verticies1;
        if (this.x == 0 && this.y == 0) {
            let minX = 20000;
            let minY = 20000;

            this.souradnice.forEach(element => {
                if (element.x < minX) minX = element.x;
                if (element.y < minY) minY = element.y
            });
            console.log(this.souradnice);
            this.body = Matter.Bodies.fromVertices(0, 0, this.souradnice);

            if (this.body == undefined) {
                alert("Neplatný vstupní soubor. Mapa je neplatná. Hra se restartuje :)");
                StartingMap = null;
                startingPositionDefined = null;
                startGame();
            }



            let minBeforeX = 20000;
            let minAfterX = 20000;
            let minBeforeY = 20000;
            let minAfterY = 20000;
            for (let i = 0; i < this.souradnice.length; i++) {
                if (this.souradnice[i].x < minBeforeX) minBeforeX = this.souradnice[i].x
                if (this.souradnice[i].y < minBeforeY) minBeforeY = this.souradnice[i].y

            }
            for (let i = 0; i < this.body.vertices.length; i++) {
                if (this.body.vertices[i].x < minAfterX) minAfterX = this.body.vertices[i].x
                if (this.body.vertices[i].y < minAfterY) minAfterY = this.body.vertices[i].y
            }
            this.x = minAfterX - minBeforeX
            this.y = minAfterY - minBeforeY
            Matter.Body.setPosition(this.body, { x: - this.x, y: -this.y })
            this.body.isStatic = true;
            this.body.friction = 0.8;
            Matter.World.add(world, this.body);
            setTimeout(() => {
                let helper = new Destroy();
                console.log(map[this.id - 1])
                helper.destroyPol(map[this.id], this.x, this.y, true)
                config = null;

            }, 200)


            this.P5x = 0
            this.P5y = 0


        }
        else {
            this.body = Matter.Bodies.fromVertices(this.x, this.y, this.souradnice);
            this.body.isStatic = true;
            this.body.friction = 0.8;

            Matter.World.add(world, this.body);


            let minBeforeX = 20000;
            let minAfterX = 20000;
            let minBeforeY = 20000;
            let minAfterY = 20000;
            for (let i = 0; i < this.souradnice.length; i++) {
                if (this.souradnice[i].x < minBeforeX) minBeforeX = this.souradnice[i].x
                if (this.souradnice[i].y < minBeforeY) minBeforeY = this.souradnice[i].y

            }
            for (let i = 0; i < this.body.vertices.length; i++) {
                if (this.body.vertices[i].x < minAfterX) minAfterX = this.body.vertices[i].x
                if (this.body.vertices[i].y < minAfterY) minAfterY = this.body.vertices[i].y
            }
            this.P5x = minAfterX - minBeforeX
            this.P5y = minAfterY - minBeforeY

        }


    }
    show() {

        push();
        beginShape();
        fill('rgb(0,255,0)');
        stroke('brown');
        strokeWeight(2)
        for (let i = 0; i < this.souradnice.length; i++) {
            vertex(this.souradnice[i].x + this.P5x, this.souradnice[i].y + this.P5y);
        }
        vertex(this.souradnice[0].x + this.P5x, this.souradnice[0].y + this.P5y);

        endShape();
        pop();
    }

}


