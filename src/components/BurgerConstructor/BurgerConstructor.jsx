import {
  Button,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useCallback, useMemo } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  addIngredientsConstructor,
  addIngredientsConstructorBun,
  clearIngredientsConstructor,
  clearIngredientsConstructorBun,
  closeOrderDetailsModal,
  openOrderDetailsModal,
  postOrder,
  moveIngredient,
} from "../../services/actions/actions";
import BurgerIngredient from "../BurgerIngredient/BurgerIngredient";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import TotalPrice from "../TotalPrice/TotalPrice";
import styles from "./BurgerConstructor.module.css";

// определяет кнопки
const button = {
  placeOrder: "Оформить заказ",
};

// функциональный компонент, отображающий состав и общую стоимость бургера
const BurgerConstructor = () => {
  // получение состояния булки и ингредиентов из хранилища Redux
  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);

  // определяет состояние отображения модального окна с информацией об ингредиенте
  const { isOpenOrder } = useSelector((state) => state.orderDetails);

  // получение метода
  const dispatch = useDispatch();

  // обработка добавления ингредиента
  const onDropHandler = useCallback(
    (item) => {
      const { type } = item;
      if (type === "bun") {
        dispatch(addIngredientsConstructorBun(item));
      } else {
        dispatch(addIngredientsConstructor(item, uuidv4()));
      }
    },
    [dispatch]
  );

  // определение области дропа
  const [{ isActive }, drop] = useDrop({
    accept: "ingredient",
    drop: onDropHandler,
    collect: (monitor) => ({
      isActive: monitor.canDrop() && monitor.isOver(),
    }),
  });

  // перемещение ингредиентов
  const moveIngredientItem = useCallback(
    (dragIndex, hoverIndex) => {
      dispatch(moveIngredient(dragIndex, hoverIndex));
    },
    [dispatch]
  );
  // поиск соусов и начинки в списке ингредиентов
  const saucesAndMains = useMemo(
    () => ingredients.filter((m) => m.type !== "bun"),
    [ingredients]
  );

  // вычисляет общую стоимость бургера
  const totalPrice = useMemo(() => {
    const priceIngredients = saucesAndMains.reduce(
      (acc, item) => acc + item.price,
      0
    );
    const bunPrice = bun ? 2 * bun.price : 0;
    return priceIngredients + bunPrice;
  }, [saucesAndMains, bun]);

  // получение списка идентификаторов ингредиентов для заказа
  const orderIngredients = useMemo(
    () => ingredients.map(({ _id }) => _id),
    [ingredients]
  );

  // обработчик открытия модального окна
  const handleOpenModal = useCallback(() => {
    dispatch(openOrderDetailsModal());
    const allIngredients = [...orderIngredients, bun._id];
    dispatch(postOrder(allIngredients));
  }, [dispatch, orderIngredients, bun]);

  // обработчик закрытия модального окна
  const handleCloseModal = useCallback(() => {
    dispatch(closeOrderDetailsModal());
    dispatch(clearIngredientsConstructor());
    dispatch(clearIngredientsConstructorBun());
  }, [dispatch]);

  // возвращает разметку, содержащую два блока -  список ингредиентов с булками вверху и внизу, а также блок с общей стоимостью и кнопкой оформления заказа
  return (
    <div>
      <div className={`${styles.ingredient} pl-4 pb-5`} ref={drop}>
        {bun && (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
            ingredient={bun}
          />
        )}
        <ul className={`${styles.list} pt-5`}>
          {ingredients.map((item) => (
            <li key={uuidv4()} className={`${styles.item} pb-4`}>
              <DragIcon type="primary" />
              <BurgerIngredient
                ingredient={item}
                moveIngredientItem={moveIngredientItem}
              />
            </li>
          ))}
          {!bun && (
            <p className={`text text_type_main-medium ${styles.tip}`}>
              Пожалуйста, перенесите сюда булку для создания заказа
            </p>
          )}
        </ul>
        {bun && (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image_mobile}
            ingredient={bun}
          />
        )}
      </div>
      <div className={`${styles.order} pt-5 pr-4`}>
        <TotalPrice totalPrice={totalPrice} />
        <div className="pl-5">
          <Button
            aria-label="Оформление заказа"
            htmlType="button"
            type="primary"
            size="large"
            disabled={!bun}
            onClick={handleOpenModal}
          >
            {button.placeOrder}
          </Button>
        </div>
      </div>
      {isOpenOrder && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};

export default React.memo(BurgerConstructor);
