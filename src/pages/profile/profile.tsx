import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { MouseEvent, SyntheticEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Outlet, useMatch, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import useForm from "../../hooks/useForm";
import { patchUserFetch, signOut } from "../../services/actions/user";
import { useAppSelector } from '../../services/types';
import { IProfileErrors } from '../../services/types/data';
import { login } from "../../utils/routes";
import styles from "./profile.module.css";

// определяет текста
const text = {
  profile: "Профиль",
  history: "История заказов",
  logout: "Выход",
  info: "В этом разделе вы можете изменить свои персональные данные",
  cancel: "Отмена",
  save: "Сохранить",
};

// функциональный компонент, отображающий страницу профиля
const Profile = () => {
  // определение методов
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // получает ссылки
  const inputNameRef = useRef(null);
  const inputEmailRef = useRef(null);
  const inputPasswordRef = useRef(null);

  // определение состояния, отвечающего за редактирование полей
  const [isNameEditing, setIsNameEditing] = useState(false);
  const [isEmailEditing, setIsEmailEditing] = useState(false);
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);

  // получение данных пользователя из глобального состояния
  const user = useAppSelector((state) => state.rootReducer.user.user);
  const userName: string = user ? user.name : "";
  const userEmail: string = user ? user.email : "";

  // определяет состояние ошибок валидации полей
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
  });

  // определяет состояние для отслеживания сохранённых данных
  const [isSaved, setIsSaved] = useState(false);

  // определяет состояние лоадера
  const [isLoading, setIsLoading] = useState(true);

  // использование хуков useForm для управления формой
  const { values, handleChange, setValues } = useForm({
    name: userName,
    email: userEmail,
    password: "",
  });

  const { name, email, password } = values;

  interface IClassActive {
    isActive: boolean;
  }

  // определение классов стилей для активных и неактивных ссылок
  const style = ({ isActive }: IClassActive) =>
    isActive
      ? `${styles.link} ${styles.active} text text_type_main-medium`
      : `${styles.link} text text_type_main-medium text_color_inactive`;

  // получение информации о текущем URL и соответствующих активных ссылках
  const profileLink = useMatch("/profile");
  const profileOrdersLink = useMatch("/profile/orders");

  // обработчик события для выхода из профиля
  const handleClickOut = () => {
    navigate(login, { replace: true });
    dispatch(signOut());
  };

  // проверяет валидность E-mail
  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // проверяет валидность формы
  const isFormValid = () => {
    return (
      (values.name.length >= 2 || values.name.trim() === "") &&
      (values.email.length >= 3 || values.email.trim() === "") &&
      (isValidEmail(values.email) || values.email.trim() === "") &&
      (values.password.length >= 6 || values.password.trim() === "")
    );
  };

  // обработчик события для отправки формы
  const handleClickSubmit = (event: MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!values.password || values.password.trim() === "") {
      setErrors((prevErrors) => ({ ...prevErrors, password: true }));
    } else if (isFormValid()) {
      dispatch(patchUserFetch(values));
      setIsSaved(true);
      setIsNameEditing(false);
      setIsEmailEditing(false);
      setIsPasswordEditing(false);
    } else {
      setErrors({
        name: values.name.length < 2,
        email: values.email.length < 3 || !isValidEmail(values.email),
        password: values.password.length < 6,
      });
    }
  };

  // обработчик события для отмены редактирования и возврата к исходным значениям
  const handleClickCancel = (event: SyntheticEvent<Element, Event>) => {
    event.preventDefault();
    setIsSaved(true);
    setIsNameEditing(false);
    setIsEmailEditing(false);
    setIsPasswordEditing(false);
    setErrors({
      name: false,
      email: false,
      password: false,
    });
    setValues({
      name: userName,
      email: userEmail,
      password: "",
    });
  };

  // обработчик потери фокуса поля ввода
  const handleBlur = (field: keyof IProfileErrors) => {
    if (!values[field] || !values[field].trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: true }));
    } else if (
      (field === "name" && values[field].length < 2) ||
      (field === "email" &&
        (values[field].length < 3 || !isValidEmail(values.email))) ||
      (field === "password" && values[field].length < 6)
    ) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: true }));
    }
  };

  // обработчик фокуса поля ввода
  const handleFocus = (field: keyof IProfileErrors) => {
    if (!values[field]) {
      setValues((prevValues) => ({ ...prevValues, [field]: "" }));
    }
    setErrors((prevErrors) => ({ ...prevErrors, [field]: false }));
  };

  // отображение кнопок "Сохранить" и "Отмена"
  const handleChangeInput =
    values.name !== userName ||
    values.email !== userEmail ||
    values.password !== "";

  // обновление состояния изменения информации профиля
  useEffect(() => {
    setIsSaved(false);
  }, [values.name, values.email, values.password]);

  useEffect(() => {
    // симуляция лоадера
    const loaderTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // очистка
    return () => clearTimeout(loaderTimeout);
  }, []);

  useEffect(() => {
    if (isNameEditing || isEmailEditing) {
      setIsPasswordEditing(true);
    } else {
      setIsPasswordEditing(false);
    }
  }, [isNameEditing, isEmailEditing]);

  // возвращает разметку, которая содержит страницу профиля
  return (
    <div className={styles.box}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={`${styles.navigation}`}>
            <nav className={`${styles.list} pb-5`}>
              <NavLink
                to={{ pathname: "/profile" }}
                className={style({ isActive: !!profileLink })}
              >
                {text.profile}
              </NavLink>
              <NavLink
                to={{ pathname: "/profile/orders" }}
                className={style({ isActive: !!profileOrdersLink })}
              >
                {text.history}
              </NavLink>
              <NavLink className={style({ isActive: false })} onClick={handleClickOut} to={{ pathname: "/login" }}>
                {text.logout}
              </NavLink>
            </nav>
            {!!profileLink && (
              <p className="text text_type_main-default text_color_inactive pt-15">
                {text.info}
              </p>
            )}
          </div>
          <Outlet />
          {!!profileLink && (
            <form className={styles.form} onSubmit={handleClickSubmit}>
              <fieldset className={`${styles.fieldset} pb-3`}>
                <Input
                  type={"text"}
                  placeholder={"Имя"}
                  onChange={handleChange}
                  onBlur={() => handleBlur("name")}
                  onFocus={() => handleFocus("name")}
                  icon={isNameEditing ? "CloseIcon" : "EditIcon"}
                  onIconClick={() => {
                    setIsSaved(true);
                    setIsNameEditing(!isNameEditing);
                    setErrors((prevErrors) => ({ ...prevErrors, name: false }));
                  }}
                  value={name || ""}
                  name={"name"}
                  ref={inputNameRef}
                  error={errors.name}
                  errorText={"Имя должно быть не менее 2 символов"}
                  size={"default"}
                  aria-label="Поле ввода имени"
                  disabled={!isNameEditing}
                />
                <Input
                  type={"email"}
                  placeholder={"Электронная почта"}
                  onChange={handleChange}
                  onBlur={() => handleBlur("email")}
                  onFocus={() => handleFocus("email")}
                  icon={isEmailEditing ? "CloseIcon" : "EditIcon"}
                  onIconClick={() => {
                    setIsSaved(true);
                    setIsEmailEditing(!isEmailEditing);
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      email: false,
                    }));
                  }}
                  value={email || ""}
                  name={"email"}
                  ref={inputEmailRef}
                  error={errors.email}
                  errorText={"Неверный формат E-mail"}
                  size={"default"}
                  aria-label="Поле ввода электронной почты"
                  disabled={!isEmailEditing}
                />

                <Input
                  type={"password"}
                  placeholder={"Пароль"}
                  onChange={handleChange}
                  onBlur={() => handleBlur("password")}
                  onFocus={() => handleFocus("password")}
                  icon={isPasswordEditing ? "CloseIcon" : "EditIcon"}
                  onIconClick={() => {
                    setIsSaved(true);
                    setIsPasswordEditing(!isPasswordEditing);
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      password: false,
                    }));
                  }}
                  value={password || ""}
                  name={"password"}
                  ref={inputPasswordRef}
                  error={errors.password}
                  errorText={"Пароль должен быть не менее 6 символов"}
                  size={"default"}
                  aria-label="Поле ввода пароля"
                  disabled={!isPasswordEditing}
                />
              </fieldset>
              {handleChangeInput && (
                <div className={`${styles.button} pt-3`}>
                  {isSaved ? null : (
                    <>
                      <Button
                        htmlType="button"
                        type="secondary"
                        size="medium"
                        onClick={handleClickCancel}
                        disabled={
                          !isNameEditing &&
                          !isEmailEditing &&
                          !isPasswordEditing
                        }
                      >
                        {text.cancel}
                      </Button>
                      <Button
                        htmlType="submit"
                        type="primary"
                        size="medium"
                        disabled={
                          !isNameEditing &&
                          !isEmailEditing &&
                          !isPasswordEditing
                        }
                      >
                        {text.save}
                      </Button>
                    </>
                  )}
                </div>
              )}
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default React.memo(Profile);
