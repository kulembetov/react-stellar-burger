import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { login, resetPassword } from "../../utils/routes";
import styles from "./forgot-password.module.css";
import { postMail } from "../../utils/api";

// функциональный компонент, отображающий страницу восстановления пароля
const ForgotPassword = () => {
  // определяет метод
  const navigate = useNavigate();

  // определяет состояние управления значениями полей
  const { values, handleChange } = useForm({ email: "" });

  const { email } = values;

  // определяет состояние ошибок валидации полей
  const [errors, setErrors] = useState({
    email: false,
  });

  // проверяет валидность E-mail
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return email.length >= 3 && emailRegex.test(email);
  };

  // проверяет валидность формы
  const isFormValid = () => {
    return email.length >= 3 && isValidEmail(email);
  };

  // обработчик события для перехода на страницу авторизации
  const handleLoginClick = () => {
    navigate(login, { replace: true });
  };

  // обработчик события для отправки формы
  const handleClickSubmit = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      postMailRequest();
      navigate(resetPassword, { replace: true });
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: email.length < 6 || !isValidEmail(email),
      }));
    }
  };

  // обработчик потери фокуса поля ввода
  const handleBlur = (field) => {
    if (!values[field].trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: true }));
    } else if (
      (field === "email" && values[field].length < 6) ||
      (field === "email" && !isValidEmail(values[field]))
    ) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: true }));
    }
  };

  // обработчик фокуса поля ввода
  const handleFocus = (field) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: false }));
  };

  // отправляет E-mail
  const postMailRequest = () => {
    return postMail(email)
      .then((res) => {
        values.email = res.email;
        localStorage.setItem("email", res.email);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  };

  // возвращает разметку, которая содержит страницу восстановления пароля
  return (
    <div className={styles.box}>
      <form className={styles.form} onSubmit={handleClickSubmit}>
        <h2 className={`${styles.title} text text_type_main-medium pb-3`}>
          Восстановление пароля
        </h2>
        <fieldset className={`${styles.fieldset} pb-3 pt-3`}>
          <EmailInput
            onChange={handleChange}
            onBlur={() => handleBlur("email")}
            onFocus={() => handleFocus("email")}
            value={email}
            name={"email"}
            isIcon={false}
            placeholder={"Укажите e-mail"}
            error={errors.email}
            errorText={"Неверный формат e-mail"}
            aria-label="Поле ввода электронной почты"
          />
        </fieldset>
        <div className={`${styles.button} pt-3 mb-15`}>
          <Button htmlType="submit" type="primary" size="medium">
            Восстановить
          </Button>
        </div>
      </form>
      <div className={`${styles.text}`}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?
        </p>
        <Button
          htmlType="submit"
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

export default React.memo(ForgotPassword);
