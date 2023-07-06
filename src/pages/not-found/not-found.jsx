import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./not-found.module.css";

// определяет текст
const text = {
  code: 404,
  message: "Страница не найдена :(",
  button: "Вернуться",
};

// функциональный компонент, отображающий несуществующую страницу
const NotFound = () => {
  // получение метода
  const navigate = useNavigate();

  // обработка клика для возврата на главную страницу
  const handleHomeClick = () => {
    navigate("/");
  };

  // возвращение разметки, содержащую несуществующую страницу
  return (
    <div className={styles.box}>
      <div className={"mt-10 mb-10 " + styles.wrapper}>
        <h2 className="text text_type_main-large mb-5">{text.code}</h2>
        <p
          className={
            "text text_type_main-default text_color_primary " + styles.text
          }
        >
          {text.message}
        </p>
      </div>
      <Button type="primary" onClick={handleHomeClick}>
        {text.button}
      </Button>
    </div>
  );
};

export default React.memo(NotFound);
