//Active players. True if players turn else false.
var player1 = true;
var player2 = false;
//player Element
var player1El = document.getElementById("player_1");
var player2El = document.getElementById("player_2");
//Tracks if there is a winner
var anyoneWon = false;
//If a player has won, lost or drawn the game then the game is stopped
var gameStillPlaying = false;
//How many turns the game has lasted for. Cannot be more than 9
var turns = 0;
var box = document.getElementsByClassName('box');
// hide the start button
function hideStartButton() {
    document.getElementById("start").style.display = "none";
}
//show the start showStartButton
function showStartButton() {
    document.getElementById("start").style.display = "inherit";
}
function checkDiagonal() {
    var row1Column1 = document.getElementById('r1c1').innerText;
    var row1Column3 = document.getElementById('r1c3').innerText;
    var row2Column2 = document.getElementById('r2c2').innerText;
    var row3Column3 = document.getElementById('r3c3').innerText;
    var row3Column1 = document.getElementById('r3c1').innerText;
    if (row1Column1 === row2Column2 && row1Column1 === row3Column3 && (row1Column1 == 'X' || row1Column1 == '0')) {
        return ['r1c1', 'r2c2', 'r3c3'];
    }
    if (row1Column3 === row2Column2 && row1Column3 === row3Column1 && (row1Column3 == 'X' || row1Column3 == '0')) {
        return ['r1c3', 'r2c2', 'r3c1'];
    }
    return [];
}
function checkHorizontals() {
    for (var count = 1; count <= 3; count++) {
        var rowXColumn1 = document.getElementById('r' + count + 'c1').innerText;
        var rowXColumn2 = document.getElementById('r' + count + 'c2').innerText;
        var rowXColumn3 = document.getElementById('r' + count + 'c3').innerText;
        if (rowXColumn1 === rowXColumn2 && rowXColumn2 === rowXColumn3 && (rowXColumn1 === 'X' || rowXColumn1 == '0')) {
            return ['r' + count + 'c1', 'r' + count + 'c2', 'r' + count + 'c3'];
        }
    }
    return [];
}
function checkVerticals() {
    for (var count = 1; count <= 3; count++) {
        var row1ColumnX = document.getElementById('r1' + 'c' + count).innerText;
        var row2Columnx = document.getElementById('r2' + 'c' + count).innerText;
        var row3ColumnX = document.getElementById('r3' + 'c' + count).innerText;
        if (row1ColumnX === row2Columnx && row2Columnx === row3ColumnX && (row1ColumnX === 'X' || row1ColumnX == '0')) {
            return ['r1' + 'c' + count, 'r2' + 'c' + count, 'r3' + 'c' + count];
        }
    }
    return [];
}
function checkForAWinner() {
    var winningCells = [];
    if (checkDiagonal().length > 0) {
        winningCells = checkDiagonal();
    }
    else if (checkHorizontals().length > 0) {
        winningCells = checkHorizontals();
    }
    else if (checkVerticals().length > 0) {
        winningCells = checkVerticals();
    }
    if (winningCells.length > 0) {
        for (var count = 0; count < winningCells.length; count++) {
            document.getElementById(winningCells[count]).style.color = 'purple';
            anyoneWon = true;
        }
    }
}
function resetGameValues() {
    for (var row = 1; row <= 3; row++) {
        for (var column = 1; column <= 3; column++) {
            document.getElementById('r' + row + 'c' + column).innerText = "";
            document.getElementById('r' + row + 'c' + column).style.color = 'white';
        }
    }
}
function resetPlayerValues() {
    player1El.innerText = 'Player One';
    player2El.innerText = 'Player Two';
    player1El.style.textDecoration = 'none';
    player2El.style.textDecoration = 'none';
}
//Increments turns
function addTurn() {
    turns++;
}
//Toggles the active player
function togglePlayer() {
    if (player1 == true) {
        player1 = false;
        player2 = true;
        player1El.style.textDecoration = 'none';
        player2El.style.textDecoration = 'underline';
    }
    else {
        player1 = true;
        player2 = false;
        player1El.style.textDecoration = 'underline';
        player2El.style.textDecoration = 'none';
    }
}
//Initalize the game, player is randomly chosen to go first
function init() {
    //Hide start button
    hideStartButton();
    var roll = Math.floor(Math.random() * Math.floor(2));
    if (roll === 0) {
        player1El.style.textDecoration = 'underline';
    }
    else {
        //toggle active player
        togglePlayer();
    }
    anyoneWon = false;
    //reset turns
    turns = 0;
    gameStillPlaying = true;
    resetGameValues();
    resetPlayerValues();
}
//Start is clicked
document.querySelector('#start').addEventListener('click', function () {
    init();
});
//Updating displays
for (var i = 0; i < box.length; i++) {
    box[i].addEventListener('click', function () {
        var boxElementId = document.getElementById(this.id).innerText;
        //Cannot go over 9 turns and there is still a game to be played
        if (turns < 9 && gameStillPlaying) {
            //If it element is empty
            if (boxElementId.trim() == "") {
                if (turns % 2 == 0) {
                    document.getElementById(this.id).innerText = 'X';
                }
                else {
                    document.getElementById(this.id).innerText = '0';
                }
                if (turns >= 3) {
                    checkForAWinner();
                }
                if (anyoneWon) {
                    gameStillPlaying = false;
                    if (player1) {
                        player1El.innerText = 'Player One has won';
                    }
                    else {
                        player2El.innerText = 'Player Two has won';
                    }
                    //reset game
                    showStartButton();
                }
                else {
                    if (turns == 8) {
                        //reset game
                        showStartButton();
                        player1El.innerText = 'Player One has tied';
                        player2El.innerText = 'Player Two has tied';
                    }
                    else {
                        //increment turn
                        addTurn();
                        //Toggle player
                        togglePlayer();
                    }
                }
            }
        }
    });
}
