import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { getOrder } from "../../services/actions/get-order";
import { useAppDispatch, useAppSelector } from '../../services/types';
import { IIngredient } from '../../services/types/data';
import Loader from "../Loader/Loader";
import TotalPrice from "../TotalPrice/TotalPrice";
import styles from "./OrderInfo.module.css";

// пропсы компонента
interface IParams {
  id: string;
}

// определяет текст
const text = {
  ingredients: "Состав:",
  hashtag: "#",
  multiply: " x ",
  done: "Готов",
  created: "Создан",
  pending: "Готовится",
};

// отображает компонент, отображающий информацию об ингредиенте
const OrderInfo = () => {
  // определение методов
  const dispatch = useAppDispatch();
  const { id } = useParams<keyof IParams>();

  // извлекает идентификатор заказа из параметров URL
  const orderId = Number(id);

  // получение данных об ингредиенте бургера из Redux хранилища
  const { burgerIngredients } = useAppSelector(
    (state) => state.rootReducer.ingredients
  );

  // получение информации о текущем заказе, состоянии загрузки заказа и состоянии ошибки
  const { order, orderFailed, orderRequest } = useAppSelector(
    (state) => state.rootReducer.order
  );


  const orderIngredients: IIngredient[] = order ? order.ingredients : burgerIngredients;


  // фильтрует массив уникальных ингредиентов
  const uniqueIngredients = orderIngredients.filter(function (elem, index, self) {
    return index === self.indexOf(elem);
  });

  // поиск информации об ингредиенте по id
  const findIngredient = (ingredient: string | IIngredient) => {
    return burgerIngredients ? burgerIngredients.find((item) => item._id === ingredient) : null;
  };

  // массив с информацией об ингредиентах для отображения в заказе
  const burgerIngredientsImage = orderIngredients ? orderIngredients.map((item) =>
    findIngredient(item)
  ) : null;

  // расчёт общей стоимости заказа
  const totalPrice = useMemo(() => {
    return burgerIngredientsImage?.reduce((acc, item) => {
      return (
        acc +
        (item ? (item.type !== "bun" ? item?.price : 0) : 0) +
        (item ? (item.type === "bun" ? 2 * item?.price : 0) : 0)
      );
    }, 0);
  }, [burgerIngredientsImage]);

  // подсчёт количества ингредиентов в заказе
  const getIngredientCount = useMemo(() => (ingredient: string | IIngredient) => {
    const ingredientsId = orderIngredients.filter(
      (item) => item === ingredient
    );
    return ingredientsId?.length;
  }, [orderIngredients]);

  // определение цвета статуса заказа в зависимости от его значения
  const getStatusColor = () => {
    switch (order?.status) {
      case "done":
        return `${styles.success} text text_type_main-small pb-5 mb-5`;
      case "created":
        return `${styles.created} text text_type_main-small pb-5 mb-5`;
      case "pending":
        return `${styles.failed} text text_type_main-small pb-5 mb-5`;
      default:
        return "";
    }
  };

  // получение текста статуса заказа
  const getStatusText = () => {
    switch (order?.status) {
      case "done":
        return text.done;
      case "created":
        return text.created;
      case "pending":
        return text.pending;
      default:
        return "";
    }
  };

  // форматирование даты
  const formatDate = (date: Date) => {
    return date.toLocaleString(undefined, {
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  // загружает информации о заказе
  useEffect(() => {
    dispatch(getOrder(orderId));
  }, [dispatch, orderId]);

  // возвращает разметку, которая содержит информацию об ингредиенте
  if (orderFailed || orderRequest) {
    return <Loader />;
  } else {
    return (
      <>
        {orderId === (order ? order.number : null) && (
          <div className={`${styles.box} mt-15`}>
            <ul className={`${styles.list} pb-5`}>
              <li
                className={`${styles.number} text text_type_digits-default pb-5`}
              >
                {text.hashtag}
                {order?.number}
              </li>
              <li
                className={`${styles.order} text text_type_main-medium pt-5 pb-3`}
              >
                {order?.name}
              </li>
              <li className={getStatusColor()}>{getStatusText()}</li>
              <li className="text text_type_main-medium pt-5">
                {text.ingredients}
                <ul className={`${styles.ingredients} pt-3`}>
                  {uniqueIngredients.map((ingredient, index) => (
                    <li className={`${styles.item}`} key={index}>
                      <div className={`${styles.wrapper}`}>
                        <div className={`${styles.image}`}>
                          <img
                            src={findIngredient(ingredient)?.image_mobile}
                            alt=""
                          />
                        </div>
                        <p
                          className={`${styles.name} text text_type_main-small`}
                        >
                          {findIngredient(ingredient)?.name}
                        </p>
                      </div>
                      <div className={`${styles.price}`}>
                        <p className="text text_type_digits-default">
                          {getIngredientCount(ingredient)}
                          {text.multiply}
                          {findIngredient(ingredient)?.price}
                        </p>
                        <CurrencyIcon type="primary" />
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
            <div className={`${styles.time} pt-5`}>
              <p
                className={`${styles.date} text text_type_main-default text_color_inactive`}
              >
                {order?.updatedAt ? formatDate(new Date(order.updatedAt)) : ""}
              </p>
              <div className={`${styles.price}`}>
                <TotalPrice totalPrice={totalPrice ? totalPrice : 0} />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
};

export default React.memo(OrderInfo);
