import update, { CustomCommands } from "immutability-helper";
import {
  ADD_INGREDIENTS_CONSTRUCTOR,
  ADD_INGREDIENTS_CONSTRUCTOR_BUN,
  CLEAR_INGREDIENTS_CONSTRUCTOR,
  CLEAR_INGREDIENTS_CONSTRUCTOR_BUN,
  DELETE_INGREDIENTS_CONSTRUCTOR,
  MOVE_INGREDIENT,
  TConstructorActions,
} from "../actions/constructor";
import { IIngredient } from "../types/data";

export type TIngredientsState = {
  ingredients: readonly IIngredient[];
  bun: IIngredient | null;
};

const initialState: TIngredientsState = {
  ingredients: [],
  bun: null,
};

export const burgerConstructorReducer = (
  state = initialState,
  action: TConstructorActions
) => {
  switch (action.type) {
    case ADD_INGREDIENTS_CONSTRUCTOR: {
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          { ...action.ingredients, keyUuid: action.keyUuid },
        ],
      };
    }
    case ADD_INGREDIENTS_CONSTRUCTOR_BUN: {
      return {
        ...state,
        bun: action.bun,
      };
    }
    case DELETE_INGREDIENTS_CONSTRUCTOR: {
      return {
        ...state,
        ingredients: [...state.ingredients].filter(
          (item) => item.keyUuid !== action.keyUuid
        ),
      };
    }
    case MOVE_INGREDIENT: {
      const updatedIngredients = update<IIngredient[], CustomCommands<object>>(
        [...state.ingredients],
        {
          $splice: [
            [[action.dragIndex], 1],
            [[action.hoverIndex], 0, [...state.ingredients][action.dragIndex]],
          ],
        }
      );
      return {
        ...state,
        ingredients: updatedIngredients,
      };
    }
    case CLEAR_INGREDIENTS_CONSTRUCTOR: {
      return {
        ...state,
        ingredients: [],
      };
    }
    case CLEAR_INGREDIENTS_CONSTRUCTOR_BUN: {
      return {
        ...state,
        bun: null,
      };
    }
    default: {
      return state;
    }
  }
};
