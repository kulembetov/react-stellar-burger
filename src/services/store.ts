import { configureStore } from "@reduxjs/toolkit";
import {
  connect,
  connectInProfile,
  wsClose,
  wsCloseInProfile,
  wsConnecting,
  wsConnectingInProfile,
  wsError,
  wsErrorInProfile,
  wsMessage,
  wsMessageInProfile,
  wsOpen,
  wsOpenInProfile,
} from "./actions/ws";
import { socketMiddleware } from "./middleware/socket";
import { rootReducer } from "./reducers/root";

const ordersMiddlware = socketMiddleware({
  wsConnect: connect,
  wsConnecting: wsConnecting,
  onOpen: wsOpen,
  onMessage: wsMessage,
  onClose: wsClose,
  onError: wsError,
});

const ordersProfileMiddlware = socketMiddleware({
  wsConnect: connectInProfile,
  wsConnecting: wsConnectingInProfile,
  onOpen: wsOpenInProfile,
  onMessage: wsMessageInProfile,
  onClose: wsCloseInProfile,
  onError: wsErrorInProfile,
});

export const initialStore = configureStore({
  reducer: {
    rootReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      ordersMiddlware,
      ordersProfileMiddlware
    );
  },
});
