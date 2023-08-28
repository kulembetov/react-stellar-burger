import {
  Button,
  Input
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { MouseEvent, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { register } from "../../services/actions/user";
import { IRegisterErrors } from '../../services/types/data';
import { login } from "../../utils/routes";
import styles from "./register.module.css";

// определяет текст
const text = {
  title: "Регистрация",
  register: "Зарегистрироваться",
  login: "Войти",
  already: "Уже зарегистрированы?",
  restore: "Восстановить пароль",
};

// функциональный компонент, отображающий страницу регистрации
const Register = () => {
  // определяет методы
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // получает ссылки на элемент ввода
  const inputNameRef = useRef(null);
  const inputPasswordRef = useRef(null);

  // управляет значениями полей
  const { values, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = values;

  // определяет состояние видимости пароля
  const [isVisible, setVisible] = useState(false);

  const initialErrors: IRegisterErrors = {
    name: false,
    email: false,
    password: false,
  };

  // определяет состояние ошибок валидации полей
  const [errors, setErrors] = useState<IRegisterErrors>(initialErrors);

  // проверяет валидность E-mail
  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // проверяет валидность формы
  const isFormValid = () => {
    return (
      name.length >= 2 &&
      email.length >= 3 &&
      isValidEmail(email) &&
      password.length >= 6
    );
  };

  // обработчик события для перехода на страницу авторизации
  const handleClickLogin = () => {
    navigate(login, { replace: true });
  };

  // обработчик события для отправки формы
  const handleClickSubmit = (event: MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isFormValid()) {
      dispatch(register(values));
    } else {
      setErrors({
        name: name.length < 2,
        email: email.length < 6 || !isValidEmail(email),
        password: password.length < 6,
      });
    }
  };

  // обработчик потери фокуса поля ввода
  const handleBlur = (field: keyof IRegisterErrors) => {
    if (!values[field].trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: true }));
    } else if (
      (field === "password" && values[field].length < 6) ||
      (field === "name" && values[field].length < 2) ||
      (field === "email" && values[field].length < 6 && !isValidEmail(email))
    ) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: true }));
    }
  };

  // обработчик фокуса поля ввода
  const handleFocus = (field: keyof IRegisterErrors) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: false }));
  };

  // возвращает разметку, которая содержит страницу регистрации
  return (
    <div className={styles.box}>
      <h2 className={`${styles.title} text text_type_main-medium pb-3`}>
        {text.title}
      </h2>
      <form className={styles.form} onSubmit={handleClickSubmit}>
        <fieldset className={`${styles.fieldset} pb-3 pt-3`}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={handleChange}
            onBlur={() => handleBlur("name")}
            onFocus={() => handleFocus("name")}
            value={name || ""}
            name={"name"}
            ref={inputNameRef}
            error={errors.name}
            errorText={"Имя должно быть не менее 2 символов"}
            size={"default"}
            aria-label="Поле ввода имени"
          />
          <Input
            onChange={handleChange}
            onBlur={() => handleBlur("email")}
            onFocus={() => handleFocus("email")}
            value={email || ""}
            name={"email"}
            placeholder="E-mail"
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
            value={password || ""}
            name={"password"}
            ref={inputPasswordRef}
            onIconClick={() => setVisible(!isVisible)}
            error={errors.password}
            errorText={"Пароль должен быть не менее 6 символов"}
            size={"default"}
            aria-label="Поле ввода пароля"
          />
        </fieldset>
        <div className={`${styles.button} pt-3 mb-15`}>
          <Button htmlType="submit" type="primary" size="medium">
            {text.register}
          </Button>
        </div>
      </form>
      <div className={`${styles.text} pt-5`}>
        <p className="text text_type_main-default text_color_inactive">
          {text.already}
        </p>
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          onClick={handleClickLogin}
          extraClass="pl-2 pr-2"
        >
          {text.login}
        </Button>
      </div>
    </div>
  );
};

export default React.memo(Register);
