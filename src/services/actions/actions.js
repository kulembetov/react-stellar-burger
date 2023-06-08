import { getIngredientsData, getOrderData } from "../../utils/api";
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

export const getData = () => {
  return function (dispatch) {
    dispatch({
      type: GET_DATA_REQUEST,
    });
    getIngredientsData()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_DATA_SUCCESS,
            data: res.data,
          });
        } else {
          dispatch({
            type: GET_DATA_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_DATA_FAILED,
        });
      });
  };
};

export const postOrder = (array) => {
  return function (dispatch) {
    dispatch({
      type: POST_ORDER_REQUEST,
    });
    getOrderData(array)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: POST_ORDER_SUCCESS,
            order: res,
          });
        } else {
          dispatch({
            type: POST_ORDER_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: POST_ORDER_FAILED,
        });
      });
  };
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
    key: keyUuid,
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
