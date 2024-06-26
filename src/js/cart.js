import { fetchCartItems, submitOrder } from './api';
import { createOrderMessage, renderCartItems } from './dom';

const cartButton = document.querySelector('.store__cart-button');
const cartCount = cartButton.querySelector('.store__cart-cnt');
const modalOverlay = document.querySelector('.modal-overlay');
const cartItemsList = document.querySelector('.modal__cart-items');
const cartTotalPriceElement = document.querySelector('.modal__cart-price');
const cartForm = document.querySelector('.modal__cart-form');
const orderFormButton = document.querySelector('.modal__cart-button');

// считаем общую сумму корзины
const calculateTotalPrice = (cartItems, products) =>
  cartItems.reduce((acc, item) => {
    const product = products.find((prod) => prod.id === item.id);
    return acc + product.price * item.count;
  }, 0);

// обновление количества товаров на иконке с корзиной
const updateCartCount = () => {
  const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  cartCount.textContent = cartItems.length;
};

// добавление в корзину
export const addToCart = (productId) => {
  const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

  const existingItem = cartItems.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.count += 1;
  } else {
    cartItems.push({ id: productId, count: 1 });
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  updateCartCount();
};

// обновление количества товаров при клике на плюс и минус
const updateCartItem = (productId, change) => {
  const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  const itemIndex = cartItems.findIndex((item) => item.id === productId);

  if (itemIndex !== -1) {
    cartItems[itemIndex].count += change;

    if (cartItems[itemIndex].count <= 0) {
      cartItems.splice(itemIndex, 1);
      orderFormButton.disabled = !cartItems.length;
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    const products = JSON.parse(
      localStorage.getItem('cartProductDetails') || '[]',
    );

    updateCartCount();
    renderCartItems(cartItemsList, cartItems, products);
    const totalPrice = calculateTotalPrice(cartItems, products);
    cartTotalPriceElement.innerHTML = `${totalPrice}&nbsp;₽`;
  }
};

// изменение количества товаров при клике на плюс и минус
cartItemsList.addEventListener('click', ({ target }) => {
  if (target.classList.contains('modal__plus')) {
    const productId = target.dataset.id;
    updateCartItem(productId, 1);
  }

  if (target.classList.contains('modal__minus')) {
    const productId = target.dataset.id;
    updateCartItem(productId, -1);
  }
});

// открытие, закрытие корзины
cartButton.addEventListener('click', async () => {
  modalOverlay.style.display = 'flex';

  const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  const ids = cartItems.map((item) => item.id);

  if (!ids.length) {
    cartItemsList.textContent = '';
    const listItem = document.createElement('li');
    listItem.textContent = 'Корзина пуста';
    cartItemsList.append(listItem);
    return;
  }

  const products = await fetchCartItems(ids);
  localStorage.setItem('cartProductDetails', JSON.stringify(products));
  orderFormButton.disabled = !ids.length;

  renderCartItems(cartItemsList, cartItems, products);

  const totalPrice = calculateTotalPrice(cartItems, products);
  cartTotalPriceElement.innerHTML = `${totalPrice}&nbsp;₽`;
});

// закрытие модального окна корзины
modalOverlay.addEventListener('click', ({ target }) => {
  if (
    target === modalOverlay ||
    target.closest('.modal-overlay_close-button')
  ) {
    modalOverlay.style.display = 'none';
  }
});

cartForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const storeId = cartForm.store.value;
  const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

  const products = cartItems.map(({ id, count }) => ({
    id,
    quantity: count,
  }));

  const { orderId } = await submitOrder(storeId, products);

  localStorage.removeItem('cartItems');
  localStorage.removeItem('cartProductDetails');

  document.body.append(createOrderMessage(orderId));

  modalOverlay.style.display = 'none';
  updateCartCount();
});

updateCartCount();
