'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const operationElement = document.querySelector('.operations');
const contentTab = operationElement.querySelectorAll('.operations__content');
const tabBtn = operationElement.querySelectorAll('.btn');

const nav = document.querySelector('.nav');

const header = document.querySelector('.header');
/////////////////////////////////////////////////

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
  if (e.target.classList.contains('nav__link')) {
    console.log(target);
    document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
  }
});

// tabbed component
let currentActiveOperation = 1;

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

const handleHover = function (e) {
  if (!e.target.classList.contains('nav__link')) return;

  nav
    .querySelectorAll('.nav__link')
    .forEach(item => (item.style.opacity = this));
  nav.querySelector('.nav__logo').style.opacity = this;
  e.target.style.opacity = 1;
};

// menu fade animation
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// sticky nav bar
const headerObserver = new IntersectionObserver(
  function (entries) {
    const [entry] = entries;

    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
  },
  {
    root: null,
    threshold: 0,
    rootMargin: '-90px',
  }
);
headerObserver.observe(header);
const allSection = document.querySelectorAll('.section');

// reveal section
const sectionObserver = new IntersectionObserver(
  function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  },
  {
    root: null,
    threshold: 0.15,
  }
);

allSection.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// lazy image loading
const allLazyImage = document.querySelectorAll('img[data-src]');

const imageObserve = new IntersectionObserver(
  function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    entry.target.src = entry.target.getAttribute('data-src');

    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img');
    });

    observer.unobserve(entry.target);
  },
  {
    root: null,
    threshold: 0,
    rootMargin: '-200px',
  }
);

allLazyImage.forEach(img => imageObserve.observe(img));
