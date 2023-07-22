import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { totalPricePropType } from "../../utils/prop-types";
import styles from "./TotalPrice.module.css";

// функциональный компонент, отображающий итоговую стоимость бургера
const TotalPrice = ({ totalPrice }) => {
  // возвращает разметку, которая содержит итоговую стоимость бургера
  return (
    <div className={`${styles.price} pr-5`}>
      <p className="text text_type_digits-medium">{totalPrice}</p>
      <div>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};

// проверяет типы пропсов, которые ожидает компонент
totalPricePropType.propTypes = {
  price: totalPricePropType,
};

export default React.memo(TotalPrice);
