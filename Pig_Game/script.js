'use strict';

let p1Point = 0;
let p2Point = 0;

let p1CurrentPoint = 0;
let p2CurrentPoint = 0;

let player1 = document.querySelector('.player--0');
let player2 = document.querySelector('.player--1');

let rollButton = document.querySelector('.btn--roll');
let holdButton = document.querySelector('.btn--hold');
let newButton = document.querySelector('.btn--new');

let player1Point = document.querySelector('#score--0');
let player2Point = document.querySelector('#score--1');

let current1 = document.querySelector('#current--0');
let current2 = document.querySelector('#current--1');

const changeDice = function (i) {
  document.querySelector('.dice').src = `dice-${i + 1}.png`;
};

const changePlayer = function () {
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};

const newGame = function () {
  p1Point = p2Point = 0;
  update();
  if (getActive()) {
    changePlayer();
  }
};

const update = function () {
  player1Point.textContent = p1Point;
  player2Point.textContent = p2Point;
  current1.textContent = p1CurrentPoint;
  current2.textContent = p2CurrentPoint;
};

const hold = function (i) {
  p1Point += p1CurrentPoint;
  p2Point += p2CurrentPoint;
  p1CurrentPoint = p2CurrentPoint = 0;

  update();
  changePlayer();
};

const win = function (i) {
  document.getElementById(`name--${i}`).style.fontSize = '2.7rem';
  document.querySelector(`#name--${i}`).textContent =
    'Congratulation, you won the game!';
  // document.querySelector(`#name--${i}`).classList.add('player--winner', 'name');
};

const getActive = () =>
  player1.classList.contains('player--active') ? false : true;

holdButton.addEventListener('click', function () {
  hold();
  if (p1Point >= 100) win(0);
  else if (p2Point >= 100) win(1);
});
newButton.addEventListener('click', newGame);

rollButton.addEventListener('click', function () {
  const r = Math.trunc(Math.random() * 6);
  changeDice(r);
  if (r == 0) {
    p1CurrentPoint = p2CurrentPoint = 0;
    changePlayer();
  } else {
    if (getActive()) {
      p2CurrentPoint += r + 1;
    } else {
      p1CurrentPoint += r + 1;
    }
  }
  update();
});
