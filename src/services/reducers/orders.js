import { createReducer } from "@reduxjs/toolkit";
import { WebsocketStatus } from "../../utils/orders";
import {
  wsClose,
  wsConnecting,
  wsError,
  wsMessage,
  wsOpen,
} from "../actions/actions";

const initialState = {
  status: WebsocketStatus.OFFLINE,
  array: [],
  connectionError: "",
  loader: false,
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
    .addCase(wsMessage, (state, action) => {
      state.array = action.payload;
      state.loader = false;
    })
    .addCase(wsClose, (state) => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsError, (state, action) => {
      state.connectionError = action.payload;
    });
});
