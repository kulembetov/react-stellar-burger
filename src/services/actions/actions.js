import { v4 as uuidv4 } from "uuid";
import {
  getIngredientsData,
  getOrderData,
  getUser,
  logOut,
  login,
  patchUser,
  postRegister,
} from "../../utils/api";

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

export const getData = () => async (dispatch) => {
  dispatch({ type: GET_DATA_REQUEST });

  try {
    const res = await getIngredientsData();
    dispatch({
      type: GET_DATA_SUCCESS,
      data: res.data,
    });
  } catch (err) {
    dispatch({ type: GET_DATA_FAILED });
  }
};

export const postOrder = (array) => async (dispatch) => {
  dispatch({ type: POST_ORDER_REQUEST });

  try {
    const res = await getOrderData(array);
    dispatch({
      type: POST_ORDER_SUCCESS,
      order: res,
    });
  } catch (err) {
    dispatch({ type: POST_ORDER_FAILED });
  }
};

export const setTabIngredient = (item) => {
  return {
    type: SET_TAB_INGREDIENT,
    tabIngredient: item,
  };
};

export const addIngredientsConstructor = (item, keyUuid) => {
  return {
    type: ADD_INGREDIENTS_CONSTRUCTOR,
    ingredients: item,
    key: uuidv4(),
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

export const postRegisterFetch = (array) => {
  return async (dispatch) => {
    dispatch({ type: POST_REGISTER_REQUEST });

    try {
      const res = await postRegister(array);

      if (res && res.success) {
        dispatch({
          type: POST_REGISTER_SUCCESS,
          user: setUser(res.user),
        });
      } else {
        dispatch({ type: POST_REGISTER_FAILED });
      }
    } catch (err) {
      dispatch({ type: POST_REGISTER_FAILED });
    }
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
  return async (dispatch) => {
    try {
      const res = await getUser();
      dispatch(setUser(res.user));
    } catch (err) {
      console.log(err)
    }
  };
};

export const patchUserFetch = (form) => {
  return async (dispatch) => {
    dispatch({ type: POST_SIGNIN_REQUEST });

    try {
      const res = await patchUser(form);

      if (res && res.success) {
        dispatch({ type: PATCH_USER_SUCCESS, user: res });
        dispatch(setUser(res.user));
      } else {
        dispatch({ type: PATCH_USER_FAILED });
      }
    } catch (err) {
      dispatch({ type: PATCH_USER_FAILED });
    }
  };
};

export const register = (form) => {
  return async (dispatch) => {
    dispatch({ type: POST_REGISTER_REQUEST });

    try {
      const res = await postRegister(form);

      if (res && res.success) {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch({ type: POST_REGISTER_SUCCESS, user: res });
        dispatch(setUser(res.user));
      } else {
        dispatch({ type: POST_REGISTER_FAILED });
      }
    } catch (err) {
      dispatch({ type: POST_REGISTER_FAILED });
    }
  };
};

export const authentication = () => {
  return async (dispatch) => {
    if (localStorage.getItem("accessToken")) {
      try {
        await dispatch(getUserFetch());
      } catch (error) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(setUser(null));
      } finally {
        dispatch(setAuthorizationChecked(true));
      }
    } else {
      dispatch(setAuthorizationChecked(true));
    }
  };
};

export const signIn = (form) => {
  return async (dispatch) => {
    dispatch({ type: POST_SIGNIN_REQUEST });

    try {
      const res = await login(form);

      if (res && res.success) {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch({ type: POST_SIGNIN_SUCCESS, user: res });
        dispatch(setUser(res.user));
        dispatch(setAuthorizationChecked(true));
      } else {
        dispatch({ type: POST_SIGNIN_FAILED });
      }
    } catch (err) {
      dispatch({ type: POST_SIGNIN_FAILED });
    }
  };
};

export const signOut = () => {
  return async (dispatch) => {
    dispatch({ type: POST_SIGNOUT_REQUEST });

    try {
      const res = await logOut();

      if (res && res.success) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch({ type: POST_SIGNOUT_SUCCESS });
        dispatch(setUser(null));
      } else {
        dispatch({ type: POST_SIGNOUT_FAILED });
      }
    } catch (err) {
      dispatch({ type: POST_SIGNOUT_FAILED });
    }
  };
};
