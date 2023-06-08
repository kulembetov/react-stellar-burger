import { combineReducers } from "redux";
import { burgerConstructorReducer } from "./constructor";
import { ingredientDetailsReducer } from './ingredient';
import { burgerIngredientsReducer } from "./ingredients";
import { orderDetailsReducer } from "./order-details";

export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  burgerIngredients: burgerIngredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderDetails: orderDetailsReducer,
});
