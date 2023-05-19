/* sliceName.js 
Purpose: Take a name, split it up into list of start and end letters for Astar program
*/

export function sliceName(input) {
    // Check if names are fully alpha characters and not numbers/symbols
    // Only look for paths between where the start and end are leters
    let name = input.toUpperCase();
    let x = name.length;
    let letterArray = []
    if (x == 0) {
        console.log('error name input');
    } else if (x == 1) {
        console.log('single letter name');
    } else if (x > 1) {
        for (let i = 0; i < (x - 1); i++) {
            // Use Regular expression to check start and end letter if both are characters
            if (/^[a-zA-Z]+$/.test(name[i]) && (/^[a-zA-Z]+$/.test(name[i+1]))) {
                // console.log(`${name[i]} & ${name[i+1]} are characters`)
                letterArray[i] = [name[i], name[i+1]]
            } else {
                console.log(`No, ${name[i]} is not a character`);
            }
        }
    } else {
        console.log("name length negative? how did you get this error");
    }
    // console.log(letterArray);
    return letterArray
}

/* Example Use


// exports.sliceName = sliceName;

// test = "johnathan"; 
// sliceName(test)

*/