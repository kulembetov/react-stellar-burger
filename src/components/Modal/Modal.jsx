import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay.jsx";
import styles from "./Modal.module.css";

// получает корневой элемент для отображения модального окна
const modalsRoot = document.getElementById("modals");

// функциональный компонент, отображающий модальное окно
const Modal = ({ children, onClose, title }) => {
  // закрывает модальное окно при нажатии ESC
  useEffect(() => {
    const closeByEscape = (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => {
      document.removeEventListener("keydown", closeByEscape);
    };
  }, [onClose]);

  // возвращает разметку, которая содержит кнопку закрытия, оверлей и отображаемый контент
  return ReactDOM.createPortal(
    <>
      <div className={`${styles.box} pt-5`}>
        <div className={`${styles.item} pt-5`}>
          <div className={styles.wrapper}>
            {title && (
              <h2 className={`${styles.title} text text_type_main-large`}>
                {title}
              </h2>
            )}
          </div>
          <button
            onClick={onClose}
            className={styles.close}
            aria-label="Закрытие модального окна"
          >
            <CloseIcon />
          </button>
        </div>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    modalsRoot
  );
};

// описывает типы пропсов, которые ожидает компонент
Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default React.memo(Modal);
