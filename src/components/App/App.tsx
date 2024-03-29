import { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import Home from "../../pages/home/home";
import Ingredient from "../../pages/ingredient-details/ingredient-details";
import Login from "../../pages/login/login";
import NotFound from "../../pages/not-found/not-found";
import OrderDetails from "../../pages/order-details/order-details";
import OrderFeed from "../../pages/order-feed/order-feed";
import ProfileOrderDetails from "../../pages/profile-order-details/profile-order-details";
import ProfileOrders from "../../pages/profile-orders/profile-orders";
import Profile from "../../pages/profile/profile";
import {
  OnlyAuthorized,
  OnlyUnAuthorized,
} from "../../pages/protected-route/protected-route";
import Register from "../../pages/register/register";
import ResetPassword from "../../pages/reset-password/reset-password";
import { getData } from "../../services/actions/ingredients";
import { authentication } from '../../services/actions/user';
import { useAppDispatch } from '../../services/types';
import {
  forgotPassword,
  home,
  ingredientsId,
  login,
  notFound,
  orderFeed,
  orderId,
  profile,
  profileOrder,
  profileOrderId,
  register,
  resetPassword,
} from "../../utils/routes";
import AppHeader from "../AppHeader/AppHeader";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import OrderInfo from "../OrderInfo/OrderInfo";
import styles from "./App.module.css";

type TStateLocation = Location & {
  state: {
    background: Location;
  };
}

// функциональный компонент, отображающий приложение
export const App = () => {
  // определяет методы
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // фоновый роутинг для модального окна
  const background: TStateLocation = location.state && location.state.background;

  // получение данных
  useEffect(() => {
    dispatch(getData());
    dispatch(authentication());
  }, [dispatch]);

  const closePopup = () => {
    navigate(-1);
  };

  // возвращает разметку, содержащую приложение
  return (
    <ErrorBoundary>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.app}>
          <AppHeader />
          <Routes location={background || location}>
            <Route path={home} element={<Home />} />
            <Route path={ingredientsId} element={<Ingredient />} />
            <Route
              path={login}
              element={<OnlyUnAuthorized onlyUnAuthorized={true} component={<Login />} />}
            />
            <Route
              path={profile}
              element={<OnlyAuthorized onlyUnAuthorized={false} component={<Profile />} />}
            >
              <Route
                path={profileOrder}
                element={<OnlyAuthorized onlyUnAuthorized={false} component={<ProfileOrders />} />}
              />
            </Route>
            <Route
              path={profileOrderId}
              element={<OnlyAuthorized onlyUnAuthorized={false} component={<ProfileOrderDetails />} />}
            />
            <Route
              path={register}
              element={<OnlyAuthorized onlyUnAuthorized={true} component={<Register />} />}
            />
            <Route
              path={forgotPassword}
              element={<OnlyAuthorized onlyUnAuthorized={true} component={<ForgotPassword />} />}
            />
            <Route
              path={resetPassword}
              element={<OnlyAuthorized onlyUnAuthorized={true} component={<ResetPassword />} />}
            />
            <Route path={orderFeed} element={<OrderFeed />} />
            <Route path={orderId} element={<OrderDetails />} />
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
              <Route
                path={orderId}
                element={
                  <Modal onClose={closePopup}>
                    <OrderInfo />
                  </Modal>
                }
              />
              <Route
                path={profileOrderId}
                element={
                  <Modal onClose={closePopup}>
                    <OrderInfo />
                  </Modal>
                }
              />
            </Routes>
          )}
        </div>
      </DndProvider>
    </ErrorBoundary>
  );
};
