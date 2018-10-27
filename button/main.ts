// https://stackoverflow.com/questions/21700364/javascript-adding-click-event-listener-to-class

//Active players. True if players turn else false.
let player1:boolean = true;
let player2:boolean = false;

//If a player has won, lost or drawn the game then the game is stopped
let gameStillPlaying = false;
//How many turns the game has lasted for. Cannot be more than 9
let turns = 0;

let box = document.getElementsByClassName('box');

function checkDiagonal()  {
  let r1c1 = document.getElementById('r1c1').innerText;
  let r2c2 = document.getElementById('r2c2').innerText;
  let r3c3 = document.getElementById('r3c3').innerText;
  let r1c3 = document.getElementById('r1c3').innerText;
  let r3c1 = document.getElementById('r3c1').innerText;

  let winningCombo:string[]= [];
  if(r1c1 == r2c2 && r2c2 == r3c3)  {
    winningCombo = ['r1c1','r2c2','r3c3']
    return winningCombo;
  }
  else if(r1c3 == r2c2 && r2c2 == r3c1){
    winningCombo = ['r1c3','r2c2','r3c1'];
    return winningCombo;
  }
  return winningCombo;
}

function checkHorizontals() {

  for(let count = 1; count <= 3; count++) {
    if(document.getElementById('r'+count+'c1').innerText == document.getElementById('r'+count+'c2').innerText &&
    document.getElementById('r'+count+'c2').innerText == document.getElementById('r'+count+'c3').innerText)
    {
      console.log(['r'+count+'c1','r'+count+'c2','r'+count+'c3']);
      return ['r'+count+'c1','r'+count+'c2','r'+count+'c3'];
    }
  }
    return [];
}

function checkVerticals() {

  for(let count = 1; count <= 3; count++) {
    if(document.getElementById('r1'+'c'+count).innerText == document.getElementById('r2'+'c'+count).innerText &&
    document.getElementById('r2'+'c'+count).innerText == document.getElementById('r3'+'c'+count).innerText)
    {
      console.log(['r1'+'c'+count,'r2'+'c'+count,'r3'+'c'+count]);
      return ['r1'+'c'+count,'r2'+'c'+count,'r3'+'c'+count];
    }
  }
    return [];
}

function checkForAWinner() {

  let winningCells:string[] =[];
  if(checkDiagonal().length >0)   {
    winningCells = checkDiagonal();
  }
  else if(checkHorizontals().length >0){
    winningCells = checkHorizontals();
  }
  else if(checkVerticals().length >0){
    winningCells = checkVerticals();
  }
  console.log(winningCells);
  if(winningCells.length > 0) {
    for(let count = 0; count < winningCells.length;count++)  {
      console.log(winningCells[count]);
      document.getElementById(winningCells[count]).style.color = 'purple';
    }
  }
}

//Increments turns
function addTurn() {
    turns++;
}

//Toggles the active player
function togglePlayer() {
  if(player1 == true)
  {
    player1 = false;
    player2 = true;
    document.getElementById("player_1").style.textDecoration = 'none';
    document.getElementById("player_2").style.textDecoration = 'underline';
  }
  else
  {
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
  let roll = Math.floor(Math.random() * Math.floor(2));
  // console.log(roll);
  if(roll === 0)  {
    document.getElementById("player_1").style.textDecoration = 'underline';
  }
  else  {
    //toggle active player
    togglePlayer();
  }

  //reset turns
  turns = 0;
  gameStillPlaying = true;
}

//Start is clicked
document.querySelector('#start').addEventListener('click',()=>{
  init();
});

//Updating displays
for (var i=0;i<box.length; i++) {
    box[i].addEventListener('click',function () {
      let boxElementId = document.getElementById(this.id).innerText;

      //Cannot go over 9 turns and there is still a game to be played
      if(turns < 10 && gameStillPlaying)
      {
        //If it element is empty
        if(boxElementId.trim() == "") {
          if(turns % 2 == 0)  {
            document.getElementById(this.id).innerText = 'X';
          }
          else  {
            document.getElementById(this.id).innerText = '0';
          }

          if(turns >= 4)  {
            checkForAWinner();
          }

          //increment turn
          addTurn();
          //Toggle player
          togglePlayer();
        }
      }
      else  {
        gameStillPlaying = false;
      }
    });
}

//There is a max turn limit of 9 for this game
// function cellClicked() {
//     console.log('something has been clicked');
// }
