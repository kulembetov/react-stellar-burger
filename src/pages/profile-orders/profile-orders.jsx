import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FeedProfile from "../../components/FeedProfile/FeedProfile";
import Loader from "../../components/Loader/Loader";
import {
  connectInProfile,
  disconnectInProfile,
} from "../../services/actions/actions";
import styles from "./profile-orders.module.css";

// определяет URL для получения заказов пользователя
const GET_PROFILE_ORDERS_URL = "wss://norma.nomoreparties.space/orders";

// функциональный компонент, отображающий заказы пользователя
const ProfileOrders = () => {
  // определение метода
  const dispatch = useDispatch();

  // получение токена пользователя из localStorage
  const accessTokenWithBearer = localStorage.getItem("accessToken");
  const accessTokenWithoutBearer = accessTokenWithBearer.slice(7);

  // получение данных о заказах пользователя из Redux хранилища
  const orders = useSelector(
    (state) => state.rootReducer.profileOrders.array.orders
  );

  // получение данных об ошибке подключения из Redux хранилища
  const { connectionError, loader } = useSelector(
    (state) => state.rootReducer.profileOrders
  );

  // подключение к WebSocket и отключение
  useEffect(() => {
    dispatch(
      connectInProfile(
        `${GET_PROFILE_ORDERS_URL}?token=${accessTokenWithoutBearer}`
      )
    );
    return () =>
      dispatch(
        disconnectInProfile(
          `${GET_PROFILE_ORDERS_URL}?token=${accessTokenWithoutBearer}`
        )
      );
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
      .sort((currentOrder, nextOrder) =>
        nextOrder.updatedAt.localeCompare(currentOrder.updatedAt)
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
