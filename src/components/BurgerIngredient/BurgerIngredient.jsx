import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { ingredientPropType } from "../../utils/prop-types";
import styles from "./BurgerIngredient.module.css";

// функциональный компонент, отображающий ингредиент бургера
const BurgerIngredient = ({ ingredient }) => {
  // возвращает разметку, которая содержит информацию об ингредиенте - название, цену, изображение
  return (
    <div className={`${styles.box} pl-2`}>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image_mobile}
      />
    </div>
  );
};

// проверяет типы пропсов, которые ожидает компонент
BurgerIngredient.propTypes = {
  ingredient: ingredientPropType.isRequired,
};

export default React.memo(BurgerIngredient);
