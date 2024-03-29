import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { openModalOrder } from "../../services/actions/order-modal";
import { IOrder } from '../../services/types/data';
import FeedItem from "../FeedItem/FeedItem";
import styles from "./FeedProfile.module.css";

// пропсы компонента
interface IFeedProfileProps {
  orders: IOrder[];
}

// функциональный компонент, отображающий заказ
const FeedProfile: FC<IFeedProfileProps> = ({ orders }) => {
  // определение методовА
  const dispatch = useDispatch();
  const location = useLocation();

  // обработчик открытия модального окна заказа
  const handleClickOrder = () => {
    dispatch(openModalOrder());
  };

  // возвращает разметку, содержащую заказ
  return (
    <div className={`${styles.box}`}>
      <ul className={`${styles.list}`}>
        {orders
          ? orders.map((order) => (
            <Link
              className={`${styles.item} pb-5`}
              key={order.number}
              to={`/profile/orders/${order.number}`}
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

export default React.memo(FeedProfile);
