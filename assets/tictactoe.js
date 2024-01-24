// Function to toggle the main menu, player selection and main-game HTML elements.
function hideScreen(id, toggle) {
    let element = document.getElementById(id); //retrieves the HTML element that's passed into the "id" argument.

    if (!element) {
        console.log("This element with id '" + id + "' cannot be found.");
    } else {
        let display = toggle ? "block" : "none"; //uses the ternary (conditional) operator. It's a quicker way of writing an if-else statement.
        element.style.display = display; //element.style.display gets assigned the value of display;
    }
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
let currentGameMode = '';
let currentPlayer = '';
let computerPlayer = '';
let playerXPoints = 0;
let playerOPoints = 0;
let drawsPoints = 0;
let running = false;

//Initializing audio variables. All audio files have been created with Bosca Ceoil. (A free tool for creating music.)
const clickGameAudio = new Audio();
clickGameAudio.src = "./assets/audio/click.wav";

const winGameAudio = new Audio();
winGameAudio.src = "./assets/audio/wingame.wav";

const drawGameAudio = new Audio ();
drawGameAudio.src = "./assets/audio/drawgame.wav";

/*------------*/

//checking whether gameMode is Player or Computer before hiding the gamemodeselection-menu and showing the playerselection-menu
function gameModeSelect(gamemode) {
    if (gamemode === 'Player' || gamemode === 'Computer') {
        clickGameAudio.play();
        currentGameMode = gamemode;
        hideScreen("gamemodeselection-menu", false);
        hideScreen("playerselection-menu", true);
    }
    return currentGameMode;
}

//checking whether symbol is X or O before hiding the playerselection-menu and showing the main-game and game-scoreboard.
function playerSelect(symbol) {
    if (symbol === 'X' || symbol === 'O') {
        clickGameAudio.play();
        currentPlayer = symbol;
        if (currentGameMode === 'Computer') {
            computerPlayer = (symbol === 'X') ? 'O' : 'X';
        }
        hideScreen("playerselection-menu", false)
        hideScreen("main-game", true);
        hideScreen("game-scoreboard", true)
        initializeGame();
    }
    return currentPlayer;
}

function startGame() {
    clickGameAudio.play();
    hideScreen("game-menu-description", false);
    hideScreen("game-startbuttonBtn", false);
    hideScreen("gamemodeselection-menu", true);
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

/*

    COMPUTER MODE [current Computer Mode is randomized.]

*/


function computerMove() {
    const emptyCells = [];

    for (let x = 0; x < playingField.length; x++) {
        if (playingField[x] === '' && running) {
            emptyCells.push(x);
        }
    }

    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const computerIndex = emptyCells[randomIndex];

        setTimeout(() => {
            updateCell(cells[computerIndex], computerIndex);
            checkWinner();
        }, 500);
    }
}



/*
  // computer marks a random EMPTY cell
  random = Math.ceil(Math.random() * emptyCells.length) - 1;
  emptyCells[random].textContent = mark;
  checkRow();
  switchMark();
}
*/

//cellClicked() checks whether the clicked cell in question is empty or not. If it's not empty or game is not running, function returns nothing. Otherwise, it calls the updateCell() and checkWinner() functions.
function cellClicked() {
    const cellIndex = this.getAttribute("index");
    if (playingField[cellIndex] != '' || !running) {
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();

    if (currentGameMode === 'Computer' && running) {
        computerMove();
    }

}

//updateCell() takes two arguments/parameters, cell and index. Whatever cell gets clicked gets used as the arguments for this function and it iterates through the main-game board before updating it to have the currentPlayer symbol in it.
function updateCell(cell, index) {
    playingField[index] = currentPlayer;
    cell.textContent = currentPlayer;

}

//changePlayer() simply checks whether currentPlayer is X by using a ternary operator. If currentPlayer is X change to O, otherwise change to X before displaying whose turn it is.
function changePlayer() {
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    statusText.textContent = `${currentPlayer}'s turn`

}

//checkWinner() checks when a player has won. It iterates through all winning moves with a for loop and then uses them to check whether the currentPlayer won or not.
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

    //if the player wins, it gets displayed and increments one point for the winner before stopping the game. If it's a draw, same concept. If none are true, the game is not finished and it changes the player.
    if (playerWin) {
        statusText.textContent = `${currentPlayer} wins!`;
        if (currentPlayer === 'X') {
            playerXPoints++
            playerXScore.textContent = `${playerXPoints}`;
            winGameAudio.play();
        } else if (currentPlayer === 'O') {
            playerOPoints++
            playerOScore.textContent = `${playerOPoints}`;
            winGameAudio.play();
        }
        running = false;
    } else if (!playingField.includes('')) {
        statusText.textContent = `Draw!`;
        drawsPoints++
        drawsScore.textContent = `${drawsPoints}`;
        drawGameAudio.play();
        running = false;        
    }
    else {
        changePlayer();
    }
}

//restartGame() resets the game by setting the playing field and cells back to being blank and running the game. 
function restartGame() {
    playingField = ['', '', '', '', '', '', '', '', ''];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = '');
    running = true;
}

//resetScoreboard() is like restartGame() except that it only resets the score variables back to 0.
function resetScoreboard() {
    playerXPoints = 0;
    playerOPoints = 0;
    drawsPoints = 0;

    playerXScore.textContent = `${playerXPoints}`;
    playerOScore.textContent = `${playerOPoints}`;
    drawsScore.textContent = `${drawsPoints}`;
}

