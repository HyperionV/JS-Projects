'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

let currUserIdx = -1;

/////////////////////////////////////////////////
const createUsername = function (arr) {
  arr.forEach(function (item) {
    item.username = item.owner
      .toLowerCase()
      .split(' ')
      .map(part => part[0])
      .join('');
  });
};
createUsername(accounts);

const reloadInfo = function () {
  if (currUserIdx !== -1) {
    displayMovement(accounts[currUserIdx]);
    updateBalance(accounts[currUserIdx]);
  }
};
const startTimer = function (time) {
  labelTimer.textContent = `${`${Math.floor(time / 60)}`.padStart(2, 0)}:${`${
    time % 60
  }`.padStart(2, 0)}`;
  labelTimer.classList.toggle('hidden');
  const interval = setInterval(() => {
    labelTimer.textContent = `${`${Math.floor(time / 60)}`.padStart(2, 0)}:${`${
      time % 60
    }`.padStart(2, 0)}`;
    if (currUserIdx === -1) {
      clearInterval(interval);
      labelTimer.classList.toggle('hidden');
    }
    if (time === 0) {
      currUserIdx = -1;
      toggleLogin();
      clearInterval(interval);
      labelTimer.classList.toggle('hidden');
    }
    time -= 1;
  }, 1000);
};

const clearInputField = function (field) {
  field.value = '';
  field.blur();
};

const toggleLogin = function () {
  document.querySelector('.welcome').classList.toggle('hidden');
  document.querySelector('.login').classList.toggle('hidden');
  containerApp.classList.toggle('hidden');
};

const updateBalance = function (acc) {
  let balance = acc.movements.reduce((acc, curr) => acc + curr, 0);
  let sumIn = acc.movements.reduce(
    (acc, curr) => acc + (curr > 0 ? curr : 0),
    0
  );
  labelBalance.textContent = `${balance.toFixed(2)}$`;
  labelSumIn.textContent = `${sumIn.toFixed(2)}$`;
  labelSumOut.textContent = `${(sumIn - balance).toFixed(2)}$`;
  labelSumInterest.textContent = `${acc.movements
    .filter(curr => curr > 0)
    .map(curr => (curr * acc.interestRate) / 100)
    .filter(curr => curr >= 1)
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(2)}$`;

  startTimer(30);
};

const displayMovement = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, idx) {
    const date = new Date(acc.movementsDates[idx]);

    const getDate = function () {
      const curr = new Date();
      const daysPassed = Math.floor((curr - date) / (60 * 1000 * 60 * 24));
      if (daysPassed === 0) {
        return 'today';
      } else if (daysPassed === 1) {
        return 'yesterday';
      } else if (daysPassed <= 7) {
        return `${daysPassed} days ago`;
      } else
        return `${`${date.getDate()}`.padStart(2, 0)}/${`${
          date.getMonth() + 1
        }`.padStart(2, 0)}/${date.getFullYear()}`;
    };

    const type = mov >= 0 ? 'deposit' : 'withdrawal';
    const inject = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${
      idx + 1
    } ${type}</div>
    <div class="movements__date">${getDate()}</div>
    <div class="movements__value">${mov}€</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', inject);
  });
};

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  const usr = inputLoginUsername.value;
  const pin = inputLoginPin.value;
  accounts.forEach(function (acc, idx) {
    if (acc.username === usr && acc.pin == pin) {
      currUserIdx = idx;
    }
  });
  if (currUserIdx == -1) {
    alert('Error! Invalid username or password.');
    return;
  }

  const currTime = new Date();

  labelDate.textContent = `${`${currTime.getDate()}`.padStart(2, 0)}/${`${
    currTime.getMonth() + 1
  }`.padStart(
    2,
    0
  )}/${currTime.getFullYear()}, ${currTime.getHours()}:${`${currTime.getMinutes()}`.padStart(
    2,
    0
  )}`;

  toggleLogin();
  reloadInfo();

  clearInputField(inputLoginPin);
  clearInputField(inputLoginUsername);
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const usr = inputTransferTo.value;
  const amount = Number(inputTransferAmount.value);

  if (accounts[currUserIdx].username === usr) {
    alert('Please use a different account as receiver!');
    return;
  }
  if (!accounts.find(acc => acc.username === usr)) {
    alert('Error! Cannot find the specified account.');
    return;
  }
  if (amount > Number(labelBalance.textContent)) {
    alert('Insufficient balance.');
    return;
  }

  accounts[currUserIdx].movements.push(-amount);
  accounts[currUserIdx].movementsDates.push(new Date().toISOString());
  accounts.find(acc => acc.username === usr).movements.push(amount);
  accounts
    .find(acc => acc.username === usr)
    .movementsDates.push(new Date().toISOString());
  reloadInfo();

  clearInputField(inputTransferAmount);
  clearInputField(inputTransferTo);
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  if (amount <= 0) {
    alert('Please provide a valid value');
    return;
  }
  if (accounts[currUserIdx].movements.every(value => value <= amount * 0.1)) {
    alert(
      'Unable to process: there must be at least one deposit > 10% of the loan.'
    );
    return;
  }
  setTimeout(() => {
    accounts[currUserIdx].movements.push(amount);
    accounts[currUserIdx].movementsDates.push(new Date().toISOString());
    reloadInfo();
    clearInputField(inputLoanAmount);
  }, 2500);
});

console.log(...accounts);

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  const usr = inputCloseUsername.value;
  const pin = inputClosePin.value;

  if (
    accounts[currUserIdx].username != usr ||
    accounts[currUserIdx].pin != pin
  ) {
    alert('Unable to confirm due to invalid username or pin.');
    clearInputField(inputClosePin);
    clearInputField(inputCloseUsername);
    return;
  }

  accounts.splice(
    accounts.findIndex(acc => acc.username === usr),
    1
  );

  toggleLogin();
  currUserIdx = -1;
});

document.querySelector('.logo').addEventListener('click', function (e) {
  e.preventDefault();

  if (currUserIdx == -1) {
    return;
  }
  currUserIdx = -1;
  toggleLogin();
});

btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovement(accounts[currUserIdx], true);
});
