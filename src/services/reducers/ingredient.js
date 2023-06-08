import {
  SET_TAB_INGREDIENT,
  DELETE_TAB_INGREDIENT,
  OPEN_INGREDIENT_DETAILS_MODAL,
  CLOSE_INGREDIENT_DETAILS_MODAL,
} from '../actions/actions'

const initialState = {
  tabIngredient: null,
  isOpenIngredient: false,
}

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TAB_INGREDIENT: {
      return {
        ...state,
        tabIngredient: action.tabIngredient
      };
    }
    case DELETE_TAB_INGREDIENT: {
      return {
        ...state,
        tabIngredient: null
      };
    }
    case OPEN_INGREDIENT_DETAILS_MODAL: {
      return {
        ...state,
        isOpenIngredient: true
      };
    }
    case CLOSE_INGREDIENT_DETAILS_MODAL: {
      return {
        ...state,
        isOpenIngredient: false
      };
    }
    default: {
      return state;
    }
  }
};