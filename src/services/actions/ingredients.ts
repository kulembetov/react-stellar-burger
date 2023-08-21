import { getIngredientsData } from "../../utils/api";
import { AppDispatch } from "../types";
import { IIngredient } from "../types/data";

export const GET_DATA_REQUEST = "GET_DATA_REQUEST";
export const GET_DATA_SUCCESS = "GET_DATA_SUCCESS";
export const GET_DATA_FAILED = "GET_DATA_FAILED";

export interface IGetDataAction {
  readonly type: typeof GET_DATA_REQUEST;
}

export interface IGetDataFailedAction {
  readonly type: typeof GET_DATA_FAILED;
}

export interface IGetDataSuccessAction {
  readonly type: typeof GET_DATA_SUCCESS;
  readonly data: IIngredient[];
}

export type TIngredientsActions =
  | IGetDataAction
  | IGetDataFailedAction
  | IGetDataSuccessAction;

export const getDataAction = (): IGetDataAction => ({
  type: GET_DATA_REQUEST,
});

export const getDataFailedAction = (): IGetDataFailedAction => ({
  type: GET_DATA_FAILED,
});

export const getDataSuccessAction = (
  data: IIngredient[]
): IGetDataSuccessAction => ({
  type: GET_DATA_SUCCESS,
  data,
});

export const getData = () => {
  return (dispatch: AppDispatch) => {
    dispatch(getDataAction());

    getIngredientsData()
      .then((res) => {
        dispatch(getDataSuccessAction(res.data));
      })
      .catch(() => {
        dispatch(getDataFailedAction());
      });
  };
};
