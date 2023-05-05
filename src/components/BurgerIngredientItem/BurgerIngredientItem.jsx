import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../utils/prop-types.js';
import styles from './BurgerIngredientItem.module.css';

// функциональный компонент, отображающийй информацию об ингредиенте бургера
const BurgerIngredientItem = ({ ingredient }) => {
  // возвращает разметку, которая содержит информацию об ингредиенте бургера - название, цену, количества, изображение
  return (
    <div className={styles.item}>
      <Counter size='default' extraClass='m-1' className={styles.counter} />
      <img
        className={`${styles.image} pt-1 pb-1`}
        src={ingredient.image}
        alt='изображение ингредиента'
      />
      <div className={styles.price}>
        <p className='text text_type_digits-default pr-2'>{ingredient.price}</p>
        <CurrencyIcon />
      </div>
      <p className={`${styles.text} "text text_type_main-default"`}>
        {ingredient.name}
      </p>
    </div>
  );
};

// проверяет типы пропсов, которые ожидает компонент
BurgerIngredientItem.propTypes = {
  ingredient: ingredientPropType.isRequired,
};

export default BurgerIngredientItem;
