import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
function messageSuccess(time) {
  iziToast.success({
    title: 'OK',
    message: `Fulfilled promise in ${time}ms`,
    position: 'topRight',
    theme: 'dark',
    backgroundColor: '#59a10d',
  });
}
function messageReject(time) {
  iziToast.error({
    title: 'Error',
    message: `Rejected promise in ${time}ms`,
    position: 'topRight',
    theme: 'dark',
    icon: '',
    iconUrl: '../img/error.svg',
    backgroundColor: '#ef4040',
  });
}
const formDelay = document.querySelector('.form');
formDelay.addEventListener('submit', event => {
  event.preventDefault();
  const createMessage = (delay, onSuccess, onError) => {
    let checkedDealy = Number.isNaN(Number(delay)) || delay <= 0 ? 0 : delay;
    let getStatus = formDelay.querySelector(
      'input[name="state"]:checked'
    ).value;
    setTimeout(() => {
      if (getStatus === 'fulfilled') {
        onSuccess(checkedDealy);
      } else {
        console.log(formDelay.elements['state']);
        onError(checkedDealy);
      }
    }, checkedDealy);
  };
  createMessage(formDelay['delay'].value, messageSuccess, messageReject);
  formDelay.reset();
});
