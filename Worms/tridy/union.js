class Destroy {
    constructor() {
        this.hole = [
            [500, 291],
            [491, 278],
            [483, 265],
            [481, 251],
            [482, 229],
            [489, 218],
            [506, 198],
            [516, 193],
            [532, 186],
            [559, 176],
            [572, 176],
            [584, 177],
            [606, 185],
            [618, 195],
            [631, 218],
            [637, 232],
            [640, 260],
            [636, 273],
            [625, 293],
            [599, 319],
            [556, 327],
            [528, 321]
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
    destroy(polygon, explosionX, explosionY) {
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

        var polygomClass = []
        for (let i = 0; i < polygon.souradnice.length; i++) {
            polygomClass[i] = [polygon.souradnice[i].x, polygon.souradnice[i].y]
        }

        var polygonBoom = []
        for (let i = 0; i < this.souradnice.length; i++) {
            polygonBoom[i] = [this.souradnice[i].x, this.souradnice[i].y]
        }

        let triangles = PolygonTools.polygon.subtract(polygomClass, polygonBoom);
        Matter.Composite.remove(world, polygon.body)

        let path = "";
        for (let i = 0; i < triangles[0].length; i++) {
            path += triangles[0][i][0] + "," + triangles[0][i][1] + ","
        }

        let id = polygon.id
        map[polygon.id] = new Map(path, polygon.x, polygon.y)
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

    }
    show() {

    }
}