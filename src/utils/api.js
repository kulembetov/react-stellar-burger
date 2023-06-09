import { checkResponse, checkSuccess } from "./res-ok";
// 1 раз объявляем базовый урл
export const BASE_URL = "https://norma.nomoreparties.space/api/";

const request = (endpoint, options) => {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
};

// получение ингредиентов с сервера
export const getIngredientsData = () => request("ingredients");

// отправка заказа на сервер
export const getOrderData = (ingredients) => {
  return request("orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients,
    }),
  });
};
