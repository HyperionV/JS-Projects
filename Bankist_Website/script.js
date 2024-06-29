'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// smooth scrolling
const section1 = document.querySelector('#section--1');
console.log(section1.innerHTML);
const btnScrollTo = document
  .querySelector('.btn--scroll-to')
  .addEventListener('click', function (e) {
    e.preventDefault();

    section1.scrollIntoView({ behavior: 'smooth' });
  });

// navigation bar
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  const target = e.target.getAttribute('href');
  if (e.target.classList.contains('section') && target.includes('section')) {
    document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
  }
});

// tabbed component
let currentActiveOperation = 1;
const operationElement = document.querySelector('.operations');
const contentTab = operationElement.querySelectorAll('.operations__content');
const tabBtn = operationElement.querySelectorAll('.btn');

tabBtn.forEach(e =>
  e.addEventListener('click', function (e) {
    e.preventDefault();
    const clicked = e.target.classList.contains('operations__tab')
      ? e.target
      : e.target.parentElement;

    const target = Number(clicked.getAttribute('data-tab'));

    if (target == currentActiveOperation) {
      return;
    }

    clicked.classList.add('operations__tab--active');
    tabBtn[currentActiveOperation - 1].classList.remove(
      'operations__tab--active'
    );

    contentTab[currentActiveOperation - 1].classList.remove(
      'operations__content--active'
    );
    contentTab[target - 1].classList.add('operations__content--active');

    currentActiveOperation = target;
  })
);
