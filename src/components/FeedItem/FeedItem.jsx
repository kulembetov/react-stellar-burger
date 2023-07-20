import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import TotalPrice from "../TotalPrice/TotalPrice";
import styles from "./FeedItem.module.css";

// определение текста
const text = {
  plus: "+",
  hashtag: "#",
};

// функциональный компонент, отображающий информацию о заказе
const FeedItem = ({ order, onClick }) => {
  const { burgerIngredients } = useSelector(
    (state) => state.rootReducer.ingredients
  );

  // поиск ингредиента по его id
  const findIngredient = (ingredient) => {
    return burgerIngredients.find((item) => item._id === ingredient);
  };

  // создание массива для отображения в заказе
  const burgerIngredientsImage = order.ingredients.map((item) =>
    findIngredient(item)
  );

  // поиск соусов и начинки
  const saucesAndFillings = useMemo(
    () => burgerIngredientsImage.filter((m) => m.type !== "bun"),
    [burgerIngredientsImage]
  );

  // поиск булок
  const bun = useMemo(
    () => burgerIngredientsImage.filter((m) => m.type === "bun"),
    [burgerIngredientsImage]
  );

  // вычисляет общую стоимость бургера
  const totalPrice = useMemo(() => {
    const priceIngredients = saucesAndFillings.reduce((acc, item) => {
      return acc + item.price;
    }, 0);
    return (
      priceIngredients +
      bun.reduce((acc, item) => {
        return acc + item.price * 2;
      }, 0)
    );
  }, [saucesAndFillings, bun]);

  // получение даты
  const date = order.createdAt;

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

  // возвращает разметку, которая содержит информацию о заказе
  return (
    <div className={`${styles.box}`} onClick={() => onClick(order)}>
      <div className={`${styles.string}`}>
        <p className={`${styles.order} text text_type_digits-default`}>
          {text.hashtag}
          {order.number}
        </p>
        <p
          className={`${styles.date} text text_type_main-default text_color_inactive`}
        >
          {formatDate(new Date(date))}
        </p>
      </div>
      <h3 className={`${styles.title} text text_type_main-medium`}>
        {order.name}
      </h3>
      <div className={styles.wrapper}>
        <ul className={styles.list}>
          {burgerIngredientsImage.map((ingredient, index) => {
            if (index < 5) {
              return (
                <li
                  key={index}
                  style={{ zIndex: 999 - index }}
                  className={styles.item}
                >
                  <img
                    className={styles.image}
                    src={ingredient.image}
                    alt={ingredient.image_mobile}
                  />
                </li>
              );
            } else if (index === 6) {
              return (
                <li
                  key={index}
                  style={{ zIndex: 999 - index }}
                  className={styles.ingredient}
                >
                  <img
                    className={styles.last}
                    src={ingredient.image}
                    alt={ingredient.image_mobile}
                  />
                  <div className={styles.overlay}></div>
                  <span
                    className={`text text_type_main-default ${styles.count}`}
                  >
                    +{burgerIngredientsImage.length - 5}
                  </span>
                </li>
              );
            }
            return null;
          })}
        </ul>
        <TotalPrice totalPrice={totalPrice} />
      </div>
    </div>
  );
};

export default React.memo(FeedItem);
