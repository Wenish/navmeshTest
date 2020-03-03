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
});


//import NavMesh from "navmesh"
/*
const navMesh = new NavMesh([])
console.log(navMesh)
*/