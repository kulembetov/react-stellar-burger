import React, { useState } from "react";
import { ingredientPropType } from "../../utils/prop-types.js";
import Loader from "../Loader/Loader.jsx";
import styles from "./IngredientDetails.module.css";

// функциональный компонент, отображающий подробную информацию об ингредиенте
const IngredientDetails = ({ ingredientDetails }) => {
  // создание состояния, которое изначально скрывает Loader
  const [imageIsLoading, setImageIsLoading] = useState(false);

  // обработчик загрузки изображения
  const handleImageLoad = () => {
    setImageIsLoading(true);
  };
  // определяет текст
  const text = {
    calories: "Калории, ккал",
    proteins: "Белки, г",
    fat: "Жиры, г",
    carbohydrates: "Углеводы, г",
  };

  // возвращает разметку, которая содержит изображение ингредиента, его название и энергетическую ценность
  return (
    <div className={styles.box}>
      {!imageIsLoading && <Loader />}
      <figure
        className={`${styles.figure} pb-4`}
        style={{ opacity: imageIsLoading ? 1 : 0 }}
      >
        <img
          src={ingredientDetails.image_large}
          alt={ingredientDetails.name}
          onLoad={handleImageLoad}
          onError={handleImageLoad}
        />
        <figcaption
          className={`${styles.caption} text text_type_main-medium pt-4`}
        >
          {ingredientDetails.name}
        </figcaption>
      </figure>
      <ul
        className={`${styles.list} pt-4`}
        style={{ opacity: imageIsLoading ? 1 : 0 }}
      >
        <li className={`${styles.item} mr-5`}>
          <p className={`${styles.text} text text_type_main-default`}>
            {text.calories}
          </p>
          <p className={`${styles.text} text text_type_digits-default`}>
            {ingredientDetails.calories}
          </p>
        </li>
        <li className={`${styles.item} mr-5`}>
          <p className={`${styles.text} text text_type_main-default`}>
            {text.proteins}
          </p>
          <p className={`${styles.text} text text_type_digits-default`}>
            {ingredientDetails.proteins}
          </p>
        </li>
        <li className={`${styles.item} mr-5`}>
          <p className={`${styles.text} text text_type_main-default`}>
            {text.fat}
          </p>
          <p className={`${styles.text} text text_type_digits-default`}>
            {ingredientDetails.fat}
          </p>
        </li>
        <li className={`${styles.item} pb-15`}>
          <p className={`${styles.text} text text_type_main-default`}>
            {text.carbohydrates}
          </p>
          <p className={`${styles.text} text text_type_digits-default`}>
            {ingredientDetails.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
};

// описывает типы пропсов, которые ожидает компонент
IngredientDetails.propTypes = {
  ingredientDetails: ingredientPropType.isRequired,
};

export default React.memo(IngredientDetails);
