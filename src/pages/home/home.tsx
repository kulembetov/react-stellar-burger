import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import styles from "./home.module.css";
import Loader from "../../components/Loader/Loader";

const Home = () => {
  // определяет состояние загрузки
  const [isLoading, setIsLoading] = useState(true);

  // лоадер при первоначальной отрисовке
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  // возвращает разметку, которая содержит конструктор бургера
  return (
    <>
      {isLoading ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : (
        <main className={styles.main}>
          <DndProvider backend={HTML5Backend}>
            <section className={styles.ingredients}>
              <BurgerIngredients />
            </section>
            <section className={styles.box}>
              <BurgerConstructor />
            </section>
          </DndProvider>
        </main>
      )}
    </>
  );
};

export default React.memo(Home);
