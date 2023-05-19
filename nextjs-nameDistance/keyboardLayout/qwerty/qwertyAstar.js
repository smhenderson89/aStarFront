// qwerty A* best route search algo

const alphaList = ['A','B','C','D','E','F','G','H','I','J','K','L','M',
                   'N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

const adjacentLettersObject = {
    'Q': ['W', 'A'],
    'W': ['Q', 'E', 'A', 'S'],
    'E': ['W', 'R', 'S', 'D'],
    'R': ['E', 'D', 'F', 'T'],
    'T': ['R', 'F', 'G', 'Y'],
    'Y': ['T', 'G', 'H', 'U'],
    'U': ['Y', 'H', 'J', 'I'],      
    'I': ['U', 'J', 'K', 'O'],
    'O': ['I', 'K', 'L', 'P'],
    'P': ['O', 'L'],
    'A': ['Q', 'W', 'S', 'Z'],
    'S': ['W', 'E', 'A', 'D', 'Z', 'X'],
    'D': ['E', 'R', 'S', 'F', 'X', 'C'],
    'F': ['R', 'T', 'D', 'G', 'C', 'V'],
    'G': ['T', 'Y', 'F', 'H', 'V', 'B'],
    'H': ['Y', 'U', 'G', 'J', 'B', 'N'],
    'J': ['U', 'I', 'H', 'K', 'N', 'M'],             
    'K': ['I', 'O', 'J', 'L', 'M'],
    'L': ['O', 'P', 'K'],
    'Z': ['A', 'S', 'X'],
    'X': ['S', 'D', 'Z', 'C'],
    'C': ['D', 'F', 'X', 'V'],
    'V': ['F', 'G', 'C', 'B'],
    'B': ['G', 'H', 'V', 'N'], 
    'N': ['H', 'J', 'B', 'M'],
    'M': ['J', 'K', 'N']}


const qwertyLetterKey = {
    'A' : [2, 1],
    'B' : [1, 5],
    'C' : [1, 3],
    'D' : [2, 3],
    'E' : [3, 3],
    'F' : [2, 4],
    'G' : [2, 5],
    'H' : [2, 6],
    'I' : [3, 8],
    'J' : [2, 7],
    'K' : [2, 8],
    'L' : [2, 9],
    'M' : [1, 7],
    'N' : [1, 6],
    'O' : [3, 9],
    'P' : [3, 10],
    'Q' : [3, 1],
    'R' : [3, 4],
    'S' : [2, 2],
    'T' : [3, 5],
    'U' : [3, 7],
    'V' : [1, 4],
    'W' : [3, 2],
    'X' : [1, 2],
    'Y' : [3, 6],
    'Z' : [1, 1]
}

// Determine adjacent letters from QWERTY keyboard layout
function adjacentLetters(letter) {
    return adjacentLettersObject[letter]
}

// Converts letter into it's row/col position for a QWERTY Keyboard
function letterToRowCol(letter) {
    coordinates = qwertyLetterKey[letter]
    row = coordinates[0]
    col = coordinates[1]
    return [row, col]
}

// Estimate distance from Node to desintation. In this case using Pythagorean theorem distance, leaving the distance squared
function heuristic (a, b) {
    let aGrid = letterToRowCol(a)
    let bGrid = letterToRowCol(b)
    let d = ((Math.abs(aGrid[0] - bGrid[0])) ** 2 + (Math.abs(aGrid[1] - bGrid[1]))** 2)
    return d
}

// Class Node for letter, based on code from : https://briangrinstead.com/blog/astar-search-algorithm-in-javascript/
class Node {
    constructor(letter) {
        this.letter = letter
        // Determine row/col location from letter
        let coordinates = letterToRowCol(letter)
        this.row = coordinates[0];
        this.col = coordinates[1];
        this.f = 0; // f(x) = g(x) + h(x)
        this.g = 0; // total cost of getting to that node
        this.h = 0; // Estimate time to reach finish from current node (also called a heuristic)
        this.parent = null // shortest path once found, currently not used in keyboard version
        this.debug = "";
        this.neighbors = adjacentLetters(letter); // neighbors of node letter
    }
}

// INITIALIZE NODES
/* Create a series of nodes for the entire keyboard. Each node will be named letterLETTER, where LETTER is each letter of the alpahbet. 
Initalize each node depending on the location 
*/

letterNodes = {} // intialize empty object

for (let i = 0; i < alphaList.length; i++) {
    varName = alphaList[i];
    varValue = new Node(alphaList[i]);
    letterNodes[varName] = varValue;
}

// ALGORITHM

function qwertyAstar(start, end) {
    const startLetter = start.toUpperCase() // convert to upperCase
    const endLetter = end.toUpperCase() // conver to upperCase
    if (startLetter === endLetter) { // if Start & End same letter, then already found it
        console.log('Start == End Letter, next letter')
        return 0
    } else {
        var openList = [] // nodes to be evaluated
        var closedList = [] // nodes already evaluated
        var lettersToEval = [] // letters of adjacent nodes to evaluated
        var startNode = letterNodes[startLetter]
        console.log('Path from', startLetter, 'to', endLetter)


        //push startNode onto openList
        openList.push(startNode)

        while (openList.length > 0) { // while end point has not been found
            //currentNode = find lowest f in openList, OR the End location!
            //Grab lowest f(x) to process next
            let lowestIndex = 0
            
            // check if openList contains endLetter
            if (lettersToEval.includes(endLetter)) {
                currentNode = letterNodes[endLetter]
                console.log('Found end letter!')
                letterPath = ""
                for (let k = 0; k < closedList.length; k++) {
                    letterPath += closedList[k].letter + ' => ';
                }
                letterPath += endLetter
                console.log(letterPath)
                return 0
            } else {
                if (openList.length > 1) {
                    for (let i = 0; i < openList.length; i++) {
                        console.log('Letter', openList[i].letter, ', F(cost): ', openList[i].f)
                        if (openList[i].f < openList[lowestIndex].f) { // if found lowest index
                            lowestIndex = i
                        }
                    }
                    console.log(' ')
                    console.log('Letter', openList[lowestIndex].letter, ' is lowest')
                    currentNode = openList[lowestIndex]

                } else if (openList.length == 1) { // If only one value on openList
                    currentNode = openList[0]
                } else {
                    console.log('Error, openList.length == 0')
                    return 1
                } 
            }

            // Normal case -- letter has not yet been founded
            // move currentNode from open to closed, process each of it's neighbors
            currentNode.debug = "Evaluated node"
            openList.splice(lowestIndex, 1) // remove currentNode from openList
            closedList.push(currentNode) //push currentNode onto closedList and remove from openList
            
            // Eval neighbors of each node
            var adjLettersList = []
            // Translate list of letterString into list of letter nodes
            for (let i = 0; i < (currentNode.neighbors).length; i++) {
                adjLettersList.push(letterNodes[currentNode.neighbors[i]])
            }

            // return list of nodes as neighbors
            for (let i = 0; i < adjLettersList.length; i++) { // Iterate over neighbors, add new ones to the list
                var newLetter = adjLettersList[i]
                if (openList.includes(newLetter)) { // if neighbor already evaluted for the path
                    continue // skip to next letter
                } else { // if neighbor letter hasn't been evaluated
                    // set g, h, f costs for current list
                    keyLetter = newLetter.letter
                    newLetter.h = heuristic(keyLetter, endLetter)
                    newLetter.g = heuristic(currentNode.letter, keyLetter)
                    newLetter.f = newLetter.h + newLetter.g
                    newLetter.debug = "next neighbors"
                    openList.push(newLetter) // add to nodes to be evaluated in openList
                }
            }

            lettersToEval = [] // list of letters to be evaluated
            for (let i = 0; i < openList.length; i++) {
                lettersToEval.push(openList[i].letter)
            }

            // Evalute for lowest f cost for next value at start of the loop
            // save parent Node for next loop
        }
    }
}

qwertyAstar('a', 'w')

