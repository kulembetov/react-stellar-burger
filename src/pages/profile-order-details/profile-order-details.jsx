import React from "react";
import OrderInfo from "../../components/OrderInfo/OrderInfo";

// функциональный компонент, информацию о заказе
const ProfileOrderDetails = () => {
  // возвращает разметку, которая содержит информацию о заказе
  return (
    <div className="mt-15">
      <OrderInfo />
    </div>
  );
};

export default React.memo(ProfileOrderDetails);
