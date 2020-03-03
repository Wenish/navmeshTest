import fs from 'fs-extra'
import wavefrontObjParser from 'wavefront-obj-parser'
import NavMesh from "navmesh";

fs.readFile('./src/map.obj', 'utf8', function(err, data) {
    if (err) throw err;
    console.log(data);
    var parsedJSON = wavefrontObjParser(data)
    console.log(parsedJSON)
    fs.writeJson('./src/map.json', parsedJSON, {
        spaces: 2
    })
    /*
    const meshPolygonPoints = [
        [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 10 }], // Polygon 1
        [{ x: 10, y: 0 }, { x: 20, y: 0 }, { x: 20, y: 10 }, { x: 10, y: 10 }], // Polygon 2
        [{ x: 10, y: 10 }, { x: 20, y: 10 }, { x: 20, y: 20 }, { x: 10, y: 20 }] // Polygon 3
    ];
    */
    const meshPolygonPoints = []
    const vertexPositions = parsedJSON.vertexPositions
    const array = parsedJSON.vertexPositionIndices
    for (let index = 0; index < array.length; index += 4) {
        const aIndex = array[index];
        const bIndex = array[index + 1]
        const cIndex = array[index + 2]
        meshPolygonPoints.push([
            {
                x: vertexPositions[aIndex * 3],
                y: vertexPositions[(aIndex * 3) + 2]
            },
            {
                x: vertexPositions[bIndex * 3],
                y: vertexPositions[(bIndex * 3) + 2]
            },
            {
                x: vertexPositions[cIndex * 3],
                y: vertexPositions[(cIndex * 3) + 2]
            }            
        ])
    }
    fs.writeJson('./src/meshPolygonPoints.json', meshPolygonPoints, {
        spaces: 2
    })

    const navMesh = new NavMesh(meshPolygonPoints);
    console.log(navMesh)
    console.time('pathfinding')
    const path = navMesh.findPath({ x: 3, y: 2 }, { x: 8, y: 8 });
    console.timeEnd('pathfinding')
    console.log(path)
    fs.writeJson('./src/path.json', path, {
        spaces: 2
    })
});
