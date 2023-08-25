import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { WebsocketStatus } from "../../utils/orders";
import {
  wsClose,
  wsConnecting,
  wsError,
  wsMessage,
  wsOpen,
} from "../actions/ws";
import { IOrder, IOrders } from "../types/data";

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
    .addCase(wsMessage, (state, action: PayloadAction<IOrders>) => {
      state.orders = action.payload.orders;
      state.loader = false;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    })
    .addCase(wsClose, (state) => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsError, (state, action: PayloadAction<string>) => {
      state.connectionError = action.payload;
    });
});
