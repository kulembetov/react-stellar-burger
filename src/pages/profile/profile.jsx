import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useMatch, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import useForm from "../../hooks/useForm";
import { patchUserFetch, signOut } from "../../services/actions/actions";
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
  const user = useSelector((state) => state.rootReducer.user.user);

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
    name: user.name,
    email: user.email,
    password: user.password,
  });

  const { name, email, password } = values;

  // определение классов стилей для активных и неактивных ссылок
  const style = ({ isActive }) =>
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
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // проверяет валидность формы
  const isFormValid = () => {
    return (
      values.name.length >= 2 ||
      values.email.length >= 3 ||
      isValidEmail(values.email) ||
      values.password.length >= 6
    );
  };

  // обработчик события для отправки формы
  const handleClickSubmit = (evt) => {
    evt.preventDefault();
    if (isFormValid()) {
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
  const handleClickCancel = (e) => {
    e.preventDefault();
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
      name: user.name,
      email: user.email,
      password: user.password,
    });
  };

  // обработчик потери фокуса поля ввода
  const handleBlur = (field) => {
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
  const handleFocus = (field) => {
    if (!values[field]) {
      setValues((prevValues) => ({ ...prevValues, [field]: "" }));
    }
    setErrors((prevErrors) => ({ ...prevErrors, [field]: false }));
  };

  // отображение кнопок "Сохранить" и "Отмена"
  const handleChangeInput =
    values.name !== user.name ||
    values.email !== user.email ||
    values.password !== user.password;

  // обновление состояния изменения информации профиля
  useEffect(() => {
    setIsSaved(false);
  }, [values.name, values.email, values.password]);

  // загрузка данных, если они есть в localStorage
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setValues({
        name: savedUser.name,
        email: savedUser.email,
        password: savedUser.password,
      });
    }
  }, [setValues]);

  useEffect(() => {
    // Simulate the loader for 3 seconds
    const loaderTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(loaderTimeout);
  }, []);

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
                className={style({ isActive: profileLink })}
              >
                {text.profile}
              </NavLink>
              <NavLink
                to={{ pathname: "/profile/orders" }}
                className={style({ isActive: profileOrdersLink })}
              >
                {text.history}
              </NavLink>
              <NavLink className={style(false)} onClick={handleClickOut}>
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
