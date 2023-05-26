import {
  Button,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useContext, useMemo, useState } from "react";
import { postOrder } from "../../api/api";
import useModal from "../../hooks/useModal";
import {
  IngredientContext,
  OrderContext,
} from "../../services/ingredientContext";
import { orderDetailsPropType } from "../../utils/prop-types";
import BurgerIngredient from "../BurgerIngredient/BurgerIngredient.jsx";
import Modal from "../Modal/Modal.jsx";
import OrderDetails from "../OrderDetails/OrderDetails";
import TotalPrice from "../TotalPrice/TotalPrice";
import styles from "./BurgerConstructor.module.css";

const BurgerConstructor = () => {
  // получение значения заказа из IngredientContext
  const ingredients = useContext(IngredientContext);

  // определяет состояние открытия и закрытия модального окна
  const { isModalOpen, openModal, closeModal } = useModal();

  // определяет состояние для номера заказа
  const [order, setOrder] = useState("");

  // поиск каждого типа в списке ингредиентов
  const bun = useMemo(
    () => ingredients.filter(({ type }) => type === "bun")[0],
    [ingredients]
  );

  const sauce = useMemo(
    () => ingredients.filter(({ type }) => type === "sauce")[0],
    [ingredients]
  );

  const filling = useMemo(
    () => ingredients.filter(({ type }) => type === "main")[0],
    [ingredients]
  );

  // поиск всех типов ингредиентов, кроме булок
  const nonBunIngredients = useMemo(
    () => ingredients.filter(({ type }) => type !== "bun"),
    [ingredients]
  );

  // вычисляет общую стоимость бургера
  const totalPrice = useMemo(() => {
    const priceIngredients = ingredients.reduce(
      (acc, item) => acc + (item.type !== "bun" ? item.price : 0),
      0
    );
    return (bun?.price || 0) * 2 + priceIngredients;
  }, [bun, ingredients]);

  // поиск id каждого ингредиента
  const orderIngredients = useMemo(
    () => ingredients.map(({ _id }) => _id),
    [ingredients]
  );

  // обработчик открытия модального окна
  const handleOpenModal = () => {
    postOrderIngredients();
    openModal(true);
  };

  // обработчик закрытия модального окна
  const handleCloseModal = () => {
    closeModal(false);
  };

  // отправка запроса на сервер
  const postOrderIngredients = () => {
    postOrder(orderIngredients)
      .then((res) => {
        setOrder(res.order.number.toString());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // определяет кнопки
  const button = {
    placeOrder: "Оформить заказ",
  };

  // возвращает разметку, содержащую два блока -  список ингредиентов с булками вверху и внизу, а также блок с общей стоимостью и кнопкой оформления заказа
  return (
    <div>
      <div className={`${styles.ingredient} pl-4 pb-5`}>
        {bun && (
          <>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
              ingredient={bun}
            />
            <ul className={`${styles.list} pt-5`}>
              {nonBunIngredients.map((item) => (
                <li key={item._id} className={`${styles.item} pb-4`}>
                  <DragIcon type="primary" />
                  <BurgerIngredient ingredient={item} />
                </li>
              ))}
            </ul>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image_mobile}
              ingredient={bun}
            />
          </>
        )}
      </div>
      <div className={`${styles.order} pt-5 pr-4`}>
        <TotalPrice totalPrice={totalPrice} />
        <Button
          aria-label="Оформление заказа"
          htmlType="button"
          type="primary"
          size="large"
          disabled={!bun || !sauce || !filling}
          onClick={handleOpenModal}
        >
          {button.placeOrder}
        </Button>
      </div>
      <OrderContext.Provider value={order}>
        {isModalOpen && (
          <Modal onClose={handleCloseModal}>
            <OrderDetails />
          </Modal>
        )}
      </OrderContext.Provider>
    </div>
  );
};

// проверяет типы пропсов, которые ожидает компонент
BurgerConstructor.propTypes = {
  order: orderDetailsPropType,
};

export default React.memo(BurgerConstructor);
