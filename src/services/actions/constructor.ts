import { v4 as uuidv4 } from "uuid";
import { IIngredient } from "../types/data";

export const ADD_INGREDIENTS_CONSTRUCTOR = "ADD_INGREDIENTS_CONSTRUCTOR";
export const ADD_INGREDIENTS_CONSTRUCTOR_BUN =
  "ADD_INGREDIENTS_CONSTRUCTOR_BUN";
export const DELETE_INGREDIENTS_CONSTRUCTOR = "DELETE_INGREDIENTS_CONSTRUCTOR";
export const CLEAR_INGREDIENTS_CONSTRUCTOR = "CLEAR_INGREDIENTS_CONSTRUCTOR";
export const CLEAR_INGREDIENTS_CONSTRUCTOR_BUN =
  "CLEAR_INGREDIENTS_CONSTRUCTOR_BUN";
export const MOVE_INGREDIENT = "MOVE_INGREDIENT";

export interface IAddIngredientsAction {
  readonly type: typeof ADD_INGREDIENTS_CONSTRUCTOR;
  readonly ingredients: IIngredient;
  readonly keyUuid: string;
}

export interface IAddIngredientsBunAction {
  readonly type: typeof ADD_INGREDIENTS_CONSTRUCTOR_BUN;
  readonly bun: IIngredient;
}

export interface IClearIngredientsAction {
  readonly type: typeof CLEAR_INGREDIENTS_CONSTRUCTOR;
}

export interface IClearIngredientsBunAction {
  readonly type: typeof CLEAR_INGREDIENTS_CONSTRUCTOR_BUN;
}

export interface IMoveIngredientAction {
  readonly type: typeof MOVE_INGREDIENT;
  readonly dragIndex: number;
  readonly hoverIndex: number;
}

export interface IDeleteIngredientAction {
  readonly type: typeof DELETE_INGREDIENTS_CONSTRUCTOR;
  readonly keyUuid: IIngredient["keyUuid"];
}

export type TConstructorActions =
  | IAddIngredientsAction
  | IAddIngredientsBunAction
  | IClearIngredientsAction
  | IClearIngredientsBunAction
  | IMoveIngredientAction
  | IDeleteIngredientAction;

export const addIngredients = (item: IIngredient): IAddIngredientsAction => {
  return {
    type: ADD_INGREDIENTS_CONSTRUCTOR,
    ingredients: item,
    keyUuid: uuidv4(),
  };
};

export const addIngredientsBun = (
  item: IIngredient
): IAddIngredientsBunAction => {
  return {
    type: ADD_INGREDIENTS_CONSTRUCTOR_BUN,
    bun: item,
  };
};

export const onDelete = (
  keyUuid: IIngredient["keyUuid"]
): IDeleteIngredientAction => {
  return {
    type: DELETE_INGREDIENTS_CONSTRUCTOR,
    keyUuid: keyUuid,
  };
};

export const clearIngredientsConstructor = (): IClearIngredientsAction => {
  return {
    type: CLEAR_INGREDIENTS_CONSTRUCTOR,
  };
};

export const clearIngredientsConstructorBun = (): IClearIngredientsBunAction => {
  return {
    type: CLEAR_INGREDIENTS_CONSTRUCTOR_BUN,
  };
};

export const moveIngredient = (
  dragIndex: number,
  hoverIndex: number
): IMoveIngredientAction => {
  return {
    type: MOVE_INGREDIENT,
    dragIndex: dragIndex,
    hoverIndex: hoverIndex,
  };
};
