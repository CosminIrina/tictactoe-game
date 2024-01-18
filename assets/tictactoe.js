// Function to toggle the main menu, player selection and main-game HTML elements.
function hideScreen(id, toggle) {
    let element = document.getElementById(id); //retrieves the HTML element that's passed into the "id" argument.
    let display = toggle ? "block" : "none"; //uses the ternary (conditional) operator. It's a quicker way of writing an if-else statement.
    element.style.display = display; //element.style.display gets assigned the value of display;
}


//Using Javascript to interact with the HTML document specific classes and ids and assigning them to constant values.


    const cells = document.querySelectorAll(".cell");
    const statusText = document.querySelector("#playerTurn")
    const restartButton = document.querySelector(".game-resetBtn");
    const resetScoreboardButton = document.querySelector(".game-resetScoreBtn");
    const playerXScore = document.querySelector(".playerX-points");
    const playerOScore = document.querySelector(".playerO-points");
    const drawsScore = document.querySelector(".draws-points");



//Using an array to set all possible winning moves. The game board itself can be seen as 8 indexes.

    /* Indexes of main game board. 

        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]

    */

const winningMoves = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//Initializing some variables for the main-game.
let playingField = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = '';
let playerXPoints = 0;
let playerOPoints = 0;
let drawsPoints = 0;
let running = false;

/*------------*/

//checking whether symbol is X or O before hiding the playerselection-menu and showing the main-game and game-scoreboard.
function playerSelect(symbol) {
    if (symbol === 'X' || symbol === 'O') {
        currentPlayer = symbol;
        hideScreen("playerselection-menu", false)
        hideScreen("main-game", true);
        hideScreen("game-scoreboard", true)
        initializeGame();
    }
    return currentPlayer;
}

function startGame() {
    hideScreen("game-menu-description", false);
    hideScreen("game-startbuttonBtn", false);
    hideScreen("playerselection-menu", true);
}


/*-------------*/


/* 
    Initializes the game by redirecting to different functions when an element/event is clicked. (EventListener).
    If it's clicked it proceeds to initialize its callback function, redirecting it there.

*/
function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartButton.addEventListener("click", restartGame);
    resetScoreboardButton.addEventListener("click", resetScoreboard);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

//Function checks whether the clicked cell in question is empty or not. If it's not empty or game is not running, function returns nothing. Otherwise, it calls the updateCell() and checkWinner() functions.
function cellClicked() {
    const cellIndex = this.getAttribute("index");
    if (playingField[cellIndex] != '' || !running) {
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();

}

//updateCell() takes two arguments/parameters, cell and index.
function updateCell(cell, index) {
    playingField[index] = currentPlayer;
    cell.textContent = currentPlayer;

}

function changePlayer() {
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    statusText.textContent = `${currentPlayer}'s turn`

}


function checkWinner() {
    let playerWin = false;

    for (let i = 0; i < winningMoves.length; i++) {
        const winning = winningMoves[i];
        const cellA = playingField[winning[0]];
        const cellB = playingField[winning[1]];
        const cellC = playingField[winning[2]];

        if (cellA == '' || cellB == '' || cellC == '') {
            continue;
        } 
        
        if (cellA == cellB && cellB == cellC) {
            playerWin = true;
            break;
        }
    }

    if (playerWin) {
        statusText.textContent = `${currentPlayer} wins!`;
        if (currentPlayer === 'X') {
            playerXPoints++
            playerXScore.textContent = `${playerXPoints}`;
        } else if (currentPlayer === 'O') {
            playerOPoints++
            playerOScore.textContent = `${playerOPoints}`;
        }
        running = false;
    } else if (!playingField.includes('')) {
        statusText.textContent = `Draw!`;
        drawsPoints++
        drawsScore.textContent = `${drawsPoints}`;
        running = false;        
    }
    else {
        changePlayer();
    }
}

function restartGame() {
    playingField = ['', '', '', '', '', '', '', '', ''];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = '');
    running = true;
}

function resetScoreboard() {
    playerXPoints = 0;
    playerOPoints = 0;
    drawsPoints = 0;

    playerXScore.textContent = `${playerXPoints}`;
    playerOScore.textContent = `${playerOPoints}`;
    drawsScore.textContent = `${drawsPoints}`;
}
