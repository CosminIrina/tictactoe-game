function hideScreen(id, toggle) {
    let element = document.getElementById(id); //retrieves the HTML element that's passed into the "id" argument.
    let display = toggle ? "block" : "none"; //uses the ternary (conditional) operator. It's a quicker way of writing an if-else statement.
    element.style.display = display; //element.style.display gets assigned the value of display;
}

function startGame() {
    hideScreen("game-startbuttonBtn", false);
    hideScreen("main-game", true)
}