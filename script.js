'use strict';
//selecting element
let player0El = document.querySelector('.player--0');
let player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let score, currentScore, activePlayer, playing;
//function for switching players
const init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  diceEl.classList.add('hidden');
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  playing = true;
};
init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  //if active player is 0 so turn 1 if 1 so turn 0
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//starting  element

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  //Geenerating random dice roll
  if (playing) {
    let dice = Math.trunc(Math.random() * 6) + 1;
    //console.log(dice);
    //display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //check dice for 1
    if (dice !== 1) {
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] = score[activePlayer] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    if (score[activePlayer] >= 10) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', init);
