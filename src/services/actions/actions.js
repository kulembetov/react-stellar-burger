import { createAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import {
  getIngredientsData,
  getOrdersFetch,
  getUser,
  logOut,
  login,
  patchUser,
  postOrder,
  postRegister
} from "../../utils/api";

// типы экшенов
export const GET_DATA_REQUEST = "GET_DATA_REQUEST";
export const GET_DATA_SUCCESS = "GET_DATA_SUCCESS";
export const GET_DATA_FAILED = "GET_DATA_FAILED";
export const POST_ORDER_REQUEST = "POST_ORDER_REQUEST";
export const POST_ORDER_SUCCESS = "POST_ORDER_SUCCESS";
export const POST_ORDER_FAILED = "POST_ORDER_FAILED";
export const INGREDIENTS_CONSTRUCTOR_REQUEST =
  "GET_INGREDIENTS_CONSTRUCTOR_REQUEST";
export const ADD_INGREDIENTS_CONSTRUCTOR = "ADD_INGREDIENTS_CONSTRUCTOR";
export const ADD_INGREDIENTS_CONSTRUCTOR_BUN =
  "ADD_INGREDIENTS_CONSTRUCTOR_BUN";
export const DELETE_INGREDIENTS_CONSTRUCTOR = "DELETE_INGREDIENTS_CONSTRUCTOR";
export const CLEAR_INGREDIENTS_CONSTRUCTOR = "CLEAR_INGREDIENTS_CONSTRUCTOR";
export const CLEAR_INGREDIENTS_CONSTRUCTOR_BUN =
  "CLEAR_INGREDIENTS_CONSTRUCTOR_BUN";
export const SET_TAB_INGREDIENT = "SET_TAB_INGREDIENT";
export const DELETE_TAB_INGREDIENT = "DELETE_TAB_INGREDIENT";
export const MOVE_INGREDIENT = "MOVE_INGREDIENT";
export const OPEN_INGREDIENT_DETAILS_MODAL = "OPEN_INGREDIENT_DETAILS_MODAL";
export const CLOSE_INGREDIENT_DETAILS_MODAL = "CLOSE_INGREDIENT_DETAILS_MODAL";
export const OPEN_ORDER_DETAILS_MODAL = "OPEN_ORDER_DETAILS_MODAL";
export const CLOSE_ORDER_DETAILS_MODAL = "CLOSE_ORDER_DETAILS_MODAL";
export const SET_TAB_ORDER = "SET_TAB_ORDER";
export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const MODAL_ORDER_DETAILS_OPEN = "MODAL_ORDER_DETAILS_OPEN";
export const MODAL_ORDER_DETAILS_CLOSE = "MODAL_ORDER_DETAILS_CLOSE";

export const GET_USER_REQUEST = "GET_DATA_REQUEST";
export const GET_USER_SUCCESS = "GET_DATA_SUCCESS";
export const GET_USER_FAILED = "GET_DATA_FAILED";

export const PATCH_USER_REQUEST = "PATCH_DATA_REQUEST";
export const PATCH_USER_SUCCESS = "PATCH_DATA_SUCCESS";
export const PATCH_USER_FAILED = "PATCH_DATA_FAILED";

export const POST_SIGNIN_REQUEST = "POST_SIGNIN_REQUEST";
export const POST_SIGNIN_SUCCESS = "POST_SIGNIN_SUCCESS";
export const POST_SIGNIN_FAILED = "POST_SIGNIN_FAILED";

export const POST_SIGNOUT_REQUEST = "POST_SIGNOUT_REQUEST";
export const POST_SIGNOUT_SUCCESS = "POST_SIGNOUT_SUCCESST";
export const POST_SIGNOUT_FAILED = "POST_SIGNOUT_FAILED";

export const POST_REGISTER_REQUEST = "POST_REGISTER_REQUEST";
export const POST_REGISTER_SUCCESS = "POST_REGISTER_SUCCESS";
export const POST_REGISTER_FAILED = "POST_REGISTER_FAILED";

export const SET_AUTHORIZATION_CHECKED = "SET_AUTHORIZATION_CHECKED";
export const SET_USER = "SET_USER";

// cоздание экшенов
export const connect = createAction("GET_ALL_ORDERS_CONNECT");
export const disconnect = createAction("GET_ALL_ORDERS_DISCONNECT");
export const wsConnecting = createAction("GET_ALL_ORDERS_WS_CONNECTING");
export const wsOpen = createAction("GET_ALL_ORDERS_WS_OPEN");
export const wsClose = createAction("GET_ALL_ORDERS_WS_CLOSE");
export const wsMessage = createAction("GET_ALL_ORDERS_WS_MESSAGE");
export const wsError = createAction("GET_ALL_ORDERS_WS_ERROR");

export const connectInProfile = createAction(
  "GET_ALL_ORDERS_IN_PROFILE_CONNECT"
);
export const disconnectInProfile = createAction(
  "GET_ALL_ORDERS_IN_PROFILE_DISCONNECT"
);
export const wsConnectingInProfile = createAction(
  "GET_ALL_ORDERS_IN_PROFILE_WS_CONNECTING"
);
export const wsOpenInProfile = createAction(
  "GET_ALL_ORDERS_IN_PROFILE_WS_OPEN"
);
export const wsCloseInProfile = createAction(
  "GET_ALL_ORDERS_IN_PROFILE_WS_CLOSE"
);
export const wsMessageInProfile = createAction(
  "GET_ALL_ORDERS_IN_PROFILE_WS_MESSAGE"
);
export const wsErrorInProfile = createAction(
  "GET_ALL_ORDERS_IN_PROFILE_WS_ERROR"
);

// thunk экшены
// заказы
export const getData = () => {
  return (dispatch) => {
    dispatch({ type: GET_DATA_REQUEST });

    getIngredientsData()
      .then((res) => {
        dispatch({
          type: GET_DATA_SUCCESS,
          data: res.data,
        });
      })
      .catch((err) => {
        dispatch({ type: GET_DATA_FAILED });
      });
  };
};

export const getOrder = (number) => {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    getOrdersFetch(number)
      .then((res) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: res.orders[0],
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_ORDER_FAILED,
        });
      });
  };
};

