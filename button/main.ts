//Active players. True if players turn else false.
let player1:boolean = true;
let player2:boolean = false;

//If a player has won, lost or drawn the game then the game is stopped
let gameStillPlaying = false;
//How many turns the game has lasted for. Cannot be more than 9
let turns = 0;

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
function init()
{
  //Hide start button
  document.getElementById("start").style.display = "none";
  //Randomly selects player 1 or 2 to go first
  let roll = Math.floor(Math.random() * Math.floor(2));
  // console.log(roll);
  if(roll === 0)
  {
    //intial values dont need to be changed
    document.getElementById("player_1").style.textDecoration = 'underline';
  }
  else
  {
    //toggle active player
    togglePlayer();
  }
}

//Start is clicked
document.querySelector('#start').addEventListener('click',()=>{
  init();
});
