import { checkResponse, checkSuccess } from "./res-ok";

// определяет url
export const BASE_URL = "https://norma.nomoreparties.space/api/";

// универсальные маршруты
export const ORDERS_KEY = "orders";
export const INGREDIENTS_KEY = "ingredients";
export const FORGOT_PASSWORD_KEY = "password-reset";
export const RESET_PASSWORD_KEY = "password-reset/reset";
export const REGISTER_USER_KEY = "auth/register";
export const LOGIN_KEY = "auth/login";
export const USER_KEY = "auth/user";
export const TOKEN_KEY = "auth/token";
export const LOGOUT_KEY = "auth/logout";

// универсальный запрос с общими заголовками
const request = (endpoint, options) => {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
};

// универсальные заголовки
const createHeaders = (headers) => {
  return {
    ...headers,
    "Content-Type": "application/json",
    authorization: localStorage.getItem("accessToken"),
  };
};

// получение ингредиентов с сервера
export const getIngredientsData = () => request("ingredients");

// отправка заказа на сервер
export const getOrderData = (ingredients) => {
  return request(ORDERS_KEY, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients,
    }),
  });
};

// отправка заказа с токеном
export const postOrder = (ingredients) => {
  return request(ORDERS_KEY, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("accessToken"),
    },
    body: JSON.stringify({
      ingredients,
    }),
  });
};

// получение данных о заказе по его номеру
export const getOrdersFetch = (number) => {
  return request(`orders/${number}`);
};

// получение данных пользователя
export const getUser = () => {
  return requestWithRefresh(USER_KEY, {
    method: "GET",
    headers: createHeaders({
      "Content-Type": "application/json;charset=utf-8",
    }),
  });
};

// обновление данных пользователя
export const patchUser = ({ name, email, password }) => {
  return requestWithRefresh(USER_KEY, {
    method: "PATCH",
    headers: createHeaders({
      "Content-Type": "application/json;charset=utf-8",
    }),
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
};

// обновление токена доступа
export const refreshToken = () => {
  return request(TOKEN_KEY, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

// асинхронный запрос с обновлением токена
export const requestWithRefresh = async (endpoint, options) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(`${BASE_URL}${endpoint}`, options); //повторяем запрос
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

// аутентификация пользователя
export const login = ({ email, password }) => {
  return request(LOGIN_KEY, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
    }),
  });
};

// выход из системы
export const logOut = () => {
  return request(LOGOUT_KEY, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("accessToken"),
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

// регистрация пользователя
export const postRegister = ({ email, password, name }) => {
  return request(REGISTER_USER_KEY, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
};

// отправка запроса на сброс пароля
export const postMail = (email) => {
  return request(FORGOT_PASSWORD_KEY, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
    }),
  });
};

// запрос на сброс пароля
export const resetPasswordRequest = ({ password, token }) => {
  return request(RESET_PASSWORD_KEY, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      password,
      token,
    }),
  });
};
