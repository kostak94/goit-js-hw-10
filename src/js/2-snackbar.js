import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import error from '../img/bi_x-octagon.svg';
import success from '../img/bi_check2-circle.svg';

const formEl = document.querySelector('.form');
const fulfillEl = formEl.querySelector('[data-fulfilled]');

formEl.addEventListener('submit', formSubmitHandler);

function formSubmitHandler(e) {
  e.preventDefault();
  const inputDelay = formEl.elements.delay.value;
  const isFulfilled = fulfillEl.checked;
  const promise = createPromise(inputDelay, isFulfilled);
  promise
    .then(() => onFulfilled(inputDelay))
    .catch(() => onRejected(inputDelay));
  formEl.reset();
}

function createPromise(delay, isActive) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (isActive) {
        return res();
      } else {
        return rej();
      }
    }, delay);
  });
}

function onFulfilled(delay) {
  return iziToast.success({
    title: 'Ok',
    message: `Fulfilled promise in ${delay}ms`,
    backgroundColor: '#59A10D',
    iconUrl: success,
    titleColor: '#fff',
    messageColor: '#fff',
    position: 'topRight',
  });
}

function onRejected(delay) {
  return iziToast.error({
    title: 'Error',
    backgroundColor: '#EF4040',
    titleColor: '#fff',
    messageColor: '#fff',
    message: `Rejected promise in ${delay}ms`,
    iconUrl: error,
    color: '#fff',
    position: 'topRight',
    progressBarColor: '#B51B1B',
  });
}
