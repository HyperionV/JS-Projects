'use strict';

let num = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let win = false;
let highScore = Number(document.querySelector('.highscore').textContent);

const setElement = (e, c) => (document.querySelector(e).textContent = c);

const resetState = function () {
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  setElement('.message', 'Start guessing...');
  document.querySelector('.guess').value = '';
  setElement('.number', '?');
  win = false;
};

const resetGame = function () {
  num = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  setElement('.score', score);
  resetState();
};

const handler = function (guess) {
  if (guess === num) {
    win = true;
    setElement('.number', num);
    score++;
    setElement('.message', 'Congratulation, you got it right!');
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    setElement('.check', 'Continue');

    if (score > highScore) {
      highScore = score;
      setElement('.message', 'Congratulation, you set a new highscore!');
      setElement('.highscore', highScore);
    }
  } else {
    score--;
    setElement(
      '.message',
      (guess > num ? 'Too high!' : 'Too low!') + ' Please try again!'
    );
  }
  setElement('.score', score);
};

document.querySelector('.check').addEventListener('click', function () {
  if (score <= 0) {
    setElement('.message', 'You lost the game!');
    return;
  }

  if (win) {
    setElement('.check', 'Check!');
    resetState();
    return;
  }

  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    setElement('.message', 'Opps, no number');
  } else handler(guess);
});

document.querySelector('.again').addEventListener('click', resetGame);
