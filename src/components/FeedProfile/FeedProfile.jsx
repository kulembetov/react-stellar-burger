import React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { openOrderDetailsModal } from "../../services/actions/actions";
import FeedItem from "../FeedItem/FeedItem.module.css";
import styles from "./FeedProfile.module.css";

// функциональный компонент, отображающий заказ
const FeedProfile = ({ orders }) => {
  // определение методов
  const dispatch = useDispatch();
  const location = useLocation();

  // обработчик открытия модального окна заказа
  const handleClickOrder = (item) => {
    dispatch(openOrderDetailsModal());
  };

  // возвращает разметку, содержащую заказ
  return (
    <div className={`${styles.box}`}>
      <ul className={`${styles.list}`}>
        {orders
          ? orders.map((order) => (
              <Link
                key={order.number}
                className={`${styles.item} pb-5`}
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
