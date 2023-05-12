// Test input value

function getInput() {
    event.preventDefault()
    console.log('FORM SUBMITTED!')
    let textInput = document.getElementById("inputName").value;
    let keyboard = document.getElementById("keyboard").value;
    console.log(`Name: ${textInput}, keyboard: ${keyboard}`);
    return false    
}

function test() {
    console.log('function works!')
}
