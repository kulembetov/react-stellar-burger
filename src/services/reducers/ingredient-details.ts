import {
  MODAL_INGREDIENT_DETAILS_CLOSE,
  MODAL_INGREDIENT_DETAILS_OPEN,
  TAB_INGREDIENT_DELETE,
  TAB_INGREDIENT_SET,
} from "../actions/ingredient-details";
import { IIngredient } from "../types/data";
import { TIngredientDetailsActions } from "./../actions/ingredient-details";

export type TIngredientDetailsState = {
  tabIngredient: IIngredient | null;
  isOpenIngredient: boolean;
};

const initialState: TIngredientDetailsState = {
  tabIngredient: null,
  isOpenIngredient: false,
};

export const ingredientDetailsReducer = (
  state = initialState,
  action: TIngredientDetailsActions
) => {
  switch (action.type) {
    case TAB_INGREDIENT_SET: {
      return {
        ...state,
        tabIngredient: action.tabIngredient,
      };
    }
    case TAB_INGREDIENT_DELETE: {
      return {
        ...state,
        tabIngredient: null,
      };
    }
    case MODAL_INGREDIENT_DETAILS_OPEN: {
      return {
        ...state,
        isOpenIngredient: true,
      };
    }
    case MODAL_INGREDIENT_DETAILS_CLOSE: {
      return {
        ...state,
        isOpenIngredient: false,
      };
    }
    default: {
      return state;
    }
  }
};
