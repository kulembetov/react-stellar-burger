import { createReducer } from "@reduxjs/toolkit";
import { WebsocketStatus } from "../../utils/orders";
import {
  wsClose,
  wsConnecting,
  wsError,
  wsMessage,
  wsOpen,
} from "../actions/ws";
import { IOrder } from "../types/data";

export type TOrdersState = {
  status: string;
  orders: IOrder[];
  connectionError: string;
  loader: boolean;
  total: number | null;
  totalToday: number | null;
};

const initialState: TOrdersState = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  connectionError: "",
  loader: false,
  total: null,
  totalToday: null,
};

export const ordersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, (state) => {
      state.status = WebsocketStatus.CONNECTING;
      state.loader = true;
    })
    .addCase(wsOpen, (state) => {
      state.status = WebsocketStatus.ONLINE;
      state.connectionError = "";
      state.loader = true;
    })
    .addCase(wsMessage, (state, { payload }: any) => {
      state.orders = payload.orders ?? [];
      state.total = payload.total ?? null;
      state.totalToday = payload.totalToday ?? null;
      state.loader = false;
    })
    .addCase(wsClose, (state) => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsError, (state, action) => {
      state.connectionError = action.payload ?? "";
    });
});
