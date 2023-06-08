import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  OPEN_ORDER_DETAILS_MODAL,
  CLOSE_ORDER_DETAILS_MODAL,
} from '../actions/actions'

const initialState = {
  orderCurrent: null,
  orderRequest: false,
  orderFailed: false,
  isOpenOrder: false
}

export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true
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
        orderRequest: false
      };
    }
    case OPEN_ORDER_DETAILS_MODAL: {
      return {
        ...state,
        isOpenOrder: true
      };
    }
    case CLOSE_ORDER_DETAILS_MODAL: {
      return {
        ...state,
        isOpenOrder: false
      };
    }
    default: {
      return state;
    }
  }
};