import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC, useRef } from "react";
import { DropTargetOptions, useDrag, useDrop } from "react-dnd";
import { DELETE_INGREDIENTS_CONSTRUCTOR } from "../../services/actions/constructor";
import { useAppDispatch, useAppSelector } from '../../services/types';
import { IIngredient } from '../../services/types/data';
import styles from "./BurgerIngredient.module.css";

interface IBurgerIngredientProps {
  ingredient: IIngredient;
  moveIngredient: (dragIndex: number, hoverIndex: number) => void;
}

// функциональный компонент, отображающий ингредиент бургера
const BurgerIngredient: FC<IBurgerIngredientProps> = ({ ingredient, moveIngredient }) => {
  // определяет состояние ингредиентов из Redux хранилища
  const { ingredients } = useAppSelector(
    (state) => state.rootReducer.burgerConstructor
  );

  // получение метода
  const dispatch = useAppDispatch();

  // определяет использование уникального ключа при добавлении в конструктор
  const id = ingredient.keyUuid;

  // определение индекса ингредиента
  const index = ingredients.indexOf(ingredient);

  // указывает на внешний контейнер компонента
  const ref = useRef<HTMLDivElement>(null);

  // удаление ингредиента
  const onDelete = () => {
    return dispatch({
      type: DELETE_INGREDIENTS_CONSTRUCTOR,
      keyUuid: ingredient.keyUuid,
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
    hover(item: IIngredient, monitor: DropTargetOptions) {
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
      moveIngredient(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    drop(item) {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveIngredient(dragIndex, hoverIndex);
    },
  });
  drag(drop(ref))

  // возвращает разметку, которая содержит информацию об ингредиенте - название, цену, изображение
  return (
    <div
      className={`${styles.box} pl-2`}
      data-handler-id={handlerId}
      ref={ref}
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

export default React.memo(BurgerIngredient);
