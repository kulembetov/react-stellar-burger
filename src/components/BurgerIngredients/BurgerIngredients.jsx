import { useRef, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';
import { useInView } from 'react-intersection-observer';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientItem from '../BurgerIngredientItem/BurgerIngredientItem';
import styles from './BurgerIngredients.module.css';

// функциональный компонент, отображает ингредиенты для бургера в виде вкладок с категориями булок, соусов и начинок
const BurgerIngredients = ({ ingredients }) => {
  // определяет текущую категорию ингредиентов, изначально выбранная категория - булки
  const [currentTab, setCurrentTab] = useState('buns');

  // определяют типы ингредиентов для каждой категории
  const bunType = 'bun';
  const sauceType = 'sauce';
  const fillingType = 'filling';

  // фильтрует элементы массива на основе типа ингредиентов
  const filteredBunIngredients = useMemo(
    () => ingredients.filter((ingredient) => ingredient.type === bunType),
    [ingredients, bunType]
  );

  const filteredSauceIngredients = useMemo(
    () => ingredients.filter((ingredient) => ingredient.type === sauceType),
    [ingredients, sauceType]
  );

  const filteredFillingIngredients = useMemo(
    () => ingredients.filter((ingredient) => ingredient.type === fillingType),
    [ingredients, fillingType]
  );

  // прокручивает страницу к выбранной категории
  const tabRefs = {
    buns: useRef(null),
    sauces: useRef(null),
    fillings: useRef(null),
  };

  // казывает на корневой элемент, относительно которого будет определяться видимость отслеживаемых элементов
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

  // устанавливает текущую выбранную категорию и прокручивает страницу к этой категории
  const selectTab = useCallback(
    (selectedTab) => {
      setCurrentTab(selectedTab);
      const selectedTabItem = tabRefs[selectedTab].current;
      if (selectedTabItem) {
        return selectedTabItem.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [tabRefs]
  );

  // возвращает разметку, которая содержит три вкладки с категориями ингредиентов, а также списки ингредиентов для каждой категории
  return (
    <>
      <div className={`${styles.categories} pt-5 pb-5`}>
        <Tab
          className={currentTab === 'buns' ? 'active' : ''}
          active={bunIsInView}
          ref={tabRefs.buns}
          onClick={() => selectTab('buns')}
        >
          Булки
        </Tab>
        <Tab
          className={currentTab === 'sauces' ? 'active' : ''}
          active={sauceIsInView && !bunIsInView && !fillingIsInView}
          ref={tabRefs.sauces}
          onClick={() => selectTab('sauces')}
        >
          Соусы
        </Tab>
        <Tab
          className={currentTab === 'fillings' ? 'active' : ''}
          active={fillingIsInView || (!bunIsInView && !sauceIsInView)}
          ref={tabRefs.fillings}
          onClick={() => selectTab('fillings')}
        >
          Начинки
        </Tab>
      </div>
      <div className={`${styles.box} mt-5`} ref={rootRef}>
        <div className='pb-5' id='buns' ref={inViewBunRef}>
          <h2 className='text text_type_main-medium pb-1' ref={tabRefs.buns}>
            Булки
          </h2>
          <ul className={`${styles.list} pt-5`}>
            {filteredBunIngredients.map((ingredient) => (
              <li key={ingredient._id}>
                <BurgerIngredientItem ingredient={ingredient} />
              </li>
            ))}
          </ul>
        </div>
        <div className='pt-5 pb-5' id='sauces' ref={inViewSauceRef}>
          <h2 className='text text_type_main-medium pb-1' ref={tabRefs.sauces}>
            Соусы
          </h2>
          <ul className={`${styles.list} pt-5`}>
            {filteredSauceIngredients.map((ingredient) => (
              <li key={ingredient._id}>
                <BurgerIngredientItem ingredient={ingredient} />
              </li>
            ))}
          </ul>
        </div>
        <div className='pt-5 pb-5' id='fillings' ref={inViewFillingRef}>
          <h2
            className='text text_type_main-medium pb-1'
            ref={tabRefs.fillings}
          >
            Начинки
          </h2>
          <ul className={`${styles.list} pt-5`}>
            {filteredFillingIngredients.map((ingredient) => (
              <li key={ingredient._id}>
                <BurgerIngredientItem ingredient={ingredient} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

// описывает типы пропсов, которые ожидает компонент
BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};

export default BurgerIngredients;
