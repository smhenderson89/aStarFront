// CONSTANTS for keyboard layout 

export const alphaList = ['A','B','C','D','E','F','G','H','I','J','K','L','M',
'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'] // List of letters of the alphabet

// Estimate distance from Node to desintation. In this case using Pythagorean theorem distance, leaving the distance squared
export function heuristic (a, b, keyboard) {
    let aGrid = letterToRowCol(a, keyboard)
    let bGrid = letterToRowCol(b, keyboard)
    let d = ((Math.abs(aGrid[0] - bGrid[0])) ** 2 + (Math.abs(aGrid[1] - bGrid[1]))** 2)
    return d
}

// Determine adjacent letters from QWERTY keyboard layout
export function adjacentLetters(letter, keyboard) {
    var adjacentKeys;
    switch (keyboard) {
        case "qwerty" : 
            adjacentKeys = qwertyAdjKeysObject;
            break;
        case "ortho" :
            adjacentKeys = orthoAdjLettersObject;
            break;
        case "dvorak" :
            adjacentKeys = dvorakAdjKeysObject;
    }
    return adjacentKeys[letter]
}

// Converts letter into it's row/col position based on keyboard input
export function letterToRowCol(letter, keyboard) {
    var coordinates;
    switch (keyboard) {
        case "qwerty" :
            coordinates = qwertyLetterKey[letter];
            break;
        case "ortho" :
            coordinates = orthoLetterKey[letter];
            break;
        case "dvorak" :
            coordinates = dvorakLetterKey[letter];
            break;
    }
    let row = coordinates[0]
    let col = coordinates[1]
    return [row, col]
}

// Class Node for letter, based on code from : https://briangrinstead.com/blog/astar-search-algorithm-in-javascript/
export class Node {
    constructor(letter, keyboard) {
        this.letter = letter
        // Determine row/col location from letter
        let coordinates = letterToRowCol(letter, keyboard)
        this.row = coordinates[0]; // row
        this.col = coordinates[1]; // col
        this.f = 0; // f(x) = g(x) + h(x)
        this.g = 0; // total cost of getting to that node
        this.h = 0; // Estimate time to reach finish from current node (also called a heuristic)
        this.parent = null // shortest path once found, currently not used in keyboard version
        this.debug = "";
        this.neighbors = adjacentLetters(letter, keyboard); // neighbors of node letter
    }
}

// Keyboard Specific Constants

// ORTHOLINEAR KEYBOARD

export const orthoAdjLettersObject = {
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

export const orthoLetterKey = {
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

// QWERTY KEYBOARD

export const qwertyAdjKeysObject = {
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
    'M': ['J', 'K', 'N']
}

export const qwertyLetterKey = {
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


// DVORAK KEYBOARD - Future to Come

export const dvorakAdjKeysObject = {
    'P' : ['Y', 'E', 'U'],
    'Y' : ['P', 'F', 'U', 'I'],
    'F' : ['Y', 'G', 'I', 'D'],
    'G' : ['F', 'C', 'D', 'H'],
    'C' : ['G', 'R', 'H', 'T'],
    'R' : ['C', 'L', 'T', 'N'],
    'L' : ['R', 'N', 'S'],
    'A' : ['O'],
    'O' : ['A', 'E', 'Q'],
    'E' : ['P', 'O', 'U', 'Q', 'J'],
    'U' : ['P', 'Y', 'E', 'I', 'J', 'K'],
    'I' : ['Y', 'F', 'U', 'D', 'K', 'X'],
    'D' : ['F', 'G', 'I', 'H', 'X', 'B'],
    'H' : ['G', 'C', 'D', 'T', 'B', 'M'],
    'T' : ['C', 'R', 'H', 'N', 'M', 'W'],
    'N' : ['R', 'L', 'T', 'S', 'W', 'V'],
    'S' : ['L', 'N', 'V', 'Z'],
    'Q' : ['O', 'E', 'J'],
    'J' : ['E', 'U', 'Q', 'K'],
    'K' : ['U', 'I', 'J', 'X'],
    'X' : ['I', 'D', 'K', 'B'],
    'B' : ['D', 'H', 'X', 'M'],
    'M' : ['H', 'T', 'B', 'W'],
    'W' : ['T', 'N', 'M', 'V'],
    'V' : ['N', 'S', 'W', 'Z'],
    'Z' : ['S', 'V']
}

export const dvorakLetterKey = {
    'P' : [3, 4],
    'Y' : [3, 5],
    'F' : [3, 6],
    'G' : [3, 7],
    'C' : [3, 8],
    'R' : [3, 9],
    'L' : [3, 10],
    'A' : [2, 1],
    'O' : [2, 2],
    'E' : [2, 3],
    'U' : [2, 4],
    'I' : [2, 5],
    'D' : [2, 6],
    'H' : [2, 7],
    'T' : [2, 8],
    'N' : [2, 9],
    'S' : [2, 10],
    'Q' : [1, 2],
    'J' : [1, 3],
    'K' : [1, 4],
    'X' : [1, 5],
    'B' : [1, 6],
    'M' : [1, 7],
    'W' : [1, 8],
    'V' : [1, 9],
    'Z' : [1, 10]
}