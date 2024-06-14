'use strict';

let currentScore, currentPlayer, scorePlayer0, scorePlayer1, diceEl;
let currentPlScore0, currentPlScore1;
const newButton = document.querySelector('.btn--new');
const holdButton = document.querySelector('.btn--hold');
const rollButton = document.querySelector('.btn--roll');
currentPlScore0 = document.getElementById('current--0');
currentPlScore1 = document.getElementById('current--1');
let scores;
let playing;

const init = function () {
  diceEl = document.querySelector('.dice');
  diceEl.classList.add('hidden');
  document.getElementById(`score--0`).textContent = 0;
  document.getElementById(`score--1`).textContent = 0;
  playing = true;
  document.querySelector(`.player--1`).classList.remove('player--active');
  document.querySelector(`.player--0`).classList.add('player--active');
  scores = [0, 0];

  currentScore = 0;
  currentPlayer = 0;
};

init();

let switchPlayer = function () {
  if (playing) {
    currentScore = 0;
    document.getElementById(`current--${currentPlayer}`).textContent =
      currentScore;
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.remove('player--active');
    currentPlayer === 0 ? (currentPlayer = 1) : (currentPlayer = 0);
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.add('player--active');
  }
};

rollButton.addEventListener('click', function () {
  if (playing) {
    let dice = Math.trunc(Math.random() * 6 + 1);
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${currentPlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdButton.addEventListener('click', function () {
  if (playing) {
    scores[currentPlayer] += currentScore;
    document.getElementById(`score--${currentPlayer}`).textContent =
      scores[currentPlayer];
    if (scores[currentPlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

newButton.addEventListener('click', function () {
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--active');
  document.querySelector(`.player--0`).classList.add('player--active');
  document.getElementById(`current--${currentPlayer}`).textContent = 0;
  init();
});
