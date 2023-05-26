import { useEffect, useState } from "react";
import { getData } from "../../api/api";
import { IngredientContext } from "../../services/ingredientContext";
import AppHeader from "../AppHeader/AppHeader.jsx";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor.jsx";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients.jsx";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import Loader from "../Loader/Loader.jsx";
import styles from "./App.module.css";

// функциональный компонент, содержащий приложение
const App = () => {
  // определяет ингредиенты
  const [ingredients, setIngredients] = useState([]);

  // определяет состояние лоадера
  const [isLoading, setIsLoading] = useState(true);

  // вызывает функцию получения ингредиентов при первом рендеринге
  useEffect(() => {
    getIngredients();
  }, []);

  // получение ингредиентов, отображение индикатора загрузки
  const getIngredients = () => {
    setIsLoading(true);
    getData()
      .then((res) => {
        setIngredients(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // возвращает разметку, которая содержит приложение
  return (
    <ErrorBoundary>
      <div className={styles.app}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <AppHeader />
            <main className={styles.main}>
              <IngredientContext.Provider value={ingredients}>
                <BurgerIngredients ingredients={ingredients} />
                <BurgerConstructor ingredients={ingredients} />
              </IngredientContext.Provider>
            </main>
          </>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default App;
