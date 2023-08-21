import {
  IIngredient,
  IOrder,
  IPatchUserObject,
  IPostRegisterUserObject,
  IPostResetObject,
  IUser,
  THeaders,
  TOrder,
  TResponseBody,
} from "../services/types/data";
import { checkResponse } from "./res-ok";

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
const request = <T>(
  endpoint: RequestInfo | URL,
  options?: RequestInit
): Promise<T> => {
  return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse);
};

// получение ингредиентов с сервера
export const getIngredientsData = (): Promise<
  TResponseBody<"data", IIngredient[]>
> => {
  return request("ingredients");
};

// отправка заказа с токеном
export const postOrder = (
  ingredients: string[]
): Promise<TResponseBody<"order", Readonly<TOrder>>> => {
  return request(ORDERS_KEY, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("accessToken"),
    } as HeadersInit,
    body: JSON.stringify({
      ingredients,
    }),
  });
};

// получение данных о заказе по его номеру
export const getOrdersFetch = (
  number: number
): Promise<TResponseBody<"orders", IOrder[]>> => {
  return request(`orders/${number}`);
};

// получение данных пользователя
export const getUser = (): Promise<TResponseBody<"user", Readonly<IUser>>> => {
  return requestWithRefresh(USER_KEY, {
    method: "GET",
    headers: {
      authorization: localStorage.getItem("accessToken"),
      "Content-Type": "application/json;charset=utf-8",
    } as (HeadersInit | undefined) & THeaders,
  });
};

// обновление данных пользователя
export const patchUser = (object: IPatchUserObject) => {
  return requestWithRefresh(USER_KEY, {
    method: "PATCH",
    headers: {
      authorization: localStorage.getItem("accessToken"),
      "Content-Type": "application/json;charset=utf-8",
    } as (HeadersInit | undefined) & THeaders,
    body: JSON.stringify(object),
  });
};

// обновление токена доступа
export const refreshToken = (): Promise<TResponseBody> => {
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
export const requestWithRefresh = async (
  endpoint: string,
  options: RequestInit & {
    headers: { authorization: string | null; "Content-Type": string };
  }
): Promise<TResponseBody<"user", Readonly<IUser>>> => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(`${BASE_URL}${endpoint}`, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

// аутентификация пользователя
export const login = (object: {
  email: string;
  password: string;
}): Promise<TResponseBody<"user", Readonly<IUser>>> => {
  return request(LOGIN_KEY, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(object),
  });
};

// выход из системы
export const logOut = (): Promise<TResponseBody> => {
  return request(LOGOUT_KEY, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("accessToken"),
    } as HeadersInit,
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

// регистрация пользователя
export const postRegister = (
  object: IPostRegisterUserObject
): Promise<TResponseBody<"register", Readonly<IUser>>> => {
  return request(REGISTER_USER_KEY, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(object),
  });
};

// отправка запроса на сброс пароля
export const postMail = (
  email: string
): Promise<TResponseBody<"reset_password", string>> => {
  return request(FORGOT_PASSWORD_KEY, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
    }),
  });
};

// запрос на сброс пароля
export const resetPasswordRequest = (
  object: IPostResetObject
): Promise<TResponseBody<"reset_password", string>> => {
  return request(RESET_PASSWORD_KEY, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(object),
  });
};
