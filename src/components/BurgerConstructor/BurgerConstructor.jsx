import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { burgerIngredientTypes } from '../../utils/prop-types';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient.jsx';
import styles from './BurgerConstructor.module.css';

// функциональный компонент, отображающий состав и общую стоимость бургера
const BurgerConstructor = ({ ingredients }) => {
  // поиск булки в списке ингредиентов
  const bun = useMemo(
    () => ingredients.filter((m) => m.type === 'bun')[0],
    [ingredients]
  );

  const sauce = useMemo(
    () => ingredients.filter((m) => m.type === 'sauce')[0],
    [ingredients]
  );

  const filling = useMemo(
    () => ingredients.filter((m) => m.type === 'filling')[0],
    [ingredients]
  );

  // вычисляет общую стоимость бургера
  const totalPrice = useMemo(
    () =>
      ingredients.reduce(
        (acc, current) =>
          current.type === 'bun'
            ? acc + current.price * 2
            : acc + current.price,
        0
      ),
    [ingredients]
  );

  // возвращает разметку, содержащую два блока -  список ингредиентов с булками вверху и внизу, а также блок с общей стоимостью и кнопкой оформления заказа
  return (
    <div>
      <div className={`${styles.ingredient} pl-4 pb-5`}>
        <ConstructorElement
          type='top'
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
          ingredient={bun}
        />
        <ul className={`${styles.list} pt-5`}>
          {ingredients.map(
            (item) =>
              item.type !== 'bun' && (
                <li key={item._id} className={`${styles.item} pb-4`}>
                  <DragIcon type='primary' />
                  <BurgerIngredient ingredient={item} />
                </li>
              )
          )}
        </ul>
        <ConstructorElement
          type='bottom'
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image_mobile}
          ingredient={bun}
        />
      </div>
      <div className={`${styles.order} pt-5 pr-4`}>
        <div className={styles.price}>
          <p className='text text_type_digits-medium'>{totalPrice}</p>
          <CurrencyIcon type='primary' />
        </div>
        <Button
          htmlType='button'
          type='primary'
          size='large'
          disabled={!bun || !sauce || !filling}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

// проверяет типы пропсов, которые ожидает компонент
BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(burgerIngredientTypes.isRequired).isRequired,
};

export default BurgerConstructor;
