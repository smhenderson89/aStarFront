/* 
Event Listener, change the displayed keyboard depending on 
which image is selected by the user
*/

const keyboardSelect = document.querySelector(".keyboard")


keyboardSelect.addEventListener("change", (event) => {
    const result = event.target.value
    // console.log(`DEBUG: event triggered`)
    if (result == "ortho") {
        // console.log('change to ortho');
        keyboardImage.src = "./images/ortho_cropped copy.png";
    } else if (result == "qwerty") {
        // console.log('change to qwerty');
        keyboardImage.src = "./images/1920px-KB_United_States.png";
    } else if (result == "dvorak") {
        // console.log('change to dvorak');
        keyboardImage.src = "./images/dvorak_layout.png";
    } else {
        // Do nothing
    }
})