import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import { ingredientPropType } from "../../utils/prop-types";
import BurgerIngredient from "../BurgerIngredient/BurgerIngredient.jsx";
import Modal from "../Modal/Modal.jsx";
import OrderDetails from "../OrderDetails/OrderDetails";
import styles from "./BurgerConstructor.module.css";

// функциональный компонент, отображающий состав и общую стоимость бургера
const BurgerConstructor = ({ ingredients }) => {
  // определяет состояние открытия и закрытия модального окна
  const [isOpen, setIsOpen] = useState(false);

  // поиск булки в списке ингредиентов
  const bun = useMemo(
    () => ingredients.filter((m) => m.type === "bun")[0],
    [ingredients]
  );

  const sauce = useMemo(
    () => ingredients.filter((m) => m.type === "sauce")[0],
    [ingredients]
  );

  const filling = useMemo(
    () => ingredients.filter((m) => m.type === "main")[0],
    [ingredients]
  );

  // вычисляет общую стоимость бургера
  const totalPrice = useMemo(
    () =>
      ingredients.reduce(
        (acc, current) =>
          current.type === "bun"
            ? acc + current.price * 2
            : acc + current.price,
        0
      ),
    [ingredients]
  );

  // обработчик открытия модального окна
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  // обработчик закрытия модального окна
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  // определяет кнопки
  const button = {
    placeOrder: "Оформить заказ",
  };

  // возвращает разметку, содержащую два блока -  список ингредиентов с булками вверху и внизу, а также блок с общей стоимостью и кнопкой оформления заказа
  return (
    <div>
      <div className={`${styles.ingredient} pl-4 pb-5`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
          ingredient={bun}
        />
        <ul className={`${styles.list} pt-5`}>
          {ingredients.map(
            (item) =>
              item.type !== "bun" && (
                <li key={item._id} className={`${styles.item} pb-4`}>
                  <DragIcon type="primary" />
                  <BurgerIngredient ingredient={item} />
                </li>
              )
          )}
        </ul>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image_mobile}
          ingredient={bun}
        />
      </div>
      <div className={`${styles.order} pt-5 pr-4`}>
        <div className={styles.price}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
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
      {isOpen && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};

// проверяет типы пропсов, которые ожидает компонент
BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};

export default BurgerConstructor;
