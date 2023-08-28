import React from "react";
import { useAppSelector } from '../../services/types';
import { IOrder } from '../../services/types/data';
import Loader from "../Loader/Loader";
import styles from "./Orders.module.css";

// определяет тип
type TAcc = {
  [name: string]: IOrder[]
}

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
  const { connectionError, loader } = useAppSelector(
    (state) => state.rootReducer.orders
  );

  // получение списка всех заказов из Redux хранилища
  const { orders, total, totalToday } = useAppSelector((state) => state.rootReducer.orders);

  // разделяет заказы по статусу
  const findOrdersByStatus = (array: IOrder[] | undefined) => {
    if (!Array.isArray(array)) {
      return { done: [], pending: [] };
    }

    return array.reduce(
      (acc: TAcc, current) => {
        if (current.status === "done") {
          acc["done"] = [...acc["done"], current];
        } else if (current.status === "pending") {
          acc["pending"] = [...acc["pending"], current];
        }
        return acc;
      },
      { done: [], pending: [] } as TAcc
    );
  };


  // разделение заказов по статусу
  const statusArray = findOrdersByStatus(orders);

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
              {statusArray?.done.map((order: IOrder, index) => (
                <li
                  className={`${styles.success} text text_type_digits-default`}
                  key={index}
                >
                  {order.number}
                </li>
              ))
              }
            </ul>
          </div>
          <div className={`${styles.list}`}>
            <h3 className={`${styles.title} text text_type_main-medium`}>
              {text.process}
            </h3>
            <ul className={`${styles.numbers}`}>
              {statusArray?.pending.map((order: IOrder, index) => (
                <li className={`${styles.pending} text text_type_digits-default`} key={index}>
                  {order.number}
                </li>
              ))}
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
