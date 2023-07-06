import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  getData,
  openIngredientDetailsModal,
  setTabIngredient,
} from "../../services/actions/actions";
import BurgerIngredientItem from "../BurgerIngredientItem/BurgerIngredientItem";
import Loader from "../Loader/Loader";
import styles from "./BurgerIngredients.module.css";

// определяют типы ингредиентов для каждой категории
const tab = {
  buns: {
    name: "Булки",
    type: "bun",
  },
  sauces: {
    name: "Соусы",
    type: "sauce",
  },
  fillings: {
    name: "Начинки",
    type: "main",
  },
};

// определяет заголовок
const title = {
  constructor: "Соберите бургер",
};

// функциональный компонент, отображающий ингредиенты для бургера в виде вкладок с категориями булок, соусов и начинок
const BurgerIngredients = () => {
  // определяет метод
  const location = useLocation();

  // определяет состояние ингредиентов из Redux хранилища
  const {
    burgerIngredients,
    burgerIngredientsRequest,
    burgerIngredientsFailed,
  } = useSelector((state) => state.burgerIngredients);

  // получение метода
  const dispatch = useDispatch();

  // первоначальная отрисовка ингредиентов
  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  // определяет текущую категорию ингредиентов, изначально выбранная категория - булки
  const [currentTab, setCurrentTab] = useState("buns");

  // прокручивает страницу к выбранной категориии
  const tabRefs = {
    [tab.buns.type]: useRef(null),
    [tab.sauces.type]: useRef(null),
    [tab.fillings.type]: useRef(null),
  };

  // определяет состояние выбранной категории и прокручивает к ней
  const selectTab = (selectedTab) => {
    if (currentTab === selectedTab) {
      return;
    }
    setCurrentTab(selectedTab);
    const selectedTabItem = tabRefs[selectedTab].current;
    if (selectedTabItem) {
      selectedTabItem.scrollIntoView({ behavior: "smooth" });
    }
  };

  // универсальная функция фильтрации
  const filterIngredientsByType = (ingredients, type) => {
    return ingredients.filter((ingredient) => ingredient.type === type);
  };

  // фильтрует элементы массива на основе типа ингредиентов
  const filteredBunIngredients = filterIngredientsByType(
    burgerIngredients,
    tab.buns.type
  );
  const filteredSauceIngredients = filterIngredientsByType(
    burgerIngredients,
    tab.sauces.type
  );
  const filteredFillingIngredients = filterIngredientsByType(
    burgerIngredients,
    tab.fillings.type
  );

  // указывает на корневой элемент, относительно которого будет определяться видимость отслеживаемых элементов
  const rootRef = useRef(null);

  // определяет, находятся ли элементы с категориями в области видимости окна
  const [inViewBunRef, bunIsInView] = useInView({
    threshold: 0.15,
    root: rootRef.current,
  });
  const [inViewSauceRef, sauceIsInView] = useInView({
    threshold: 0.2,
    root: rootRef.current,
  });
  const [inViewFillingRef, fillingIsInView] = useInView({
    threshold: 0.5,
    root: rootRef.current,
  });

  // обработка открытия модального окна
  const handleOpenModalIngredient = (item) => {
    dispatch(openIngredientDetailsModal());
    dispatch(setTabIngredient(item));
  };

  // возвращает лоадер, если идёт отправка запроса или произошла ошибка
  if (burgerIngredientsFailed || burgerIngredientsRequest) {
    return <Loader />;
  } else {
    // возвращает разметку, которая содержит три вкладки с категориями ингредиентов, а также списки ингредиентов для каждой категории
    return (
      <>
        <div className={`${styles.wrapper}`}>
          <h1 className="text text_type_main-large">{title.constructor}</h1>
          <div className={`${styles.tabs} pt-5 pb-5`}>
            <div ref={tabRefs[tab.buns.type]}>
              <Tab
                className={
                  currentTab === tab.buns.type ? `${styles.disabled}` : ""
                }
                active={bunIsInView}
                onClick={() => selectTab(tab.buns.type)}
              >
                {tab.buns.name}
              </Tab>
            </div>
            <div ref={tabRefs[tab.sauces.type]}>
              <Tab
                className={
                  currentTab === tab.sauces.type ? `${styles.disabled}` : ""
                }
                active={sauceIsInView && !bunIsInView && !fillingIsInView}
                onClick={() => selectTab(tab.sauces.type)}
              >
                {tab.sauces.name}
              </Tab>
            </div>
            <div ref={tabRefs[tab.fillings.type]}>
              <Tab
                className={
                  currentTab === tab.fillings.type ? `${styles.disabled}` : ""
                }
                active={fillingIsInView || (!bunIsInView && !sauceIsInView)}
                onClick={() => selectTab(tab.fillings.type)}
              >
                {tab.fillings.name}
              </Tab>
            </div>
          </div>
          <div className={`${styles.box} mt-5`} ref={rootRef}>
            <div className="pb-5" id="buns" ref={inViewBunRef}>
              <h2
                className="text text_type_main-medium pb-1"
                ref={tabRefs[tab.buns.type]}
              >
                {tab.buns.name}
              </h2>
              <ul className={`${styles.list} pt-5`}>
                {filteredBunIngredients.map((ingredient) => (
                  <Link
                    className={styles.link}
                    key={ingredient._id}
                    to={`/ingredients/${ingredient._id}`}
                    state={{ background: location }}
                  >
                    <BurgerIngredientItem
                      ingredient={ingredient}
                      onTab={handleOpenModalIngredient}
                    />
                  </Link>
                ))}
              </ul>
            </div>
            <div className="pt-5 pb-5" id="sauces" ref={inViewSauceRef}>
              <h2
                className="text text_type_main-medium pb-1"
                ref={tabRefs[tab.sauces.type]}
              >
                {tab.sauces.name}
              </h2>
              <ul className={`${styles.list} pt-5`}>
                {filteredSauceIngredients.map((ingredient) => (
                  <Link
                    className={styles.link}
                    key={ingredient._id}
                    to={`/ingredients/${ingredient._id}`}
                    state={{ background: location }}
                  >
                    <BurgerIngredientItem
                      ingredient={ingredient}
                      onTab={handleOpenModalIngredient}
                    />
                  </Link>
                ))}
              </ul>
            </div>
            <div className="pt-5 pb-5" id="fillings" ref={inViewFillingRef}>
              <h2
                className="text text_type_main-medium pb-1"
                ref={tabRefs[tab.fillings.type]}
              >
                {tab.fillings.name}
              </h2>
              <ul className={`${styles.list} pt-5`}>
                {filteredFillingIngredients.map((ingredient) => (
                  <Link
                    className={styles.link}
                    key={ingredient._id}
                    to={`/ingredients/${ingredient._id}`}
                    state={{ background: location }}
                  >
                    <BurgerIngredientItem
                      ingredient={ingredient}
                      onTab={handleOpenModalIngredient}
                    />
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default React.memo(BurgerIngredients);
