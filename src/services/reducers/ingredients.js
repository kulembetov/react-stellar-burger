import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_FAILED,
} from '../actions/actions'


const initialState = {
  burgerIngredients: [],
  burgerIngredientsRequest: false,
  burgerIngredientsFailed: false,
}

export const burgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA_REQUEST: {
      return {
        ...state,
        burgerIngredientsRequest: true
      };
    }
    case GET_DATA_SUCCESS: {
      return {
        ...state,
        burgerIngredientsFailed: false,
        burgerIngredients: action.data,
        burgerIngredientsRequest: false
      };
    }
    case GET_DATA_FAILED: {
      return {
        ...state,
        burgerIngredientsFailed: true,
        burgerIngredientsRequest: false
      };
    }
    default: {
      return state;
    }
  }
};