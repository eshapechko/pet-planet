// отправка формы на главной
const initEmailForm = () => {
  const subscribeInput = document.querySelector('.subscribe__input');
  const subscribeButton = document.querySelector('.subscribe__button');

  subscribeInput.addEventListener('focus', () => {
    subscribeInput.dataset.placeholder = subscribeInput.placeholder;
    subscribeInput.placeholder = '';
  });

  subscribeInput.addEventListener('blur', () => {
    subscribeInput.placeholder = subscribeInput.dataset.placeholder;
  });

  subscribeInput.addEventListener('input', ({ target }) => {
    subscribeButton.disabled = !target.value.trim();
  });
};

initEmailForm();
