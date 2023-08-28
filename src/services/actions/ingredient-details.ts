import { IIngredient } from "../types/data";

export const TAB_INGREDIENT_SET: "TAB_INGREDIENT_SET" = "TAB_INGREDIENT_SET";
export const TAB_INGREDIENT_DELETE: "TAB_INGREDIENT_DELETE" =
  "TAB_INGREDIENT_DELETE";
export const MODAL_INGREDIENT_DETAILS_OPEN: "MODAL_INGREDIENT_DETAILS_OPEN" =
  "MODAL_INGREDIENT_DETAILS_OPEN";
export const MODAL_INGREDIENT_DETAILS_CLOSE: "MODAL_INGREDIENT_DETAILS_CLOSE" =
  "MODAL_INGREDIENT_DETAILS_CLOSE";

export interface ITabIngredientSetAction {
  readonly type: typeof TAB_INGREDIENT_SET;
  readonly tabIngredient: IIngredient;
}

export interface ITabIngredientDeleteAction {
  readonly type: typeof TAB_INGREDIENT_DELETE;
}

export interface IModalIngredientDetailsOpenAction {
  readonly type: typeof MODAL_INGREDIENT_DETAILS_OPEN;
}

export interface IModalIngredientDetailsCloseAction {
  readonly type: typeof MODAL_INGREDIENT_DETAILS_CLOSE;
}

export type TIngredientDetailsActions =
  | ITabIngredientSetAction
  | ITabIngredientDeleteAction
  | IModalIngredientDetailsOpenAction
  | IModalIngredientDetailsCloseAction;

export const setTabIngredient = (item: IIngredient): ITabIngredientSetAction => {
  return {
    type: TAB_INGREDIENT_SET,
    tabIngredient: item,
  };
};

export const deleteTabIngredient = (): ITabIngredientDeleteAction => {
  return {
    type: TAB_INGREDIENT_DELETE,
  };
};

export const openModalIngredientDetails =
  (): IModalIngredientDetailsOpenAction => {
    return {
      type: MODAL_INGREDIENT_DETAILS_OPEN,
    };
  };

export const closeModalIngredientDetails =
  (): IModalIngredientDetailsCloseAction => {
    return {
      type: MODAL_INGREDIENT_DETAILS_CLOSE,
    };
  };
