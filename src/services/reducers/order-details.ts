import {
  MODAL_ORDER_DETAILS_CLOSE,
  MODAL_ORDER_DETAILS_OPEN,
  POST_ORDER_FAILED,
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  TOrderDetailsActions,
} from "../actions/order-details";
import { TOrder } from "../types/data";

export type TOrderDetailsState = {
  orderCurrent: TOrder | null;
  orderRequest: boolean;
  orderFailed: boolean;
  isOpenOrder: boolean;
};

const initialState: TOrderDetailsState = {
  orderCurrent: null,
  orderRequest: false,
  orderFailed: false,
  isOpenOrder: false,
};

export const orderDetailsReducer = (
  state = initialState,
  action: TOrderDetailsActions
) => {
  switch (action.type) {
    case POST_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        orderFailed: false,
        orderRequest: false,
        orderCurrent: action.order,
      };
    }
    case POST_ORDER_FAILED: {
      return {
        ...state,
        orderFailed: true,
        orderRequest: false,
      };
    }
    case MODAL_ORDER_DETAILS_OPEN: {
      return {
        ...state,
        isOpenOrder: true,
      };
    }
    case MODAL_ORDER_DETAILS_CLOSE: {
      return {
        ...state,
        isOpenOrder: false,
      };
    }
    default: {
      return state;
    }
  }
};
