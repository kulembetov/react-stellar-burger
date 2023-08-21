import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from '../../services/types';
import { home } from "../../utils/routes";

interface IProtectedProps {
  onlyUnAuthorized: boolean;
  component: JSX.Element;
}

// функциональный компонент, который обеспечивает защиту маршрутов, доступных только авторизованным пользователям
const ProtectedRoute = ({ onlyUnAuthorized = false, component }: IProtectedProps) => {
  // определяет метод
  const location = useLocation();

  // получение данных пользователя из глобального состояния
  const user = useAppSelector((state) => state.rootReducer.user.user);

  // получение данных авторизации из глобального состояния
  const isAuthorizationChecked = useAppSelector(
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
export const OnlyUnAuthorized = ({ component }: IProtectedProps) => (
  <ProtectedRoute onlyUnAuthorized={true} component={component} />
);

export default React.memo(ProtectedRoute);
