import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { signIn } from "../../services/actions/actions";
import { forgotPassword, register } from "../../utils/routes";
import styles from "./login.module.css";

// определяет текст
const text = {
  title: "Вход",
  login: "Войти",
  register: "Зарегистрироваться",
  forgot: "Забыли пароль?",
  restore: "Восстановить пароль",
  user: "Вы - новый пользователь?",
};

// функциональный компонент, отображающий страницу авторизации
const Login = () => {
  // получает метод
  const dispatch = useDispatch();

  // получает ссылки на элемент ввода
  const inputRef = useRef(null);

  // управляет значениями полей
  const { values, handleChange } = useForm({ email: "", password: "" });

  // определяет состояние видимости пароля
  const [isVisible, setVisible] = useState(false);

  // определяет состояние ошибок валидации полей
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  // проверяет валидность E-mail
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // проверяет валидность формы
  const isFormValid = () => {
    return (
      values.email.length >= 3 &&
      isValidEmail(values.email) &&
      values.password.length >= 6
    );
  };

  // обработчик события для отправки формы
  const handleClickSubmit = (evt) => {
    evt.preventDefault();
    if (isFormValid()) {
      dispatch(signIn(values));
    } else {
      setErrors({
        email: values.email.length < 6 || !isValidEmail(values.email),
        password: values.password.length < 6,
      });
    }
  };

  // обработчик потери фокуса поля ввода
  const handleBlur = (field) => {
    if (!values[field].trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: true }));
    } else if (
      (field === "email" && !isValidEmail(values.email)) ||
      (field === "password" && values.password.length === 0)
    ) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: true }));
    }
  };

  // обработчик фокуса поля ввода
  const handleFocus = (field) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: false }));
  };

  // возвращает разметку, которая содержит страницу авторизации
  return (
    <div className={styles.box}>
      <form className={styles.form} onSubmit={handleClickSubmit}>
        <h2 className={`${styles.title} text text_type_main-medium pb-3`}>
          {text.title}
        </h2>
        <fieldset className={`${styles.fieldset} pb-3 pt-3`}>
          <EmailInput
            onChange={handleChange}
            onBlur={() => handleBlur("email")}
            onFocus={() => handleFocus("email")}
            value={values.email}
            name={"email"}
            isIcon={false}
            placeholder={"E-mail"}
            error={errors.email}
            errorText={"Неверный формат E-mail"}
            aria-label="Поле ввода электронной почты"
          />
          <Input
            type={isVisible ? "text" : "password"}
            placeholder={"Пароль"}
            onChange={handleChange}
            onBlur={() => handleBlur("password")}
            onFocus={() => handleFocus("password")}
            icon={isVisible ? "ShowIcon" : "HideIcon"}
            value={values.password}
            name={"password"}
            ref={inputRef}
            onIconClick={() => setVisible(!isVisible)}
            error={errors.password}
            errorText={"Поле не может быть пустым"}
            size={"default"}
            aria-label="Поле ввода пароля"
          />
        </fieldset>
        <div className={`${styles.button} pt-3 mb-15`}>
          <Button htmlType="submit" type="primary" size="medium">
            {text.login}
          </Button>
        </div>
      </form>
      <div className={`${styles.text} pt-5`}>
        <p className="text text_type_main-default text_color_inactive">
          {text.user}
        </p>
        <p className="text text_type_main-default text_color_inactive">
          <Link className={styles.link} to={register}>
            {text.register}
          </Link>
        </p>
      </div>
      <div className={`${styles.text}`}>
        <p className="text text_type_main-default text_color_inactive">
          {text.forgot}
        </p>
        <p className="text text_type_main-default text_color_inactive">
          <Link className={styles.link} to={forgotPassword}>
            {text.restore}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default React.memo(Login);
