const input = document.querySelector('.subscribe__input');
const button = document.querySelector('.subscribe__button');

input.addEventListener('focus', () => {
  input.dataset.placeholder = input.placeholder;
  input.placeholder = '';
});

input.addEventListener('blur', () => {
  input.placeholder = input.dataset.placeholder;
});

input.addEventListener('input', ({ target }) => {
  button.disabled = !target.value.trim();
});
