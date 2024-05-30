export const API_URL = 'https://phase-opalescent-drawbridge.glitch.me';

const fetchData = async (endpoint, option = {}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, option);

    if (!response.ok) throw new Error(`Ошибка запроса: ${response}`);

    return await response.json();
  } catch (error) {
    console.error(`Ошибка запроса: ${error}`);
  }
};

export const fetchProductByCategory = (category) =>
  fetchData(`/api/products/category/${category}`);

export const fetchCartItems = (ids) =>
  fetchData(`/api/products/list/${ids.join(',')}`);

// отправка заказа из формы корзины
export const submitOrder = (storeId, products) =>
  fetchData(`/api/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ storeId, products }),
  });
