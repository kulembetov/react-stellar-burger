import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { totalPricePropType } from "../../utils/prop-types";
import styles from "./TotalPrice.module.css";

const TotalPrice = ({ totalPrice }) => {
  return (
    <div className={`${styles.price} 'pr-5'`}>
      <p className="text text_type_digits-medium">{totalPrice}</p>
      <div>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};

totalPricePropType.propTypes = {
  price: totalPricePropType,
};

export default React.memo(TotalPrice);
