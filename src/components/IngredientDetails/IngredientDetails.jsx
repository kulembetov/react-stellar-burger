import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setTabIngredient } from "../../services/actions/actions";
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
  // определяет метод
  const dispatch = useDispatch();

  // получает id из URL
  const { id } = useParams();

  // получение состояния о выбранном ингредиенте из Redux хранилища
  const tabIngredient = useSelector(
    (state) => state.rootReducer.ingredientDetails.tabIngredient
  );

  // получение состояния из глобального хранилища
  const { burgerIngredients } = useSelector(
    (state) => state.rootReducer.ingredients
  );

  // выбирает ингредиент и добавляет его в хранилище
  const selectIngredient = () => {
    if (!tabIngredient) {
      const item = burgerIngredients.find((item) => item._id === id);
      dispatch(setTabIngredient(item));
    }
  };

  // вызов selectIngredient при каждой отрисовке компонента
  useEffect(() => {
    selectIngredient();
  });

  // определяет состояние, изначально скрывающее Loader
  const [imageIsLoading, setImageIsLoading] = useState(false);

  // обработчик загрузки изображения
  const handleImageLoad = () => {
    setImageIsLoading(true);
  };

  // возвращает разметку, которая содержит изображение ингредиента, его название и энергетическую ценность
  return (
    !!tabIngredient && (
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
    )
  );
};

export default React.memo(IngredientDetails);
