// https://stackoverflow.com/questions/21700364/javascript-adding-click-event-listener-to-class
//Active players. True if players turn else false.
var player1 = true;
var player2 = false;
//Tracks if there is a winner
var anyoneWon = false;
//If a player has won, lost or drawn the game then the game is stopped
var gameStillPlaying = false;
//How many turns the game has lasted for. Cannot be more than 9
var turns = 0;
var box = document.getElementsByClassName('box');
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
//Increments turns
function addTurn() {
    turns++;
}
//Toggles the active player
function togglePlayer() {
    if (player1 == true) {
        player1 = false;
        player2 = true;
        document.getElementById("player_1").style.textDecoration = 'none';
        document.getElementById("player_2").style.textDecoration = 'underline';
    }
    else {
        player1 = true;
        player2 = false;
        document.getElementById("player_1").style.textDecoration = 'underline';
        document.getElementById("player_2").style.textDecoration = 'none';
    }
}
//Initalize the game, player is randomly chosen to go first
function init() {
    //Hide start button
    document.getElementById("start").style.display = "none";
    var roll = Math.floor(Math.random() * Math.floor(2));
    if (roll === 0) {
        document.getElementById("player_1").style.textDecoration = 'underline';
    }
    else {
        //toggle active player
        togglePlayer();
    }
    anyoneWon = false;
    //reset turns
    turns = 0;
    gameStillPlaying = true;
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
        if (turns < 10 && gameStillPlaying) {
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
                        document.getElementById("player_1").innerText = 'Player One has won';
                    }
                    else {
                        document.getElementById("player_2").innerText = 'Player Two has won';
                    }
                }
                else {
                    //increment turn
                    addTurn();
                    //Toggle player
                    togglePlayer();
                }
            }
        }
        else {
            gameStillPlaying = false;
        }
    });
}
