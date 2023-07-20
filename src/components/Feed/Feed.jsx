import React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { openOrderDetailsModal } from "../../services/actions/actions";
import FeedItem from "../FeedItem/FeedItem";
import styles from "./Feed.module.css";

const Feed = ({ orders }) => {
  // определение методов
  const dispatch = useDispatch();
  const location = useLocation();

  // обработка открытия модального окна заказа
  const handleClickOrder = (item) => {
    dispatch(openOrderDetailsModal());
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
