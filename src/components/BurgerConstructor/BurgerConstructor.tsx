import {
  Button,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useCallback, useMemo } from "react";
import { useDrop } from "react-dnd";
import { useNavigate } from "react-router-dom";
import {
  addIngredients,
  addIngredientsBun,
  clearIngredientsConstructor,
  clearIngredientsConstructorBun,
  moveIngredient
} from "../../services/actions/constructor";
import {
  closeModalOrderDetails,
  openModalOrderDetails,
  postOrderFetch,
} from "../../services/actions/order-details";
import { useAppDispatch, useAppSelector } from '../../services/types';
import { IIngredient } from '../../services/types/data';
import BurgerIngredient from "../BurgerIngredient/BurgerIngredient";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import TotalPrice from "../TotalPrice/TotalPrice";
import styles from "./BurgerConstructor.module.css";

// определяет кнопки
const button = {
  order: "Оформить заказ",
  process: "Заказ в обработке",
};

// функциональный компонент, отображающий состав и общую стоимость бургера
const BurgerConstructor = () => {
  // получение состояния булки, ингредиентов и пользователя из хранилища Redux
  const { bun, ingredients } = useAppSelector(
    (state) => state.rootReducer.burgerConstructor
  );

  const { user } = useAppSelector((state) => state.rootReducer.user);


  // определяет состояние отображения модального окна с информацией об ингредиенте
  const { orderRequest, isOpenOrder } = useAppSelector(
    (state) => state.rootReducer.orderDetails
  );

  // получение методов
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // текст кнопки, меняющийся при отправке заказа
  const buttonText = orderRequest ? button.process : button.order;

  // обработка добавления ингредиента
  const onDropHandler = useCallback(
    (item: IIngredient) => {
      if (item.type === "bun") {
        dispatch(addIngredientsBun(item));
      } else {
        dispatch(addIngredients(item));
      }
    },
    [dispatch]
  );

  // определение области дропа
  const [{ isActive }, drop] = useDrop({
    accept: "ingredient",
    drop(itemId: IIngredient) {
      onDropHandler(itemId);
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
  const orderIngredients: string[] = useMemo(
    () => ingredients.map((m) => m._id),
    [ingredients]
  );

  // обработчик открытия модального окна
  const handleOpenModal = () => {
    if (!user) {
      navigate("/login", { replace: true });
    } else {
      dispatch(openModalOrderDetails());
      const bunId: string = bun ? bun?._id : ""
      const allIngredients = [...orderIngredients, bunId];
      dispatch(postOrderFetch(allIngredients));
    }
  };

  // обработчик закрытия модального окна
  const handleCloseModal = useCallback(() => {
    if (isOpenOrder) {
      dispatch(clearIngredientsConstructor());
      dispatch(clearIngredientsConstructorBun());
      dispatch(closeModalOrderDetails());
    }
  }, [dispatch, isOpenOrder]);

  // возвращает разметку, содержащую два блока -  список ингредиентов с булками вверху и внизу, а также блок с общей стоимостью и кнопкой оформления заказа
  return (
    <div>
      <div
        className={`${bun && saucesAndMains === null ? styles.empty : ""} ${isActive ? styles.active : styles.inactive
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
          />
        )}
        <ul className={`${styles.list} pt-5`}>
          {ingredients.map((item) => (
            <li key={item.keyUuid} className={`${styles.item} pb-4`}>
              <DragIcon type="primary" />
              <BurgerIngredient
                ingredient={item}
                moveIngredient={moveIngredientItem}
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
