import { data } from '../../utils/data';
import AppHeader from '../AppHeader/AppHeader.jsx';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.jsx';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.jsx';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import styles from './App.module.css';

// функциональный компонент, отображающий страницу приложения
const App = () => {
  return (
    <ErrorBoundary>
      <div className={styles.app}>
        <AppHeader />
        <main className={styles.main}>
          <section className={styles.ingredients}>
            <h1 className='text text_type_main-large'>Соберите бургер</h1>
            <BurgerIngredients ingredients={data} />
          </section>
          <section className={styles.constructor}>
            <BurgerConstructor ingredients={data} />
          </section>
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default App;
