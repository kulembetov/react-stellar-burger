import React, { useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader.jsx";
import styles from "./IngredientDetails.module.css";

// определяет текст
const text = {
  calories: "Калории, ккал",
  proteins: "Белки, г",
  fat: "Жиры, г",
  carbohydrates: "Углеводы, г",
};

// функциональный компонент, отображающий подробную информацию об ингредиенте
const IngredientDetails = () => {
  // получение состояния о выбранном ингредиенте из Redux хранилища
  const tabIngredient = useSelector(
    (state) => state.ingredientDetails.tabIngredient
  );

  // создание состояния, которое изначально скрывает Loader
  const [imageIsLoading, setImageIsLoading] = useState(false);

  // обработчик загрузки изображения
  const handleImageLoad = () => {
    setImageIsLoading(true);
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
          src={tabIngredient.image_large}
          alt={tabIngredient.name}
          onLoad={handleImageLoad}
          onError={handleImageLoad}
        />
        <figcaption
          className={`${styles.caption} text text_type_main-medium pt-4`}
        >
          {tabIngredient.name}
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
            {tabIngredient.calories}
          </p>
        </li>
        <li className={`${styles.item} mr-5`}>
          <p className={`${styles.text} text text_type_main-default`}>
            {text.proteins}
          </p>
          <p className={`${styles.text} text text_type_digits-default`}>
            {tabIngredient.proteins}
          </p>
        </li>
        <li className={`${styles.item} mr-5`}>
          <p className={`${styles.text} text text_type_main-default`}>
            {text.fat}
          </p>
          <p className={`${styles.text} text text_type_digits-default`}>
            {tabIngredient.fat}
          </p>
        </li>
        <li className={`${styles.item} pb-15`}>
          <p className={`${styles.text} text text_type_main-default`}>
            {text.carbohydrates}
          </p>
          <p className={`${styles.text} text text_type_digits-default`}>
            {tabIngredient.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default React.memo(IngredientDetails);
