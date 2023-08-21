import { getOrdersFetch } from "../../utils/api";
import { AppDispatch } from "../types";
import { IOrder } from "../types/data";

export const GET_ORDER_REQUEST: "GET_ORDER_REQUEST" = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS" = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED: "GET_ORDER_FAILED" = "GET_ORDER_FAILED";

export interface IGetOrderAction {
  readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED;
}

export interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly orders: IOrder;
}

export type TGetOrderActions =
  | IGetOrderAction
  | IGetOrderFailedAction
  | IGetOrderSuccessAction;

export const getOrder = (number: number) => {
  return function (dispatch: AppDispatch) {
    dispatch(getOrderAction());
    getOrdersFetch(number)
      .then((res) => {
        dispatch(getOrderSuccessAction(res.orders[0]));
      })
      .catch(() => {
        dispatch(getOrderFailedAction());
      });
  };
};

export const getOrderAction = (): IGetOrderAction => ({
  type: GET_ORDER_REQUEST,
});

export const getOrderFailedAction = (): IGetOrderFailedAction => ({
  type: GET_ORDER_FAILED,
});

export const getOrderSuccessAction = (
  orders: IOrder
): IGetOrderSuccessAction => ({
  type: GET_ORDER_SUCCESS,
  orders,
});
