'use strict';
const modal = document.querySelector('.modal');
const buttonOpen = document.querySelectorAll('.show-modal');
const overlay = document.querySelector('.overlay');
const buttonClose = document.querySelector('.close-modal');

for (let i = 0; i < buttonOpen.length; i++) {
  buttonOpen[i].addEventListener('click', function () {
    console.log('Button clicked');
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  });
}

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

buttonClose.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    if (!modal.classList.contains('hidden')) {
      closeModal();
    }
  }
});
