import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_INGREDIENTS_CONSTRUCTOR } from "../../services/actions/actions";
import { ingredientPropType } from "../../utils/prop-types";
import styles from "./BurgerIngredient.module.css";

// функциональный компонент, отображающий ингредиент бургера
const BurgerIngredient = ({ ingredient, moveIngredientItem }) => {
  // определяет состояние ингредиентов из Redux хранилища
  const { ingredients } = useSelector((state) => state.burgerConstructor);

  // определяет использование уникального ключа при добавлении в конструктор
  const id = ingredient.key;

  // определение индекса ингредиента
  const index = ingredients.indexOf(ingredient);

  // получение метода
  const dispatch = useDispatch();

  // удаление ингредиента
  const onDelete = () => {
    return dispatch({
      type: DELETE_INGREDIENTS_CONSTRUCTOR,
      key: ingredient.key,
    });
  };

  // драг контейнер
  const [{ isDragging }, drag] = useDrag({
    type: "item",
    item: () => ({ id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;

  // дроп контейнер
  const [{ handlerId }, drop] = useDrop({
    accept: "item",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveIngredientItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    drop(item) {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveIngredientItem(dragIndex, hoverIndex);
    },
  });

  // указывает на внешний контейнер компонента
  const ref = useRef(null);

  // перетаскивание и сброс
  const dragDropRef = drag(drop(ref));

  // возвращает разметку, которая содержит информацию об ингредиенте - название, цену, изображение
  return (
    <div
      className={`${styles.box} pl-2`}
      data-handler-id={handlerId}
      ref={dragDropRef}
      style={{ opacity }}
    >
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image_mobile}
        handleClose={() => onDelete()}
      />
    </div>
  );
};

// проверяет типы пропсов, которые ожидает компонент
BurgerIngredient.propTypes = {
  ingredient: ingredientPropType.isRequired,
};

export default React.memo(BurgerIngredient);
