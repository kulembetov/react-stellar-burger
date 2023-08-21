import {
  MODAL_ORDER_CLOSE,
  MODAL_ORDER_OPEN,
  TModalOrderActions,
} from "../actions/order-modal";
export type TModalOrderState = {
  isOpenOrder: boolean;
};

const initialState: TModalOrderState = {
  isOpenOrder: false,
};

export const orderModalReducer = (
  state = initialState,
  action: TModalOrderActions
) => {
  switch (action.type) {
    case MODAL_ORDER_OPEN: {
      return {
        ...state,
        isOpenOrder: true,
      };
    }
    case MODAL_ORDER_CLOSE: {
      return {
        ...state,
        isOpenOrder: true,
      };
    }
    default: {
      return state;
    }
  }
};
