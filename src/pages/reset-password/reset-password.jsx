import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { resetPasswordRequest } from "../../utils/api";
import { forgotPassword, login } from "../../utils/routes";
import styles from "./reset-password.module.css";

// функциональный компонент, отображающий страницу сброса пароля
const ResetPassword = () => {
  // определяет метод
  const navigate = useNavigate();

  // получает ссылки на элементы
  const passwordInputRef = useRef(null);
  const tokenInputRef = useRef(null);

  // управляет значениями полей
  const { values, handleChange } = useForm({ password: "", token: "" });

  const { password, token } = values;

  // определяет состояние видимости пароля
  const [isVisible, setVisible] = useState(false);

  // определяет состояние ошибок валидации полей
  const [errors, setErrors] = useState({
    password: false,
    token: false,
  });

  // проверяет валидность формы
  const isFormValid = () => {
    return password.length >= 6 && token.length >= 2;
  };

  // сброс пароля
  const postPassword = () => {
    return resetPasswordRequest(values)
      .then((res) => {
        values.password = res;
        values.token = res;
        localStorage.removeItem("email");
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  };

  // обработчик события для перехода на страницу авторизации
  const handleLoginClick = () => {
    navigate(login, { replace: true });
  };

  // обработчик события для отправки формы
  const handleClickSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      postPassword();
      navigate(login, { replace: true });
    } else {
      setErrors({
        password: password.trim().length < 6,
        token: token.length === 0,
      });
    }
  };

  // обработчик потери фокуса поля ввода
  const handleBlur = (field) => {
    if (!values[field].trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: true }));
    } else if (
      (field === "password" && values[field].length < 6) ||
      (field === "token" && values[field].length < 2)
    ) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: true }));
    }
  };

  // обработчик фокуса поля ввода
  const handleFocus = (field) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: false }));
  };

  // если в локальном хранилище отсутствует E-mail, перенаправляет на страницу восстановления пароля
  if (!localStorage.getItem("email")) {
    return <Navigate to={forgotPassword} replace={true} />;
  }

  // возвращает разметку, которая содержит страницу сброса пароля
  return (
    <div className={styles.box}>
      <form className={styles.form} onSubmit={handleClickSubmit}>
        <h2 className={`${styles.title} text text_type_main-medium pb-3`}>
          Восстановление пароля
        </h2>
        <fieldset className={`${styles.input_items} pb-3 pt-3`}>
          <Input
            type={isVisible ? "text" : "password"}
            placeholder={"Введите новый пароль"}
            onChange={handleChange}
            onBlur={() => handleBlur("password")}
            onFocus={() => handleFocus("password")}
            icon={isVisible ? "ShowIcon" : "HideIcon"}
            onIconClick={() => setVisible(!isVisible)}
            value={values.password}
            name={"password"}
            error={errors.password}
            ref={passwordInputRef}
            errorText={"Пароль должен быть не менее 6 символов"}
            size={"default"}
            aria-label="Поле ввода нового пароля"
          />
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={handleChange}
            onBlur={() => handleBlur("token")}
            onFocus={() => handleFocus("token")}
            value={values.token}
            name={"token"}
            error={errors.token}
            ref={tokenInputRef}
            errorText={"Поле не может быть пустым"}
            size={"default"}
            aria-label="Поле ввода кода из письма"
          />
        </fieldset>
        <div className={`${styles.button} pt-3 mb-15`}>
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      </form>
      <div className={`${styles.text}`}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?
        </p>
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          extraClass="pl-2 pr-2"
          onClick={handleLoginClick}
        >
          Войти
        </Button>
      </div>
    </div>
  );
};

export default React.memo(ResetPassword);
