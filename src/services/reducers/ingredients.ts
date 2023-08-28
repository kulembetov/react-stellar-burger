import {
  GET_DATA_FAILED,
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  TIngredientsActions,
} from "../actions/ingredients";
import { IIngredient } from "../types/data";

export type TIngredientsState = {
  burgerIngredients: IIngredient[];
  burgerIngredientsRequest: boolean;
  burgerIngredientsFailed: boolean;
};

const initialState: TIngredientsState = {
  burgerIngredients: [],
  burgerIngredientsRequest: false,
  burgerIngredientsFailed: false,
};

export const burgerIngredientsReducer = (
  state = initialState,
  action: TIngredientsActions
) => {
  switch (action.type) {
    case GET_DATA_REQUEST: {
      return {
        ...state,
        burgerIngredientsRequest: true,
      };
    }
    case GET_DATA_SUCCESS: {
      return {
        ...state,
        burgerIngredientsFailed: false,
        burgerIngredients: action.data,
        burgerIngredientsRequest: false,
      };
    }
    case GET_DATA_FAILED: {
      return {
        ...state,
        burgerIngredientsFailed: true,
        burgerIngredientsRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
