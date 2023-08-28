import React, { FC, useMemo } from "react";
import { useAppSelector } from '../../services/types';
import { IIngredient, IOrder } from '../../services/types/data';
import TotalPrice from "../TotalPrice/TotalPrice";
import styles from "./FeedItem.module.css";

// пропсы компонента
interface IFeedItemProps {
  order: IOrder;
  onClick: () => void;
}

// определение текста
const text = {
  plus: "+",
  hashtag: "#",
};

// функциональный компонент, отображающий информацию о заказе
const FeedItem: FC<IFeedItemProps> = ({ order, onClick }) => {
  const { burgerIngredients } = useAppSelector(
    (state) => state.rootReducer.ingredients
  );

  // поиск ингредиента по его id
  const findIngredient = (ingredient: string | IIngredient) => {
    return burgerIngredients.find((item) => item._id === ingredient) as IIngredient;
  };

  // создание массива для отображения в заказе
  const burgerIngredientsImage = order?.ingredients.map((item) =>
    findIngredient(item)
  );

  // вычисляет общую стоимость бургера
  const totalPrice = useMemo(() => {
    return burgerIngredientsImage?.reduce((acc, item) => {
      return (
        acc +
        (item?.type !== "bun" ? item?.price : 0) +
        (item?.type === "bun" ? 2 * item?.price : 0)
      );
    }, 0);
  }, [burgerIngredientsImage]);

  const date = order.updatedAt;

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

  // возвращает разметку, которая содержит информацию о заказе
  return (
    <div className={`${styles.box}`} onClick={() => onClick()}>
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
          {order.ingredients.map((ingredient, index) => {
            if (index < 5) {
              return (
                <li
                  key={index}
                  style={{ zIndex: 999 - index }}
                  className={styles.item}
                >
                  <img
                    className={styles.image}
                    src={findIngredient(ingredient)?.image_mobile}
                    alt={findIngredient(ingredient)?.image_mobile}
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
                    className={styles.image}
                    src={findIngredient(ingredient)?.image_mobile}
                    alt={findIngredient(ingredient)?.image_mobile}
                  />

                  <div className={styles.overlay}></div>
                  <span
                    className={`text text_type_main-default ${styles.count}`}
                  >
                    {text.plus}
                    {order.ingredients.length - 5}
                  </span>
                </li>
              );
            }
            return null;
          })}
        </ul>
        <TotalPrice totalPrice={totalPrice ? totalPrice : 0} />
      </div>
    </div>
  );
};

export default React.memo(FeedItem);