export const postOrderFetch = (array) => {
  return (dispatch) => {
    dispatch({ type: POST_ORDER_REQUEST });

    postOrder(array)
      .then((res) => {
        dispatch({
          type: POST_ORDER_SUCCESS,
          order: res,
        });
      })
      .catch((err) => {
        dispatch({ type: POST_ORDER_FAILED });
      });
  };
};

export const setTabIngredient = (item) => {
  return {
    type: SET_TAB_INGREDIENT,
    tabIngredient: item,
  };
};

// конструктор
export const addIngredientsConstructor = (item, keyUuid) => {
  return {
    type: ADD_INGREDIENTS_CONSTRUCTOR,
    ingredients: item,
    keyUuid: uuidv4(),
  };
};

export const addIngredientsConstructorBun = (item) => {
  return {
    type: ADD_INGREDIENTS_CONSTRUCTOR_BUN,
    bun: item,
  };
};

export const clearIngredientsConstructor = () => {
  return {
    type: CLEAR_INGREDIENTS_CONSTRUCTOR,
  };
};

export const clearIngredientsConstructorBun = () => {
  return {
    type: CLEAR_INGREDIENTS_CONSTRUCTOR_BUN,
  };
};

export const deleteTabIngredient = () => {
  return {
    type: DELETE_TAB_INGREDIENT,
  };
};

export const moveIngredient = (dragIndex, hoverIndex) => {
  return {
    type: MOVE_INGREDIENT,
    dragIndex: dragIndex,
    hoverIndex: hoverIndex,
  };
};

// модальное окно
export const openIngredientDetailsModal = () => {
  return {
    type: OPEN_INGREDIENT_DETAILS_MODAL,
  };
};

export const closeIngredientDetailsModal = () => {
  return {
    type: CLOSE_INGREDIENT_DETAILS_MODAL,
  };
};

export const openOrderDetailsModal = () => {
  return {
    type: OPEN_ORDER_DETAILS_MODAL,
  };
};

export const closeOrderDetailsModal = () => {
  return {
    type: CLOSE_ORDER_DETAILS_MODAL,
  };
};

// пользователь
export const postRegisterFetch = (array) => {
  return (dispatch) => {
    dispatch({ type: POST_REGISTER_REQUEST });

    postRegister(array)
      .then((res) => {
        dispatch({
          type: POST_REGISTER_SUCCESS,
          user: setUser(res.user),
        });
      })
      .catch((err) => {
        dispatch({
          type: POST_REGISTER_FAILED,
        });
      });
  };
};

export const setAuthorizationChecked = (value) => ({
  type: SET_AUTHORIZATION_CHECKED,
  payload: value,
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const getUserFetch = () => {
  return function (dispatch) {
    return getUser().then((res) => {
      dispatch(setUser(res.user));
    });
  };
};

export const patchUserFetch = (form) => {
  return function (dispatch) {
    dispatch({
      type: POST_SIGNIN_REQUEST,
    });
    patchUser(form)
      .then((res) => {
        dispatch({
          type: PATCH_USER_SUCCESS,
          user: res,
        });
        dispatch(setUser(res.user));
      })
      .catch((err) => {
        dispatch({
          type: PATCH_USER_FAILED,
        });
      });
  };
};

export const register = (form) => {
  return (dispatch) => {
    dispatch({ type: POST_REGISTER_REQUEST });

    postRegister(form)
      .then((res) => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch({
          type: POST_REGISTER_SUCCESS,
          user: res,
        });
        dispatch(setUser(res.user));
        dispatch(setAuthorizationChecked(true));
      })
      .catch((err) => {
        dispatch({
          type: POST_REGISTER_FAILED,
        });
      });
  };
};

export const authentication = () => {
  return (dispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUserFetch())
        .then(() => {
          dispatch(setAuthorizationChecked(true));
        })
        .catch((error) => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(setUser(null));
          dispatch(setAuthorizationChecked(true));
        });
    } else {
      dispatch(setAuthorizationChecked(true));
    }
  };
};

export const signIn = (form) => {
  return function (dispatch) {
    dispatch({
      type: POST_SIGNIN_REQUEST,
    });
    login(form)
      .then((res) => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch({
          type: POST_SIGNIN_SUCCESS,
          user: res,
        });
        dispatch(setUser(res.user));
        dispatch(setAuthorizationChecked(true));
      })
      .catch((err) => {
        dispatch({
          type: POST_SIGNIN_FAILED,
        });
      });
  };
};

export const signOut = () => {
  return function (dispatch) {
    dispatch({
      type: POST_SIGNOUT_REQUEST,
    });
    logOut()
      .then((res) => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch({
          type: POST_SIGNOUT_SUCCESS,
        });
        dispatch(setUser(null));
      })
      .catch((err) => {
        dispatch({
          type: POST_SIGNOUT_FAILED,
        });
      });
  };
};
