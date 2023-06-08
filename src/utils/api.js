import { checkResponse } from "./res-ok";

// объект с настройками для запросов к серверу
const settings = {
  baseUrl: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application/json",
  },
};

// получение ингредиентов с сервера
const getIngredientsData = () =>
  fetch(`${settings.baseUrl}/ingredients`).then(checkResponse);

// отправка заказа на сервер
const getOrderData = (ingredients) => {
  return fetch(`${settings.baseUrl}/orders`, {
    method: "POST",
    headers: settings.headers,
    body: JSON.stringify({
      ingredients,
    }),
  }).then(checkResponse);
};

export { getIngredientsData, getOrderData };
