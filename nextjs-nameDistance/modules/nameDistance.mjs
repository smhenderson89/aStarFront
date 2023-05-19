/* 
LOGIC

Use sliceName.js to determine intial list of characters for names
Use Astar.js file to determine distance travaled for each letter between names
Return the sum total of those distances as a final value

*/

// Import helper functions
import { Astar } from './Astar.mjs';
import { sliceName } from './sliceName.mjs';

function nameDistance (name, keyboard) {
    let nameArray = sliceName(name)
    let totalDistance = 0;
    let distanceArray = []
    let distanceObject = [{"name" : name}]
    for (let i = 0; i < nameArray.length; i++) {
        let startLetter = nameArray[i][0]
        let endLetter = nameArray[i][1]
        distanceArray = Astar(startLetter, endLetter, keyboard)
        totalDistance += distanceArray[0]
        distanceObject.push({
            "start" : startLetter,
            "end" : endLetter,
            "distance" : distanceArray[0],
            "path" : distanceArray[1] 
        })
    }
    distanceObject.push({"totalDistance" : totalDistance})

    console.log(`Keyboard: ${keyboard}, JSON Object for ${name} is: `)
    console.log(distanceObject)
    return distanceObject // return object to express route
}

// nameDistance('supercalifragilisticexpialidocious', 'dvorak')

export default nameDistance


