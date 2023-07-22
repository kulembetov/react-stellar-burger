import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { home } from "../../utils/routes";

// функциональный компонент, который обеспечивает защиту маршрутов, доступных только авторизованным пользователям
const ProtectedRoute = ({ onlyUnAuthorized = false, component }) => {
  // определяет метод
  const location = useLocation();

  // получение данных пользователя из глобального состояния
  const user = useSelector((state) => state.rootReducer.user.user);

  // получение данных авторизации из глобального состояния
  const isAuthorizationChecked = useSelector(
    (state) => state.rootReducer.user.isAuthorizationChecked
  );

  // если проверка авторизации не завершена
  if (!isAuthorizationChecked) {
    return null;
  }

  // если маршрут доступен только для неавторизованных пользователей
  if (onlyUnAuthorized && user) {
    const { from } = location.state || { from: { pathname: home } };
    return <Navigate to={from} />;
  }

  // если маршрут доступен только для авторизованных пользователей
  if (!onlyUnAuthorized && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // отображает компонент, если пройдены все проверки
  return component;
};

export const OnlyAuthorized = ProtectedRoute;
export const OnlyUnAuthorized = ({ component }) => (
  <ProtectedRoute onlyUnAuthorized={true} component={component} />
);

export default React.memo(ProtectedRoute);
