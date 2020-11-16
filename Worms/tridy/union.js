class Union{
    constructor() {
        const POLYGONY = [
        ];
        let indexPoly=0;
        for(let u=0;u<map.length;u++){
            let index=0;
            const POLYGON = [
            ];
            for(let i=1; i<map[u].body.parts.length;i++){
                for(let r=0;r<map[u].body.parts[i].vertices.length;r++){
                    POLYGON[index]=[Math.trunc(map[u].body.parts[i].vertices[r].x),Math.trunc(map[u].body.parts[i].vertices[r].y)]
                    index++;
                }
            }
            POLYGONY[indexPoly]= POLYGON;
            indexPoly++;
        }
        map1 = PolygonTools.polygon.union(POLYGONY[0], POLYGONY[1],POLYGONY[2],POLYGONY[3],POLYGONY[4]);


        for(let i=0;i<POLYGONY.length;i++){
            let verticies='';
            map[i].body= null;

            for(let indexPolygonu=0;indexPolygonu<POLYGONY[i].length;indexPolygonu++){
                if(indexPolygonu+1==POLYGONY[i].length){
                    verticies+=POLYGONY[i][indexPolygonu]
                }
                else{
                    verticies+=POLYGONY[i][indexPolygonu] +","

                }

            }
            console.log(verticies);

            if(i==0){
                map[i]= new Map(verticies,400,400)
            }
            else if(i==1){
                map[i]= new Map(verticies,200,700)
            }
            else if(i==2){
                map[i]= new Map(verticies,1300,600)


            }
            else if(i==3){
                map[i]= new Map(verticies,0,500)
            }
            else if(i==4){
                map[i]= new Map(verticies,500,500)
            }
            console.log(map);
            console.log(world.bodies)
        }

    }
}