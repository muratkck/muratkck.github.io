let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};
updateScoreElements();


document.querySelector('.rock_button').addEventListener('click', () => {
  playGame('rock');
});
document.querySelector('.paper_button').addEventListener('click', () => {
  playGame('paper');
});
document.querySelector('.scissors_button').addEventListener('click', () => {
  playGame('scissors');
});
document.querySelector('.reset_button').addEventListener('click', () => {
  checkReset();
});
document.querySelector('.auto_play_button').addEventListener('click', () => {
  autoPlay();
});

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r'){
    playGame('rock');
  }
  else if(event.key === 'p'){
    playGame('paper');
  }
  else if(event.key === 's'){
    playGame('scissors');
  }
  else if(event.key === 'a'){
    autoPlay();
  }
  else if(event.key === ' '){
    checkReset();
  }
});

function checkReset(){

  if(!(score.wins === 0 && score.losses === 0 && score.ties ===0)){
    document.querySelector('.confirmation_message')
    .innerHTML = `Are you sure you want to reset the score?
    <button class="confirmation_button_yes js_confirmation_button_yes">Yes</button> 
    <button class="confirmation_button_no js_confirmation_button_no">No</button>`;
  
    document.querySelector('.js_confirmation_button_yes').addEventListener('click', () => {
      hideConfirmationMessage();
      resetScore();
    });
    document.querySelector('.js_confirmation_button_no').addEventListener('click', () => {
      hideConfirmationMessage();
    });
  }
}
function hideConfirmationMessage(){
  document.querySelector('.confirmation_message')
  .innerHTML = '';
}

function resetScore(){
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElements();
}


let intervalId;
let isAutoPlay = false;
function autoPlay(){
  
  if(!isAutoPlay){
    document.querySelector('.auto_play_button').innerHTML = 'Stop Play';
    intervalId = setInterval(() => {
      playGame(pickComputerMove());
    }, 1000);
    isAutoPlay = true;
  }
  else{
    clearInterval(intervalId);
    document.querySelector('.auto_play_button').innerHTML = 'Auto Play';
    isAutoPlay = false;
  }
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";

  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose.";
    } else if (computerMove === "paper") {
      result = "You win.";
    } else {
      result = "Tie.";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You lose.";
    } else {
      result = "You win.";
    }
  } else {
    if (computerMove === "rock") {
      result = "You win.";
    } else if (computerMove === "paper") {
      result = "Tie.";
    } else {
      result = "You lose.";
    }
  }

  if (result === "You win.") {
    score.wins++;
  } else if (result === "You lose.") {
    score.losses++;
  } else {
    score.ties++;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElements();

  document.querySelector('.js_result').innerHTML = result;
  document.querySelector('.js_choices')
    .innerHTML = `You
<img class="move_icon" src="images/${playerMove}-emoji.png"><img class="move_icon" src="images/${computerMove}-emoji.png"> Computer`;
}

function updateScoreElements() {
  document.querySelector(
    ".js_score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  let computerMove = "";
  const randomNumber = Math.random();
  if (0 <= randomNumber && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (1 / 3 <= randomNumber && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else {
    computerMove = "scissors";
  }
  return computerMove;
}