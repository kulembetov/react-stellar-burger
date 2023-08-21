import {
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  TGetOrderActions,
} from "../actions/get-order";
import { IOrder } from "../types/data";

export type TGetOrderState = {
  order: IOrder | null;
  orderRequest: boolean;
  orderFailed: boolean;
};

const initialState: TGetOrderState = {
  order: null,
  orderRequest: false,
  orderFailed: false,
};

export const getOrderReducer = (
  state = initialState,
  action: TGetOrderActions
) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderFailed: false,
        order: action.orders,
        orderRequest: false,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderFailed: true,
        orderRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
