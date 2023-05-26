// проверяет ответ от сервера
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`${res.status}`));
};

// объект с настройками для запросов к серверу
const settings = {
  baseUrl: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application/json",
  },
};

// получение ингредиентов с сервера
const getData = () =>
  fetch(`${settings.baseUrl}/ingredients`).then(checkResponse);

// отправка заказа на сервер
const postOrder = (array) => {
  return fetch(`${settings.baseUrl}/orders`, {
    method: "POST",
    headers: settings.headers,
    body: JSON.stringify({
      ingredients: array,
    }),
  }).then(checkResponse);
};

export { getData, postOrder };
