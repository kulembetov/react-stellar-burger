import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./OrderDetails.module.css";

// функциональный компонент, отображающий информацию о заказе
const OrderDetails = () => {
  // возвращает разметку, которая содержит информацию о заказе, такую как идентификатор, статус готовности заказа и текстовую информацию

  // определяет текст
  const text = {
    number: "034536",
    orderId: "идентификатор заказа",
    starting: "Ваш заказ начали готовить",
    waiting: "Дождитель готовности на орбитальной станции",
  };

  return (
    <div>
      <ul className={`${styles.list} m-4 pb-15`}>
        <li className={`${styles.item} pb-15`}>
          <p className={`${styles.number} text text_type_digits-large pb-4`}>
            {text.number}
          </p>
          <p className="text text_type_main-medium pt-4">{text.orderId}</p>
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
};

export default OrderDetails;
