// отправка формы на главной
// const subscribeInput = document.querySelector('.subscribe__input');
// const subscribeButton = document.querySelector('.subscribe__button');

// subscribeInput.addEventListener('focus', () => {
//   subscribeInput.dataset.placeholder = subscribeInput.placeholder;
//   subscribeInput.placeholder = '';
// });

// subscribeInput.addEventListener('blur', () => {
//   subscribeInput.placeholder = subscribeInput.dataset.placeholder;
// });

// subscribeInput.addEventListener('input', ({ target }) => {
//   subscribeButton.disabled = !target.value.trim();
// });

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

const API_URL = 'https://phase-opalescent-drawbridge.glitch.me';

// https://phase-opalescent-drawbridge.glitch.me/api/products
const productList = document.querySelector('.store__list');

const createProductCard = (product) => {
  const productCard = document.createElement('li');
  productCard.classList.add('store__item');

  productCard.innerHTML = `
    <article class="store__product product">
      <img
        class="product__image"
        src="${API_URL}/${product.photoUrl}"
        alt="${product.name}" width='388' height='261'/>

      <h3 class="product__title">${product.name}</h3>

      <p class="product__price">${product.price}&nbsp;₽</p>

      <button class="product__btn-add-cart">Заказать</button>
    </article>
  `;

  return productCard;
};

const renderProducts = (products) => {
  productList.textContent = '';

  products.forEach((product) => {
    const productCard = createProductCard(product);

    productList.append(productCard);
  });
};

const fetchProductByCategory = async (category) => {
  try {
    const response = await fetch(
      `${API_URL}/api/products/category/${category}`,
    );

    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response}`);
    }

    const products = await response.json();

    renderProducts(products);
  } catch (error) {
    console.error(`Ошибка запроса товапов: ${error}`);
  }
};

fetchProductByCategory('Домики');
