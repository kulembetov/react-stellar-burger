import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from "../AppHeader/AppHeader.jsx";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor.jsx";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients.jsx";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import Loader from "../Loader/Loader.jsx";
import styles from "./App.module.css";

// функциональный компонент, содержащий приложение
const App = () => {
  // определяет состояние лоадера
  const [isLoading] = useState(false);

  // определяет состояние ошибки
  const [error] = useState(null);

  // возвращает разметку, которая содержит приложение
  return (
    <ErrorBoundary>
      <div className={styles.app}>
        {error ? (
          <div className={styles.error}>{error}</div>
        ) : isLoading ? (
          <Loader />
        ) : (
          <>
            <AppHeader />
            <main className={styles.main}>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
              </DndProvider>
            </main>
          </>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default React.memo(App);
