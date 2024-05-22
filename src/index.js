// отправка формы на главной
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

// переключение категорий
const buttons = document.querySelectorAll('.store__category-button');

const changeActiveBtn = ({ target }) => {
  buttons.forEach((button) => {
    button.classList.remove('store__category-button_active');
  });

  target.classList.add('store__category-button_active');
};

buttons.forEach((button) => {
  button.addEventListener('click', changeActiveBtn);
});
