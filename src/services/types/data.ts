import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
} from "@reduxjs/toolkit";

type TStatuses = "created" | "pending" | "done";

export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  keyUuid: string;
  index: number;
}

export interface IOrder {
  _id: string;
  ingredients: IIngredient[];
  status: TStatuses;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  owner?: {
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
  price: Number;
}

export interface IOrders {
  success: boolean;
  orders: IOrder[];
  total: number;
  totalToday: number;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export type TOrder = {
  number: number;
  name: string;
  success: boolean;
};

export type TOrderDetails = {
  orders: IOrder[];
  success: boolean;
};

export type TResponseBody<TDataKey extends string = "", TDataType = {}> = {
  [key in TDataKey]: TDataType;
} & {
  success: boolean;
  message?: string;
  headers?: Headers;
  refreshToken: string;
  accessToken: string;
};

export type THeaders = {
  authorization: string | null;
  "Content-Type": string;
};

export type TWsActionTypes = {
  wsConnect: ActionCreatorWithPayload<string>;
  wsSendMessage?: ActionCreatorWithPayload<any>;
  wsConnecting: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<any>;
};

export interface IPatchUserObject {
  name: string;
  email: string;
  password: string;
}

export interface IPostRegisterUserObject {
  name: string;
  email: string;
  password: string;
}

export interface IPostResetObject {
  password: string;
  token: string;
}

export interface IFormValues {
  name: string;
  email: string;
  password: string;
}

export interface IRegisterErrors {
  name: boolean;
  email: boolean;
  password: boolean;
}

export interface ILoginErrors {
  email: boolean;
  password: boolean;
}

export interface IForgotErrors {
  email: boolean;
}

export interface IProfileErrors {
  name: boolean;
  email: boolean;
  password: boolean;
}

export interface IResetErrors {
  password: boolean;
  token: string;
}
