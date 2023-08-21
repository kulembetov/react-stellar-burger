import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";
import {
  closeModalIngredientDetails,
  deleteTabIngredient,
  openModalIngredientDetails,
  setTabIngredient,
} from "../../services/actions/ingredient-details";
import { useAppSelector } from '../../services/types';
import { IIngredient } from '../../services/types/data';
import BurgerIngredientItem from "../BurgerIngredientItem/BurgerIngredientItem";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";
import styles from "./BurgerIngredients.module.css";

// пропсы компонента
interface ITabType {
  name: string;
  type: string;
  ref: React.RefObject<HTMLLIElement>;
}

// определяет заголовок
const title = {
  constructor: "Соберите бургер",
};

// функциональный компонент, отображающий ингредиенты для бургера в виде вкладок с категориями булок, соусов и начинок
const BurgerIngredients = () => {
  const {
    burgerIngredients,
    burgerIngredientsRequest,
    burgerIngredientsFailed,
  } = useAppSelector((state) => state.rootReducer.ingredients);

  // определяет состояние отображения модального окна с информацией об ингредиенте
  const { isOpenIngredient } = useAppSelector(
    (state) => state.rootReducer.ingredientDetails
  );

  // получение метода
  const dispatch = useDispatch();

  // определяет текущую категорию ингредиентов, изначально выбранная категория - булки
  const [currentTab, setCurrentTab] = useState<string>("buns");

  // определяет секции
  const tabs: { [key: string]: ITabType } = {
    buns: {
      name: "Булки",
      type: "bun",
      ref: useRef(null),
    },
    sauces: {
      name: "Соусы",
      type: "sauce",
      ref: useRef(null),
    },
    fillings: {
      name: "Начинки",
      type: "main",
      ref: useRef(null),
    },
  };

  // прокручивает страницу к выбранной категориии
  const tabRefs: { [key: string]: React.RefObject<HTMLElement> } = {
    [tabs.buns.type]: useRef(null),
    [tabs.sauces.type]: useRef(null),
    [tabs.fillings.type]: useRef(null),
  };

  // определяет состояние выбранной категории и прокручивает к ней
  const selectTab = (selectedTab: string) => {
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
  const filterIngredientsByType = (
    ingredients: IIngredient[],
    type: string
  ): IIngredient[] => {
    return ingredients.filter((ingredient) => ingredient.type === type);
  };
  // фильтрует элементы массива на основе типа ингредиентов
  const filteredBunIngredients = filterIngredientsByType(
    burgerIngredients,
    tabs.buns.type
  );
  const filteredSauceIngredients = filterIngredientsByType(
    burgerIngredients,
    tabs.sauces.type
  );
  const filteredFillingIngredients = filterIngredientsByType(
    burgerIngredients,
    tabs.fillings.type
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
  const handleOpenModalIngredient = (item: IIngredient) => {
    dispatch(openModalIngredientDetails());
    dispatch(setTabIngredient(item));
  };

  // обработка закрытия модального окна
  const handleCloseModalIngredient = () => {
    dispatch(closeModalIngredientDetails());
    dispatch(deleteTabIngredient());
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
            <div ref={tabRefs[tabs.buns.type] as React.RefObject<HTMLDivElement>}>
              <Tab
                value="buns"
                active={bunIsInView}
                onClick={() => selectTab(tabs.buns.type)}
              >
                {tabs.buns.name}
              </Tab>
            </div>
            <div ref={tabRefs[tabs.sauces.type] as React.RefObject<HTMLDivElement>}>
              <Tab
                value="sauces"
                active={sauceIsInView && !bunIsInView && !fillingIsInView}
                onClick={() => selectTab(tabs.sauces.type)}
              >
                {tabs.sauces.name}
              </Tab>
            </div>
            <div ref={tabRefs[tabs.fillings.type] as React.RefObject<HTMLDivElement>}>
              <Tab
                value="fillings"
                active={fillingIsInView || (!bunIsInView && !sauceIsInView)}
                onClick={() => selectTab(tabs.fillings.type)}
              >
                {tabs.fillings.name}
              </Tab>
            </div>
          </div>
          <div className={`${styles.box} mt-5`} ref={rootRef}>
            <div className="pb-5" id="buns" ref={inViewBunRef}>
              <h2
                className="text text_type_main-medium pb-1"
                ref={tabRefs[tabs.buns.type] as React.RefObject<HTMLDivElement>}
              >
                {tabs.buns.name}
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
                ref={tabRefs[tabs.sauces.type] as React.RefObject<HTMLDivElement>}
              >
                {tabs.sauces.name}
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
                ref={tabRefs[tabs.fillings.type] as React.RefObject<HTMLDivElement>}
              >
                {tabs.fillings.name}
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
        {isOpenIngredient && (
          <Modal
            onClose={handleCloseModalIngredient}
            title="Детали ингредиента"
          >
            <IngredientDetails />
          </Modal>
        )}
      </>
    );
  }
};

export default React.memo(BurgerIngredients);
