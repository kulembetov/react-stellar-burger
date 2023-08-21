import { createAction } from "@reduxjs/toolkit";

// cоздание экшенов
export const connect = createAction<string>("GET_ALL_ORDERS_CONNECT");
export const disconnect = createAction("GET_ALL_ORDERS_DISCONNECT");
export const wsConnecting = createAction("GET_ALL_ORDERS_WS_CONNECTING");
export const wsOpen = createAction("GET_ALL_ORDERS_WS_OPEN");
export const wsClose = createAction("GET_ALL_ORDERS_WS_CLOSE");
export const wsMessage = createAction("GET_ALL_ORDERS_WS_MESSAGE");
export const wsError = createAction("GET_ALL_ORDERS_WS_ERROR");

export const connectInProfile = createAction<string>(
  "GET_ALL_ORDERS_IN_PROFILE_CONNECT"
);
export const disconnectInProfile = createAction<string>(
  "GET_ALL_ORDERS_IN_PROFILE_DISCONNECT"
);
export const wsConnectingInProfile = createAction(
  "GET_ALL_ORDERS_IN_PROFILE_WS_CONNECTING"
);
export const wsOpenInProfile = createAction(
  "GET_ALL_ORDERS_IN_PROFILE_WS_OPEN"
);
export const wsCloseInProfile = createAction(
  "GET_ALL_ORDERS_IN_PROFILE_WS_CLOSE"
);
export const wsMessageInProfile = createAction(
  "GET_ALL_ORDERS_IN_PROFILE_WS_MESSAGE"
);
export const wsErrorInProfile = createAction(
  "GET_ALL_ORDERS_IN_PROFILE_WS_ERROR"
);
