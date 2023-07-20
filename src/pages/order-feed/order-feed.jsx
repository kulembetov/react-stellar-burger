import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Feed from "../../components/Feed/Feed";
import Loader from "../../components/Loader/Loader";
import Orders from "../../components/Orders/Orders";
import {
  connect as connectOrders,
  disconnect as disconnectOrders,
} from "../../services/actions/actions";
import styles from "./order-feed.module.css";

// определяет текст
const text = {
  feed: "Лента заказов",
};

// определяет URL для получения всех заказов
const GET_ORDERS_URL = "wss://norma.nomoreparties.space/orders/all";

// функциональный компонент, отображающий ленту заказов
const OrderFeed = () => {
  // определение методов
  const dispatch = useDispatch();

  // получение данных о заказах и ошибке подключения из Redux хранилища
  const { array, connectionError, loader } = useSelector(
    (state) => state.rootReducer.orders
  );

  // подключение к WebSocket и отключение
  useEffect(() => {
    dispatch(connectOrders(GET_ORDERS_URL));
    return () => dispatch(disconnectOrders());
  }, [dispatch]);

  if (connectionError || loader) {
    return <Loader />;
  } else {
    return (
      <div className={`${styles.box}`}>
        <h2 className={`${styles.title} text text_type_main-large pb-5`}>
          {text.feed}
        </h2>
        <div className={`${styles.components}`}>
          <Feed orders={array.orders} />
          <Orders />
        </div>
      </div>
    );
  }
};

export default React.memo(OrderFeed);
