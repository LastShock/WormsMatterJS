class Destroy {
    constructor() {
        this.hole = [
            [484, 367],
            [481, 359],
            [479, 351],
            [479, 345],
            [484, 339],
            [492, 336],
            [497, 335],
            [507, 335],
            [513, 338],
            [516, 349],
            [516, 357],
            [514, 367],
            [503, 375]
        ]

        let random = "";
        for (let i = 0; i < this.hole.length; i++) {
            random += this.hole[i][0] + "," + this.hole[i][1] + ","
        }
        let verticies1 = Matter.Vertices.fromPath(random);
        this.souradnice = verticies1;
        this.body = Matter.Bodies.fromVertices(-500, -10000, this.souradnice);
        this.body.isStatic = true;
        Matter.World.add(world, this.body);

    }
    destroyPol(polygon, explosionX, explosionY) {
        Matter.Composite.remove(world, this.body)

        let random = "";
        for (let i = 0; i < this.hole.length; i++) {
            random += this.hole[i][0] + "," + this.hole[i][1] + ","
        }
        let verticies1 = Matter.Vertices.fromPath(random);
        this.souradnice = verticies1;
        this.body = Matter.Bodies.fromVertices(explosionX, explosionY, this.souradnice);
        this.body.isStatic = true;
        this.body.isSensor = true;
        Matter.World.add(world, this.body);

        let minBeforeX = 20000;
        let minAfterX = 20000;
        let minBeforeY = 20000;
        let minAfterY = 20000;
        for (let i = 0; i < polygon.souradnice.length; i++) {
            if (polygon.souradnice[i].x < minBeforeX) minBeforeX = polygon.souradnice[i].x
            if (polygon.souradnice[i].y < minBeforeY) minBeforeY = polygon.souradnice[i].y

        }
        for (let i = 0; i < polygon.body.vertices.length; i++) {
            if (polygon.body.vertices[i].x < minAfterX) minAfterX = polygon.body.vertices[i].x
            if (polygon.body.vertices[i].y < minAfterY) minAfterY = polygon.body.vertices[i].y
        }
        this.P5x = minAfterX - minBeforeX
        this.P5y = minAfterY - minBeforeY


        var polygomClass = []
        for (let i = 0; i < polygon.souradnice.length; i++) {
            polygomClass[i] = [polygon.souradnice[i].x + this.P5x, polygon.souradnice[i].y + this.P5y]
        }




        let boomX = this.body.vertices[0].x - this.souradnice[0].x;
        let boomY = this.body.vertices[0].y - this.souradnice[0].y;

        var polygonBoom = []
        for (let i = 0; i < this.souradnice.length; i++) {
            polygonBoom[i] = [this.souradnice[i].x + boomX, this.souradnice[i].y + boomY]
        }


        let triangles = PolygonTools.polygon.subtract(polygomClass, polygonBoom);
        Matter.Composite.remove(world, polygon.body)


        let path = "";
        for (let i = 0; i < triangles[0].length; i++) {
            path += triangles[0][i][0] + "," + triangles[0][i][1] + ","
        }

        let randomak = Matter.Vertices.fromPath(path);
        let newPolygon = [];
        for (let i = 0; i < randomak.length; i++) {
            newPolygon[i] = [randomak[i].x, randomak[i].y]
        }

        let xMove = PolygonTools.polygon.centroid(newPolygon)[0] - PolygonTools.polygon.centroid(polygomClass)[0];
        let yMove = PolygonTools.polygon.centroid(newPolygon)[1] - PolygonTools.polygon.centroid(polygomClass)[1];

        let id = polygon.id;
        let polX = polygon.x;
        let polY = polygon.y;
        map[polygon.id] = new Map(path, polX + xMove, polY + yMove)
        map[polygon.id].id = id



        Matter.Composite.remove(world, this.body)




    }
    showVerticies() {
        let randomPath = "";
        for (let i = 0; i < this.body.parts.length; i++) {
            for (let r = 0; r < this.body.parts[i].vertices.length; r++) {
                randomPath += this.body.parts[i].vertices[r].x + " ," + this.body.parts[i].vertices[r].y + ",";
            }
        }
        console.log(randomPath)
    }
    show() {
        push();
        beginShape();
        fill('rgb(0,255,0)');
        stroke('rgb(0,255,0)');
        for (let i = 0; i < this.souradnice.length; i++) {
            vertex(this.souradnice[i].x, this.souradnice[i].y);
        }
        endShape();
        pop();
    }
}