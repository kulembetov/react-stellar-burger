import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { WebsocketStatus } from "../../utils/orders";
import {
  wsCloseInProfile,
  wsConnectingInProfile,
  wsErrorInProfile,
  wsMessageInProfile,
  wsOpenInProfile,
} from "../actions/ws";
import { IOrder, IOrders } from "../types/data";

export type TProfileOrdersState = {
  status: string;
  orders: readonly IOrder[];
  connectionError: string;
  loader: boolean;
};

const initialState: TProfileOrdersState = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  connectionError: "",
  loader: false,
};

export const profileOrdersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnectingInProfile, (state) => {
      state.status = WebsocketStatus.CONNECTING;
      state.loader = true;
    })
    .addCase(wsOpenInProfile, (state) => {
      state.status = WebsocketStatus.ONLINE;
      state.connectionError = "";
      state.loader = true;
    })
    .addCase(wsMessageInProfile, (state, action: PayloadAction<IOrders>) => {
      state.orders = action.payload.orders;
      state.loader = false;
    })
    .addCase(wsCloseInProfile, (state) => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsErrorInProfile, (state, action: PayloadAction<string>) => {
      state.connectionError = action.payload ?? "";
    });
});
