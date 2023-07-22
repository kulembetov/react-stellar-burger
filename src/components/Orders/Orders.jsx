import React from "react";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import styles from "./Orders.module.css";

// определяет текст
const text = {
  done: "Готовы:",
  process: "В работе:",
  total: "Выполнено за все время:",
  today: "Выполнено за сегодня:",
};

// функциональный компонент, отображающий список заказов
const Orders = () => {
  // получение состояния лоадера из Redux хранилища
  const { connectionError, loader } = useSelector(
    (state) => state.rootReducer.orders
  );

  // получение списка всех заказов из Redux хранилища
  const orders = useSelector((state) => state.rootReducer.orders.array.orders);

  // получение общего числа выполненных заказов за всё время
  const total = useSelector((state) => state.rootReducer.orders.array.total);

  // получение числа выполненных заказов за сегодня
  const totalToday = useSelector(
    (state) => state.rootReducer.orders.array.totalToday
  );

  // разделяет заказы по статусу
  const findOrdersByStatus = (array) => {
    return array?.reduce(
      (acc, current) => {
        current.status === "done"
          ? (acc["done"] = [...acc["done"], current])
          : (acc["pending"] = [...(acc["pending"] || []), current]);
        return acc;
      },
      { done: [], pending: [] }
    );
  };

  // разделение заказов по статусу
  const statusArray = findOrdersByStatus(orders);
  const doneArray = statusArray?.done.slice(0, 50);

  // возвращает разметку, которая содержит список заказов
  if (connectionError || loader) {
    return <Loader />;
  } else {
    return (
      <div className={`${styles.box}`}>
        <div className={`${styles.wrapper}`}>
          <div className={`${styles.list}`}>
            <h3 className={`${styles.title} text text_type_main-medium`}>
              {text.done}
            </h3>
            <ul className={`${styles.numbers}`}>
              {doneArray
                ? doneArray.map(
                    (order, index) =>
                      order.status === "done" && (
                        <li
                          className={`${styles.success} text text_type_digits-default`}
                          key={index}
                        >
                          {order.number}
                        </li>
                      )
                  )
                : null}
            </ul>
          </div>
          <div className={`${styles.list}`}>
            <h3 className={`${styles.title} text text_type_main-medium`}>
              {text.process}
            </h3>
            <ul className={`${styles.numbers}`}>
              {statusArray
                ? statusArray.pending.map(
                    (order, index) =>
                      order.status === "pending" && (
                        <li
                          className={`${styles.pending} text text_type_digits-default`}
                          key={index}
                        >
                          {order.number}
                        </li>
                      )
                  )
                : null}
            </ul>
          </div>
        </div>
        <div className={`${styles.full}`}>
          <h3 className="text text_type_main-medium">{text.total}</h3>
          <p className={`${styles.large} text text_type_digits-large`}>
            {total}
          </p>
        </div>
        <div className={`${styles.today}`}>
          <h3 className="text text_type_main-medium">{text.today}</h3>
          <p className={`${styles.large} text text_type_digits-large`}>
            {totalToday}
          </p>
        </div>
      </div>
    );
  }
};

export default React.memo(Orders);
