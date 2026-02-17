import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
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

function startTimer() {
  submitButton.disabled = true;
  inputDate.disabled = true;
  if (inputDate.value) {
    const intervalId = setInterval(() => {
      let countDown =
        new Date(inputDate.value).getTime() - new Date().getTime();
      if (countDown <= 0) {
        clearInterval(intervalId);
        inputDate.disabled = false;
        return;
      } else {
        let { days, hours, minutes, seconds } = convertMs(countDown);
        daysValue.textContent = String(days).padStart(2, '0');
        hoursValue.textContent = String(hours).padStart(2, '0');
        minutesValue.textContent = String(minutes).padStart(2, '0');
        secondsValue.textContent = String(seconds).padStart(2, '0');
      }
    }, 1000);
  }
}

const inputDate = document.querySelector('#datetime-picker');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');
const submitButton = document.querySelector('[data-start]');
submitButton.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let currentTime = new Date().getTime();
    if (currentTime >= selectedDates[0].getTime()) {
      submitButton.disabled = true;
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
        theme: 'dark',
        icon: '',
        iconUrl: '../img/error.svg',
        backgroundColor: '#ef4040',
      });
    } else {
      submitButton.disabled = false;
    }
  },
};
const fp = flatpickr('#datetime-picker', options);
submitButton.addEventListener('click', startTimer);
