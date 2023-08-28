import React, { useEffect } from "react";
import FeedProfile from "../../components/FeedProfile/FeedProfile";
import Loader from "../../components/Loader/Loader";
import {
  connectInProfile,
  disconnectInProfile,
} from "../../services/actions/ws";
import { useAppDispatch, useAppSelector } from '../../services/types';
import styles from "./profile-orders.module.css";

// определяет URL для получения заказов пользователя
const GET_PROFILE_ORDERS_URL = "wss://norma.nomoreparties.space/orders";

// функциональный компонент, отображающий заказы пользователя
const ProfileOrders = () => {
  // определение метода
  const dispatch = useAppDispatch();

  // получение токена пользователя из localStorage
  const accessTokenWithBearer = localStorage.getItem("accessToken");
  const accessTokenWithoutBearer = accessTokenWithBearer?.slice(7);

  // получение данных о заказах пользователя из Redux хранилища
  const orders = useAppSelector(
    (state) => state.rootReducer.profileOrders.orders
  );

  // получение данных об ошибке подключения из Redux хранилища
  const { connectionError, loader } = useAppSelector(
    (state) => state.rootReducer.profileOrders
  );

  // подключение к WebSocket и отключение
  useEffect(() => {
    dispatch(
      connectInProfile(
        `${GET_PROFILE_ORDERS_URL}?token=${accessTokenWithoutBearer}`
      )
    );
    return () => {
      const disconnectInProfileWs = () => {
        dispatch(
          disconnectInProfile(
            `${GET_PROFILE_ORDERS_URL}?token=${accessTokenWithoutBearer}`
          )
        );
      };
      disconnectInProfileWs();
    };
  }, [dispatch, accessTokenWithoutBearer]);

  // возвращает разметку, которая содержит заказы пользователя
  if (orders === undefined || connectionError || loader) {
    return <Loader />;
  } else if (orders.length === 0) {
    return (
      <div className={styles.empty}>
        <p className="text text_type_main-default text_color_inactive">
          Кажется, Вы ещё ничего не заказывали
        </p>
      </div>
    );
  } else {
    const sortedOrders = orders
      ?.slice()
      .sort((orderCurrent, orderNext) =>
        orderNext.updatedAt.localeCompare(orderCurrent.updatedAt)
      );
    return (
      <>
        <div className={`${styles.box}`}>
          <FeedProfile orders={sortedOrders} />
        </div>
      </>
    );
  }
};

export default React.memo(ProfileOrders);
