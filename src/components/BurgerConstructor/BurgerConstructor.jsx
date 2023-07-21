import {
  Button,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useCallback, useMemo } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addIngredientsConstructor,
  addIngredientsConstructorBun,
  clearIngredientsConstructor,
  clearIngredientsConstructorBun,
  closeOrderDetailsModal,
  moveIngredient,
  openOrderDetailsModal,
  postOrderFetch,
} from "../../services/actions/actions";
import BurgerIngredient from "../BurgerIngredient/BurgerIngredient";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import TotalPrice from "../TotalPrice/TotalPrice";
import styles from "./BurgerConstructor.module.css";

// определяет кнопки
const button = {
  order: "Оформить заказ",
  process: "В очереди",
};

// функциональный компонент, отображающий состав и общую стоимость бургера
const BurgerConstructor = () => {
  // получение состояния булки и ингредиентов из хранилища Redux
  const { bun, ingredients } = useSelector(
    (state) => state.rootReducer.burgerConstructor
  );

  // определяет состояние отображения модального окна с информацией об ингредиенте
  const { orderRequest, isOpenOrder } = useSelector(
    (state) => state.rootReducer.orderDetails
  );

  const { user } = useSelector((state) => state.rootReducer.user);

  // получение методов
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const buttonText = orderRequest ? button.process : button.order;

  // обработка добавления ингредиента
  const onDropHandler = useCallback(
    (item, keyUuid) => {
      if (item.type === "bun") {
        dispatch(addIngredientsConstructorBun(item));
      } else {
        dispatch(addIngredientsConstructor(item, keyUuid));
      }
    },
    [dispatch]
  );

  // определение области дропа
  const [{ isActive }, drop] = useDrop({
    accept: "ingredient",
    drop: (item, monitor) => {
      if (monitor.didDrop()) {
        return;
      }
      onDropHandler(item, monitor.getItem().keyUuid);
    },
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
  const handleOpenModal = () => {
    if (!user) {
      navigate("/login", { replace: true });
    } else {
      dispatch(openOrderDetailsModal());
      const allIngredients = [...orderIngredients, bun._id];
      dispatch(postOrderFetch(allIngredients));
    }
  };

  // обработчик закрытия модального окна
  const handleCloseModal = useCallback(() => {
    if (isOpenOrder) {
      dispatch(clearIngredientsConstructor());
      dispatch(clearIngredientsConstructorBun());
      dispatch(closeOrderDetailsModal());
    }
  }, [dispatch, isOpenOrder]);

  // возвращает разметку, содержащую два блока -  список ингредиентов с булками вверху и внизу, а также блок с общей стоимостью и кнопкой оформления заказа
  return (
    <div>
      <div
        className={`${bun === null ? styles.empty : ""} ${
          isActive ? styles.active : ""
        }`}
        ref={drop}
      >
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
            <li key={item.keyUuid} className={`${styles.item} pb-4`}>
              <DragIcon type="primary" />
              <BurgerIngredient
                ingredient={item}
                moveIngredientItem={moveIngredientItem}
              />
            </li>
          ))}
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
            {buttonText}
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
