import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC } from "react";
import styles from "./TotalPrice.module.css";

interface ITotalPriceProps {
  totalPrice: number;
}

// функциональный компонент, отображающий итоговую стоимость бургера
const TotalPrice: FC<ITotalPriceProps> = ({ totalPrice }) => {
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

export default React.memo(TotalPrice);
