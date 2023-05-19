// General Astar.js file for all keyboard layouts

// Link: https://en.wikipedia.org/wiki/Keyboard_layout#Character_keys

// IMPORT CONSTANTS, CLASSES & FUNCTIONS

// General
// pattern must be const {variableName} = require("./modules/constants")
// const constants = require("./constants.js")
import { alphaList, heuristic } from "./constants.mjs"
import { Node } from "./constants.mjs"

export function Astar(start, end, board) {
    const keyboard = board; // keyboard for which keyboard method, QWERTY, ORTHO, DVORAK, etc. 

    // verify start & end are letters
    if (typeof start == 'string' && typeof end == 'string') {
        // console.log('start & end are letters')
    } else {
        // console.log('not valid letters')
        return 1
    }

    // Change constants depending on keyboard
    switch (keyboard) { 
        case "qwerty": // If keyboard = "qwerty", then use ortho variables
            // console.log("qwerty variables");
            break;
        case "ortho": // If keyboard = "ortho", then use qwerty variables
            // console.log("ortho varaibles")
            break;
        case "dvorak": // If keyboard = dvorak, then use dvorak variables (Not yet completed)
            // console.log("dvorak variables");
            break;
        case "" : // If keyboard is empty, then return keyboard not specified
            // console.log("no keyboard specified");
            break;
        }

    // Run A* aglorithm
    // console.log('Running A Star')

    // INTIALIZE NODES
    let letterNodes = {} // intialize empty object
    for (let i = 0; i < alphaList.length; i++) {
        let varName = alphaList[i];
        let varValue = new Node(alphaList[i], keyboard);
        letterNodes[varName] = varValue;
    }

    // BEGINNING OF ALGORITHM

    const startLetter = start.toUpperCase() // convert to upperCase
    const endLetter = end.toUpperCase() // conver to upperCase
    var distance = 0; // distance traveled between letters
    let letterPath = []; // Path from start to end Letter
    if (startLetter === endLetter) { // if Start & End same letter, then already found it
        // console.log('Start == End Letter, next letter')
        return [distance, letterPath]
    } else {
        var openList = [] // nodes to be evaluated
        var closedList = [] // nodes already evaluated
        var lettersToEval = [] // letters of adjacent nodes to evaluated
        var startNode = letterNodes[startLetter]
        var currentNode = {}
        // console.log('Path from', startLetter, 'to', endLetter)

        // DEBUG: Prevent Infinte loops
        var whileLoops = 0;

        //push startNode onto openList
        openList.push(startNode)

        while (openList.length > 0 && whileLoops != 15) { // while end point has not been found, or loops exceed 15
            //currentNode = find lowest f in openList, OR the End location!
            //Grab lowest f(x) to process next
            let lowestIndex = 0
            
            // check if openList contains endLetter (i.e. Path has been found!)
            if (lettersToEval.includes(endLetter)) {
                var currentNode = letterNodes[endLetter];
                for (let k = 0; k < closedList.length; k++) {
                    letterPath[k] = closedList[k].letter;
                }
                letterPath.push(endLetter);
                // console.log(letterPath);
                let distance = (letterPath.length - 1);
                // console.log(`Length of travel: ${distance}`) ; // Distance between lengths

                return [distance, letterPath]
            } else { // Continue with aglorithim
                if (openList.length > 1) {
                    for (let i = 0; i < openList.length; i++) {
                        if (openList[i].f < openList[lowestIndex].f) { // if found lowest index
                            lowestIndex = i
                        }
                    }
                    // console.log('Letter', openList[lowestIndex].letter, ' is lowest')
                    currentNode = openList[lowestIndex]

                } else if (openList.length == 1) { // If only one value on openList
                    var currentNode = openList[0]
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
                    var keyLetter = newLetter.letter
                    newLetter.h = heuristic(keyLetter, endLetter, keyboard)
                    newLetter.g = heuristic(currentNode.letter, keyLetter, keyboard)
                    newLetter.f = newLetter.h + newLetter.g
                    newLetter.debug = "next neighbors"
                    openList.push(newLetter) // add to nodes to be evaluated in openList
                }
            }

            lettersToEval = [] // list of letters to be evaluated
            for (let i = 0; i < openList.length; i++) {
                lettersToEval.push(openList[i].letter)
            }

            // console.log(`DEBUG: lettersToEval : ${lettersToEval}`);

            // Evalute for lowest f cost for next value at start of the loop
            // save parent Node for next loop

            // Prevent infine loops
            whileLoops++
        }

        // DEBUG: If Astar exceeds 15 repetitions, then output last known spot
        console.log(`Times through Astar algo: ${whileLoops}`);
        console.log(`Closed List: ${closedList}`);
        console.log(``)
        
    }

}