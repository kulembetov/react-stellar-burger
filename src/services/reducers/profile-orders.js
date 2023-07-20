import { createReducer } from "@reduxjs/toolkit";
import { WebsocketStatus } from "../../utils/orders";
import {
  wsCloseInProfile,
  wsConnectingInProfile,
  wsErrorInProfile,
  wsMessageInProfile,
  wsOpenInProfile,
} from "../actions/actions";

const initialState = {
  status: WebsocketStatus.OFFLINE,
  array: [],
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
    .addCase(wsMessageInProfile, (state, action) => {
      state.array = action.payload;
      state.loader = false;
    })
    .addCase(wsCloseInProfile, (state) => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsErrorInProfile, (state, action) => {
      state.connectionError = action.payload;
    });
});
