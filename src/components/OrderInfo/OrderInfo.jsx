import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrder } from "../../services/actions/actions";
import Loader from "../Loader/Loader";
import TotalPrice from "../TotalPrice/TotalPrice";
import styles from "./OrderInfo.module.css";

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
  const dispatch = useDispatch();
  const { id } = useParams();

  // извлекает идентификатор заказа из параметров URL
  const orderId = Number(id);

  // получение данных об ингредиенте бургера из Redux хранилища
  const { burgerIngredients } = useSelector(
    (state) => state.rootReducer.ingredients
  );

  // получение информации о текущем заказе, состоянии загрузки заказа и состоянии ошибки
  const { order, orderFailed, orderRequest } = useSelector(
    (state) => state.rootReducer.order
  );

  // фильтрует массив уникальных ингредиентов
  const uniqueIngredients = order.ingredients
    ? order.ingredients.filter(
        (ingredient, index, self) => self.indexOf(ingredient) === index
      )
    : [];

  // поиск информации об ингредиенте по id
  const findIngredient = (ingredient) => {
    return burgerIngredients?.find((item) => item._id === ingredient);
  };

  // массив с информацией об ингредиентах для отображения в заказе
  const burgerIngredientsImages = order.ingredients
    ? order.ingredients.map(findIngredient)
    : [];

  // расчёт общей стоимости заказа
  const totalPrice = useMemo(() => {
    return burgerIngredientsImages?.reduce((acc, item) => {
      return (
        acc +
        (item?.type !== "bun" ? item?.price : 0) +
        (item?.type === "bun" ? 2 * item?.price : 0)
      );
    }, 0);
  }, [burgerIngredientsImages]);

  // подсчёт количества ингредиентов в заказе
  const getIngredientCount = (ingredient) => {
    return order.ingredients.filter((item) => item === ingredient).length;
  };

  // определение цвета статуса заказа в зависимости от его значения
  const getStatusColor = () => {
    switch (order.status) {
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
    switch (order.status) {
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
  const formatDate = (date) => {
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
        {orderId === order.number && (
          <div className={`${styles.box} mt-15`}>
            <ul className={`${styles.list} pb-5`}>
              <li
                className={`${styles.number} text text_type_digits-default pb-5`}
              >
                {text.hashtag}
                {order.number}
              </li>
              <li
                className={`${styles.order} text text_type_main-medium pt-5 pb-3`}
              >
                {order.name}
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
                {formatDate(new Date(order.updatedAt))}
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
