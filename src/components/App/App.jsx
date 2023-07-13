import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import Home from "../../pages/home/home";
import Ingredient from "../../pages/ingredient/ingredient";
import Login from "../../pages/login/login";
import NotFound from "../../pages/not-found/not-found";
import OrderFeed from "../../pages/order-feed/order-feed";
import ProfileOrders from "../../pages/profile-orders/profile-orders";
import Profile from "../../pages/profile/profile";
import {
  OnlyAuthorized,
  OnlyUnAuthorized,
} from "../../pages/protected-route/protected-route";
import Register from "../../pages/register/register";
import ResetPassword from "../../pages/reset-password/reset-password";
import { authentication, getData } from "../../services/actions/actions";
import {
  forgotPassword,
  home,
  ingredientsId,
  login,
  notFound,
  orderFeed,
  ordersInProfile,
  profile,
  register,
  resetPassword,
} from "../../utils/routes";
import AppHeader from "../AppHeader/AppHeader";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";
import styles from "./App.module.css";

// функциональный компонент, отображающий приложение
export const App = () => {
  // определяет состояние загрузки
  const [isLoading, setIsLoading] = useState(true);

  // определяет состояние для отображения ошибок
  const [error] = useState(null);

  // определяет методы
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // фоновый роутинг для модального окна
  const background = location.state && location.state.background;

  // повторное отображение страницы ингредиентов
  useEffect(() => {
    // установка лоадера перед получением данных
    setIsLoading(true);

    // получение данных и аутентификация
    dispatch(getData());
    dispatch(authentication());

    // убирает лоадер при успешном получении данных
    setIsLoading(false);
  }, [dispatch]);

  // закрытие модального окна
  const closePopup = () => {
    navigate(-1);
  };

  // возвращает разметку, содержащую приложение
  return (
    <ErrorBoundary>
      {error ? (
        <div className={styles.error}>{error}</div>
      ) : isLoading ? (
        <Loader />
      ) : (
        <div className={styles.app}>
          <AppHeader />
          <Routes location={background || location}>
            <Route path={home} element={<Home />} />
            <Route path={ingredientsId} element={<Ingredient />} />
            <Route
              path={login}
              element={<OnlyUnAuthorized component={<Login />} />}
            />
            <Route
              path={profile}
              element={<OnlyAuthorized component={<Profile />} />}
            >
              <Route
                path={ordersInProfile}
                element={<OnlyAuthorized component={<ProfileOrders />} />}
              />
            </Route>
            <Route
              path={register}
              element={<OnlyUnAuthorized component={<Register />} />}
            />
            <Route
              path={forgotPassword}
              element={<OnlyUnAuthorized component={<ForgotPassword />} />}
            />
            <Route
              path={resetPassword}
              element={<OnlyUnAuthorized component={<ResetPassword />} />}
            />
            <Route path={orderFeed} element={<OrderFeed />} />
            <Route path={notFound} element={<NotFound />} />
          </Routes>
          {background && (
            <Routes>
              <Route
                path={ingredientsId}
                element={
                  <Modal onClose={closePopup} title="Детали ингредиента">
                    <IngredientDetails />
                  </Modal>
                }
              />
            </Routes>
          )}
        </div>
      )}
    </ErrorBoundary>
  );
};
