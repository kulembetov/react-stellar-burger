import { postOrder } from "../../utils/api";
import { AppDispatch } from "../types";
import { TOrder } from "../types/data";

export const POST_ORDER_REQUEST = "POST_ORDER_REQUEST";
export const POST_ORDER_SUCCESS = "POST_ORDER_SUCCESS";
export const POST_ORDER_FAILED = "POST_ORDER_FAILED";
export const MODAL_ORDER_DETAILS_OPEN = "MODAL_ORDER_DETAILS_OPEN";
export const MODAL_ORDER_DETAILS_CLOSE = "MODAL_ORDER_DETAILS_CLOSE";

export interface IPostOrderAction {
  readonly type: typeof POST_ORDER_REQUEST;
}

export interface IPostOrderFailedAction {
  readonly type: typeof POST_ORDER_FAILED;
}

export interface IPostOrderSuccessAction {
  readonly type: typeof POST_ORDER_SUCCESS;
  readonly order: Readonly<TOrder>;
}

export interface IModalOrderDetailsOpenAction {
  readonly type: typeof MODAL_ORDER_DETAILS_OPEN;
}

export interface IModalOrderDetailsCloseAction {
  readonly type: typeof MODAL_ORDER_DETAILS_CLOSE;
}

export type TOrderDetailsActions =
  | IPostOrderAction
  | IPostOrderFailedAction
  | IPostOrderSuccessAction
  | IModalOrderDetailsOpenAction
  | IModalOrderDetailsCloseAction;

export const postOrderFetch = (array: string[]) => {
  return (dispatch: AppDispatch) => {
    dispatch(postOrderRequest());

    postOrder(array)
      .then((res) => {
        dispatch(postOrderSuccess(res.order));
      })
      .catch((err) => {
        dispatch(postOrderFailed());
      });
  };
};

export function postOrderRequest(): IPostOrderAction {
  return {
    type: POST_ORDER_REQUEST,
  };
}

export function postOrderFailed(): IPostOrderFailedAction {
  return {
    type: POST_ORDER_FAILED,
  };
}

export function postOrderSuccess(
  order: Readonly<TOrder>
): IPostOrderSuccessAction {
  return {
    type: POST_ORDER_SUCCESS,
    order,
  };
}

export function openModalOrderDetails(): IModalOrderDetailsOpenAction {
  return {
    type: MODAL_ORDER_DETAILS_OPEN,
  };
}

export function closeModalOrderDetails(): IModalOrderDetailsCloseAction {
  return {
    type: MODAL_ORDER_DETAILS_CLOSE,
  };
}
