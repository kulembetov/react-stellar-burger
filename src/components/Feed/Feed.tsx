import React, { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { openModalOrder } from "../../services/actions/order-modal";
import { useAppDispatch } from '../../services/types';
import { IOrder } from '../../services/types/data';
import FeedItem from "../FeedItem/FeedItem";
import styles from "./Feed.module.css";

// пропсы компонента
interface IFeedProps {
  orders: IOrder[];
}

// функциональный компонент, отображающий ленту заказов
const Feed: FC<IFeedProps> = ({ orders }) => {
  // определение методов
  const dispatch = useAppDispatch();
  const location = useLocation();

  // обработка открытия модального окна заказа
  const handleClickOrder = () => {
    dispatch(openModalOrder());
  };

  // возвращает разметку, которая содержит ленту заказов
  return (
    <div className={`${styles.box}`}>
      <ul className={`${styles.list}`}>
        {orders
          ? orders.map((order) => (
            <Link
              className={`${styles.item}`}
              key={order.number}
              to={`/feed/${order.number}`}
              state={{ background: location }}
            >
              <FeedItem order={order} onClick={handleClickOrder} />
            </Link>
          ))
          : null}
      </ul>
    </div>
  );
};

export default React.memo(Feed);
