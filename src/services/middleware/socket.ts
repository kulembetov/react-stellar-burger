import { Middleware, MiddlewareAPI } from "redux";
import { getUserFetch } from "../actions/user";
import { AppDispatch, RootState } from "../types";
import { TWsActionTypes } from "../types/data";

// WebSocket Middleware

export const socketMiddleware = (wsActions: TWsActionTypes): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;

      const {
        wsConnect,
        wsConnecting,
        wsSendMessage,
        onOpen,
        onClose,
        onError,
        onMessage,
      } = wsActions;

      if (wsConnect.match(action)) {
        socket = new WebSocket(action.payload);
        dispatch(wsConnecting());
      }
      if (socket) {
        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onerror = () => {
          dispatch(onError("Произошла ошибка с WebSocket"));
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          if (parsedData.message === "Invalid or missing token") {
            dispatch(getUserFetch());
          } else {
            dispatch(onMessage(parsedData));
          }
        };

        socket.onclose = () => {
          dispatch(onClose());
        };

        if (wsSendMessage?.match(action)) {
          socket.send(JSON.stringify(action.payload));
        }
      }

      next(action);
    };
  };
};
