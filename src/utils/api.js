import { checkResponse, checkSuccess } from "./res-ok";

// определяет url
export const BASE_URL = "https://norma.nomoreparties.space/api/";
export const ORDERS_KEY = "/orders";
export const INGREDIENTS_KEY = "/ingredients";
export const FORGOT_PASS_KEY = "/password-reset";
export const RESET_PASS_KEY = "/password-reset/reset";
export const REGISTER_USER_KEY = "/auth/register";
export const LOGIN_KEY = "/auth/login";
export const USER_KEY = "/auth/user";
export const TOKEN_KEY = "/auth/token";
export const LOGOUT_KEY = "/auth/logout";

// универсальный запрос
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

// получение данных пользователя
export const getUser = () => {
  return requestWithRefresh("auth/user", {
    method: "GET",
    headers: {
      authorization: localStorage.getItem("accessToken"),
      "Content-Type": "application/json;charset=utf-8",
    },
  });
};

// обновление данных пользователя
export const patchUser = ({ name, email, password }) => {
  return requestWithRefresh("auth/user", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem("accessToken"),
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
};

// обновление токена доступа
export const refreshToken = () => {
  return request("auth/token", {
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
      const refreshData = await refreshToken(
        localStorage.getItem("refreshToken")
      );
      if (!refreshData.success) {
        throw new Error("Failed to refresh token");
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(`${BASE_URL}${endpoint}`, options);
      return await checkResponse(res);
    } else {
      throw err;
    }
  }
};

// аутентификация пользователя
export const login = ({ email, password }) => {
  return request("auth/login", {
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
  return request("auth/logout", {
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
  return request("auth/register", {
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
  return request("password-reset", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
    }),
  });
};

// запрос на сброс пароля
export const resetPasswordRequest = ({ password, token }) => {
  return request("password-reset/reset", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      password,
      token,
    }),
  });
};
