import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useMemo } from "react";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { ingredientPropType } from "../../utils/prop-types.js";
import styles from "./BurgerIngredientItem.module.css";

// функциональный компонент, отображающий информацию об ингредиенте бургера
const BurgerIngredientItem = ({ ingredient, onTab }) => {
  // определяет состояние ингредиентов из Redux хранилища
  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);

  // обработка взятия драгом ингредиента
  const [{ isDragging }, drag] = useDrag({
    type: "ingredient",
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0.5 : 1;

  // поиск длины массива ингредиентов
  const counter = useMemo(() => {
    const ingredientsId = ingredients.filter(
      (item) => item._id === ingredient._id
    );
    return ingredientsId.length;
  }, [ingredients, ingredient._id]);

  // вычисление количества булок
  const counterForBun = useMemo(() => {
    if (bun === null) {
      return 0;
    } else if (bun !== null && ingredient._id === bun._id) {
      return 2;
    }
  }, [bun, ingredient._id]);

  // возвращает разметку, которая содержит информацию об ингредиенте бургера - название, цену, количества, изображение
  return (
    <div
      className={styles.item}
      style={{ opacity }}
      ref={drag}
      onClick={() => onTab(ingredient)}
    >
      {ingredient.type !== "bun" ? (
        <Counter count={counter} className={styles.counter} />
      ) : (
        <Counter count={counterForBun} className={styles.counter} />
      )}
      <img className="pt-1 pb-1" src={ingredient.image} alt={ingredient.name} />
      <div className={styles.price}>
        <p className="text text_type_digits-default pr-2">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.text} text text_type_main-default`}>
        {ingredient.name}
      </p>
    </div>
  );
};

// проверяет типы пропсов, которые ожидает компонент
BurgerIngredientItem.propTypes = {
  ingredient: ingredientPropType.isRequired,
};

export default React.memo(BurgerIngredientItem);
