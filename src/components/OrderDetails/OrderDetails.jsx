import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { useSelector } from "react-redux";
import { orderDetailsPropType } from "../../utils/prop-types";
import Loader from "../Loader/Loader";
import styles from "./OrderDetails.module.css";

// определяет текст
const text = {
  orderText: "идентификатор заказа",
  starting: "Ваш заказ начали готовить",
  waiting: "Дождитель готовности на орбитальной станции",
};

// функциональный компонент, отображающий информацию о заказе
const OrderDetails = () => {
  // получение состояния о заказе из Redux хранилища
  const { orderRequest, orderFailed, orderCurrent } = useSelector(
    (state) => state.orderDetails
  );

  // возвращает разметку, которая содержит информацию о заказе, такую как идентификатор, статус готовности заказа и текстовую информацию
  if (orderFailed || orderRequest) {
    return <Loader />;
  } else {
    return (
      <div>
        <ul className={`${styles.list} m-4 pb-15`}>
          <li className={`${styles.item} pb-15`}>
            <p className={`${styles.number} text text_type_digits-large pb-4`}>
              {orderCurrent.order.number}
            </p>
            <p className="text text_type_main-medium pt-4">{text.orderText}</p>
          </li>
          <li className={`${styles.item} pb-15 pt-15`}>
            <div className={styles.check}>
              <div className={styles.icon}>
                <CheckMarkIcon type="primary" />
              </div>
            </div>
          </li>
          <li className={`${styles.item} pb-15 pt-15`}>
            <p className="text text_type_main-default">{text.starting}</p>
            <p className={`${styles.text} text text_type_main-default`}>
              {text.waiting}
            </p>
          </li>
        </ul>
      </div>
    );
  }
};

// проверяет типы пропсов, которые ожидает компонент
OrderDetails.propTypes = {
  order: orderDetailsPropType,
};

export default React.memo(OrderDetails);
