import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
function messageSuccess(msg) {
  iziToast.success({
    title: 'OK',
    message: msg,
    position: 'topRight',
    theme: 'dark',
    backgroundColor: '#59a10d',
  });
}
function messageReject(msg) {
  iziToast.error({
    title: 'Error',
    message: msg,
    position: 'topRight',
    theme: 'dark',
    icon: '',
    iconUrl: '/img/error.svg',
    backgroundColor: '#ef4040',
  });
}
const formDelay = document.querySelector('.form');
formDelay.addEventListener('submit', event => {
  event.preventDefault();
  const delay = formDelay.elements['delay'].value;
  const status = formDelay.querySelector('input[name="state"]:checked').value;
  createMessage(delay, status)
    .then(result => messageSuccess(`Fulfilled promise in ${result}ms`))
    .catch(error => messageReject(`Rejected promise in ${error}ms`));
  formDelay.reset();
});
function createMessage(delay, status) {
  let checkedDelay = Number.isNaN(Number(delay)) || delay <= 0 ? 0 : delay;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (status === 'fulfilled') {
        resolve(checkedDelay);
      } else {
        reject(checkedDelay);
      }
    }, checkedDelay);
  });
}
