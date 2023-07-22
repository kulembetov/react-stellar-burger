// WebSocket Middleware
export const socketMiddleware = (wsActions) => {
  return (store) => {
    // создание переменной для хранения экземпляра WebSocket
    let socket = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;
      const {
        wsConnect,
        wsSendMessage,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsConnecting,
        wsDisconnect,
      } = wsActions;

      // если экшен - запрос на соединение с WebSocket
      if (type === wsConnect.type) {
        // создание нового экземпляра WebSocket с указанным адресом
        socket = new WebSocket(action.payload);
        // диспатч экшена, чтобы обозначить, что происходит соединение
        dispatch(wsConnecting());
      }

      // если сокет уже создан, настройка обработчиков событий
      if (socket) {
        // обработчик события открытия соединения
        socket.onopen = () => {
          dispatch(onOpen());
        };

        // обработчик события ошибки
        socket.onerror = (event) => {
          dispatch(onError("Произошла ошибка с WebSocket"));
        };

        // обработчик события получения сообщения от WebSocket
        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          // диспатч экшена с полученными данными
          dispatch(onMessage(parsedData));
        };

        // обработчик события закрытия соединения
        socket.onclose = (event) => {
          dispatch(onClose());
          // сброс переменной для возможности повторного соединения
          socket = null;
        };

        // если экшен - отправка сообщения через WebSocket
        if (wsSendMessage && type === wsSendMessage.type) {
          // отправка сообщения в JSON-формате
          socket.send(JSON.stringify(action.payload));
        }

        // если экшен - запрос на закрытие соединения с WebSocket
        if (wsDisconnect.type === type) {
          // закрытие соединение
          socket.close();
          // сброс переменной для возможности повторного соединения
          socket = null;
        }
      }

      // передача управления дальше по цепочке middleware и reducers
      next(action);
    };
  };
};
