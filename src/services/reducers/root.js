import { combineReducers } from "redux";
import { burgerConstructorReducer } from "./constructor";
import { getOrderReducer } from "./get-order";
import { ingredientDetailsReducer } from "./ingredient";
import { burgerIngredientsReducer } from "./ingredients";
import { orderDetailsReducer } from "./order-details";
import { userReducer } from "./user";
import { ordersReducer } from "./orders";
import { profileOrdersReducer } from "./profile-orders";

export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  ingredients: burgerIngredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderDetails: orderDetailsReducer,
  user: userReducer,
  order: getOrderReducer,
  orders: ordersReducer,
  profileOrders: profileOrdersReducer,
});

