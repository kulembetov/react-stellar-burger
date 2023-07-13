import { combineReducers } from "redux";
import { burgerConstructorReducer } from "./constructor";
import { ingredientDetailsReducer } from "./ingredient";
import { burgerIngredientsReducer } from "./ingredients";
import { orderDetailsReducer } from "./order-details";
import { userReducer } from "./user";

export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  burgerIngredients: burgerIngredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderDetails: orderDetailsReducer,
  userReducer: userReducer,
});
