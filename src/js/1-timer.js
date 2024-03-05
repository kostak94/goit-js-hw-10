import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import error from '../img/bi_x-octagon.svg';
import success from '../img/bi_check2-circle.svg';

const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const timerEl = document.querySelector('.timer');
let userSelectedDate;

startBtn.disabled = true;

startBtn.addEventListener('click', onStartClick);

function onStartClick() {
  startBtn.disabled = true;
  inputEl.disabled = true;

  const intervalId = setInterval(() => {
    const currentTime = Date.now();
    const diff = userSelectedDate - currentTime;
    const { days, hours, minutes, seconds } = convertMs(diff);
    renderTime(days, hours, minutes, seconds);
    if (diff < 900) {
      clearInterval(intervalId);
      inputEl.disabled = false;
      showSuccessMessage();
    }
  }, 1000);
}
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (userSelectedDate < Date.now()) {
      showErrorMessage();
      startBtn.disabled = true;

      return;
    }
    startBtn.disabled = false;
  },
};
flatpickr(inputEl, options);

function renderTime(days, hours, minutes, seconds) {
  timerEl.querySelector('[data-days]').textContent = addLeadingZero(days);
  timerEl.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  timerEl.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
  timerEl.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function showErrorMessage() {
  return iziToast.error({
    title: 'Error',
    backgroundColor: '#EF4040',
    titleColor: '#fff',
    messageColor: '#fff',
    message: 'Please choose a date in the future',
    iconUrl: error,
    color: '#fff',
    position: 'topRight',
    progressBarColor: '#B51B1B',
  });
}

function showSuccessMessage() {
  return iziToast.success({
    title: 'Ok',
    message: 'Congratulations!',
    backgroundColor: '#59A10D',
    iconUrl: success,
    titleColor: '#fff',
    messageColor: '#fff',
    position: 'topRight',
  });
}
