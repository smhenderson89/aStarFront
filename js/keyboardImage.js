/* 
Event Listener, change the displayed keyboard depending on 
which image is selected by the user
*/

document.addEventListener('input', function(event) {
    const keyboardImage = document.getElementById("keyboardImage");
    // console.log(`DEBUG: event triggered`)
    if (event.target.value == "ortho") {
        // console.log('change to ortho');
        keyboardImage.src = "./images/ortho_cropped copy.png";
    } else if (event.target.value == "qwerty") {
        // console.log('change to qwerty');
        keyboardImage.src = "./images/1920px-KB_United_States.png";
    }
})