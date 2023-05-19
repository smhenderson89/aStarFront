// ortholinear A* best route search aglo 

// https://en.wikipedia.org/wiki/A*_search_algorithm

// https://briangrinstead.com/blog/astar-search-algorithm-in-javascript/

// CONSTANTS

/* Used functions in Astar 

Node
alphaList
adjacentLetters
letterToRowCol
heuristic

*/

const alphaList = ['A','B','C','D','E','F','G','H','I','J','K','L','M',
                   'N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

const adjacentLettersObject = {
'Q': ['W', 'A', 'S'],
'W': ['Q', 'E', 'A', 'S', 'D'],
'E': ['W', 'R', 'S', 'D', 'F'],
'R': ['E', 'T', 'D', 'F', 'G'],
'T': ['R', 'Y', 'F', 'G', 'H'],
'Y': ['T', 'U', 'G', 'H', 'J'],
'U': ['Y', 'I', 'H', 'J', 'K'],      
'I': ['U', 'O', 'J', 'K', 'L'],
'O': ['I', 'P', 'K', 'L'],
'P': ['O', 'L'],
'A': ['Q', 'W', 'S', 'Z','X'],
'S': ['Q', 'W', 'E', 'A', 'D', 'Z', 'X', 'C'],
'D': ['W', 'E', 'R', 'S', 'F', 'X', 'C', 'V'],
'F': ['E', 'R', 'T', 'D', 'G', 'C', 'V', 'B'],
'G': ['R', 'T', 'Y', 'F', 'H', 'V', 'B', 'N'],
'H': ['T', 'Y', 'U', 'G', 'J', 'B', 'N', 'M'],
'J': ['Y', 'U', 'I', 'H', 'K', 'N', 'M'],             
'K': ['U', 'I', 'O', 'J', 'L', 'M'],
'L': ['I', 'O', 'P', 'K'],
'Z': ['A', 'S', 'X'],
'X': ['A', 'S', 'D', 'Z', 'C'],
'C': ['S', 'D', 'F', 'X', 'V'],
'V': ['D', 'F', 'G', 'C', 'B'],
'B': ['F', 'G', 'H', 'V', 'N'], 
'N': ['G', 'H', 'J', 'B', 'M'],
'M': ['H', 'J', 'K', 'N']}

const orthoLetterKey = {
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

const orthoRowColKey = {
    '2, 1' : 'A',
    '1, 5' : 'B',
    '1, 3' : 'C',
    '2, 3' : 'D',
    '3, 3' : 'E',
    '2, 4' : 'F',
    '2, 5' : 'G',
    '2, 6' : 'H',
    '3, 8' : 'I',
    '2, 7' : 'J',
    '2, 8' : 'K',
    '2, 9' : 'L',
    '1, 7' : 'M',
    '1, 6' : 'N',
    '3, 9' : 'O',
    '3, 10': 'P',
    '3, 1' : 'Q',
    '3, 4' : 'R',
    '2, 2' : 'S',
    '3, 5' : 'T',
    '3, 7' : 'U', 
    '1, 4' : 'V',
    '3, 2' : 'W',
    '1, 2' : 'X',
    '3, 6' : 'Y',
    '1, 1' : 'Z'
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

// HELPER FUNCTIONS

// Converts row, col intergers into letter -- NOT USED
function rowColToLetter(r,c) {
    outputLetter = orthoRowColKey[`${r}, ${c}`] // convert row/col input into string literal for array
    return outputLetter
}

// Converts letter into it's row/col position for a Ortholinear Keyboard
function letterToRowCol(letter) {
    coordinates = orthoLetterKey[letter]
    row = coordinates[0]
    col = coordinates[1]
    return [row, col]
}

// Determine adjacent letters from Ortholinear keyboard layout
function adjacentLetters(letter) {
    return adjacentLettersObject[letter]
}

/* Function that takes letters string inputs and 
returns their distance away from each other from the letter keyboard, squaring the distance
*/
function heuristic (a, b) {
    let aGrid = letterToRowCol(a)
    let bGrid = letterToRowCol(b)
    let d = ((Math.abs(aGrid[0] - bGrid[0])) ** 2 + (Math.abs(aGrid[1] - bGrid[1]))** 2)
    return d
}

// TEST FUNCTIONS


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

// High Level PseduoCode for A star aglorithm (link: https://briangrinstead.com/blog/astar-search-algorithm-in-javascript/)

function orthoAstar(start, end) {
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

        //push startNode onto lettersToEval
        openList.push(startNode)

        while (openList.length > 0) { // while end point has not been found
            //currentNode = find lowest f in lettersToEval, OR the End location!
            //Grab lowest f(x) to process next
            let lowestIndex = 0

            // check if lettersToEval contains endLetter
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

                } else if (openList.length == 1) { // If only one value on lettersToEval
                    currentNode = openList[0]
                } else {
                    console.log('Error, lettersToEval.length == 0')
                    return 1
                } 
            }

            // Normal case -- move currentNode from open to closed, process each of it's neighbors
            currentNode.debug = "Evaluated node"
            openList.splice(lowestIndex, 1) // remove currentNode from lettersToEval
            closedList.push(currentNode) //push currentNode onto checkedLetters and remove from lettersToEval
            //foreach neighbor of currentNode {
            var adjLettersString = currentNode.neighbors // returns a list of strings, need a string of nodes
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
                    openList.push(newLetter) // add to nodes to be evaluated in lettersToEval
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

orthoAstar('B', 'C')

