import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useMemo, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { ingredientPropType } from "../../utils/prop-types";
import BurgerIngredientItem from "../BurgerIngredientItem/BurgerIngredientItem";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import styles from "./BurgerIngredients.module.css";

// функциональный компонент, отображающий ингредиенты для бургера в виде вкладок с категориями булок, соусов и начинок
const BurgerIngredients = ({ ingredients }) => {
  // определяет текущую категорию ингредиентов, изначально выбранная категория - булки
  const [currentTab, setCurrentTab] = useState("buns");

  // определяет состояние отображения модального окна с информацией об ингредиенте
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // прокручивает страницу к выбранной категориии
  const tabRefs = {
    [tab.buns.type]: useRef(null),
    [tab.sauces.type]: useRef(null),
    [tab.fillings.type]: useRef(null),
  };

  // определяет состояние выбранной секции и прокручивает к ней
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

  // фильтрует элементы массива на основе типа ингредиентов
  const filteredBunIngredients = useMemo(
    () => ingredients.filter((ingredient) => ingredient.type === tab.buns.type),
    [ingredients, tab.buns.type]
  );

  const filteredSauceIngredients = useMemo(
    () =>
      ingredients.filter((ingredient) => ingredient.type === tab.sauces.type),
    [ingredients, tab.sauces.type]
  );

  const filteredFillingIngredients = useMemo(
    () =>
      ingredients.filter((ingredient) => ingredient.type === tab.fillings.type),
    [ingredients, tab.fillings.type]
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
    setIsModalOpen(true);
    setCurrentTab(item);
  };

  // обработка закрытия модального окна
  const handleCloseModalIngredient = () => {
    setIsModalOpen(false);
    setCurrentTab(null);
  };

  // определяет заголовок
  const title = {
    constructor: "Соберите бургер",
  };

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
                <li key={ingredient._id}>
                  <BurgerIngredientItem
                    ingredient={ingredient}
                    onTab={handleOpenModalIngredient}
                  />
                </li>
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
                <li key={ingredient._id}>
                  <BurgerIngredientItem
                    ingredient={ingredient}
                    onTab={handleOpenModalIngredient}
                  />
                </li>
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
                <li key={ingredient._id}>
                  <BurgerIngredientItem
                    ingredient={ingredient}
                    onTab={handleOpenModalIngredient}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal onClose={handleCloseModalIngredient} title="Детали ингредиента">
          <IngredientDetails ingredientDetails={currentTab} />
        </Modal>
      )}
    </>
  );
};

// описывает типы пропсов, которые ожидает компонент
BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};

export default BurgerIngredients;
