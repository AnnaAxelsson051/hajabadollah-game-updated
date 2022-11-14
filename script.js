"use strict";

//SELECTING ELEMENTS:
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
//selecting the two players via their classes
//to set the background when active player switcher
const score0El = document.querySelector("#score--0");
//the # is the selector for IDs
//select the score and set it to 0
//(we need the classname or the IDs to select elements)
//they are called player 0 and 1
const score1El = document.querySelector("#score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
//select the element by the ID and then the class name tex current--0

const diceEl = document.querySelector(".dice");
//we select the dice element by using the .dice class
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
//select the three buttons

let scores, currentScore, activePlayer, playing;
//create some variables, so they are accessible everywhere

//INITIALIZING STARTING CONDITIONS:
//when game starts for first time
//when we click reset
const init = function () {
  scores = [0, 0];
  //total scores player 1 and 2 (=0 and 1)
  currentScore = 0; //current score
  activePlayer = 0; //who is active
  playing = true; //if game is active
  //reassign variables to 0

  score0El.textContent = 0;
  score1El.textContent = 0;
  //visible totalscores back to 0
  current0El.textContent = 0;
  current1El.textContent = 0;
  //visible current scores back to 0
  diceEl.classList.add("hidden");
  //hide the dice(element) by adding the hidden class (längst ned i css)
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  //remove the dark winnerclass, on both players because we dont know who it is on
  player1El.classList.remove("player--active");
  //and remove the active class on player 2 (if it was there)
  player0El.classList.add("player--active");
  //and add the active class on player 1
};

init();
//when we load the page/game js will fin this function and load the page with all the initial values

//FUNCTION FOR SWITCHING PLAYERS
//no parameters since nothing changes
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  //set the textcontent/currentscore back to 0 for the active player
  currentScore = 0;
  //and set the current score back to 0, this var is not bound to any player
  activePlayer = activePlayer === 0 ? 1 : 0;
  //and switch player so if active player is 0 then switch to player 1 otherwise switch to 0 (bc active player was 1)
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
  //change the background
  //toggle will add the active class to a player if its not there and if it is it will remove it, so it makes the un active class (tex player 1) active
};

//ROLLING THE DICE FUNCTIONALITY:
btnRoll.addEventListener("click", function () {
  //when user clicks btnRoll
  if (playing) {
    //only execute button functionality if bool playing is true
    const dice = Math.trunc(Math.random() * 6) + 1;
    //generate a random decimal free number mellan 1-6
    diceEl.classList.remove("hidden");
    //remove the hidden class from dice element and display the random nuber
    diceEl.src = `dice-${dice}.png`;
    //select the diceelement and the src (from html) and set it to a string which will be the name of the image displayed on the dice
    if (dice !== 1) {
      //if dice is not 1
      currentScore += dice;
      //add the dice roll to current score
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      //uppdate the score/textcontent of the active player with current score
    } else {
      switchPlayer();
    }
  }
});

//WHEN USER CLICKS HOLD:
btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    //Uppdate the total score
    //so scores at position activePlayer (var above) in the scores array (arr above), dvs player 1 or 2
    //dvs scores[1] = scores[1] += currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //display the score based on the active player like we did above, by selecting the active player score beroende på vem som spelar (score--0 eller score--1) sen sätter vi textinnehållet till scores för active player
    if (scores[activePlayer] >= 40) {
      //if someone gets 100 game finishes
      playing = false;
      //then we set the bool playing to false bc game ends to disable button functionality
      diceEl.classList.add("hidden");
      //add the hidden class on the dice to hide it
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      //select the player that won via the player class with the dot, and with the classList add a player winner class to it så bakgrund ändras
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      //and remove the active player class
    } else {
      //of someone does not get 100 switch player
      switchPlayer();
    }
  }
});

//WHEN PLAYER CLICKS NEW GAME BUTTON
btnNew.addEventListener("click", init);
//pass in the init function that initialises all values to 0
