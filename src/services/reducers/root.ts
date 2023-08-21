import { combineReducers } from "redux";
import { burgerConstructorReducer } from "./constructor";
import { getOrderReducer } from "./get-order";
import { ingredientDetailsReducer } from "./ingredient-details";
import { burgerIngredientsReducer } from "./ingredients";
import { orderDetailsReducer } from "./order-details";
import { orderModalReducer } from "./order-modal";
import { ordersReducer } from "./orders";
import { profileOrdersReducer } from "./profile-orders";
import { userReducer } from "./user";

export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  ingredients: burgerIngredientsReducer,
  user: userReducer,
  order: getOrderReducer,
  orderDetails: orderDetailsReducer,
  orderModal: orderModalReducer,
  orders: ordersReducer,
  profileOrders: profileOrdersReducer,
});
