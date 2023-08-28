import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC, useEffect } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import styles from "./Modal.module.css";

// получает корневой элемент для отображения модального окна
const modalsRoot: HTMLElement | null = document.getElementById("modals");

// пропсы компонента
interface IModalProps {
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
}

interface IKeyboardEvent {
  key: string;
}

// функциональный компонент, отображающий модальное окно
const Modal: FC<IModalProps> = ({ children, onClose, title }) => {
  // закрывает модальное окно при нажатии ESC
  useEffect(() => {
    const closeByEscape = (event: IKeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => {
      document.removeEventListener("keydown", closeByEscape);
    };
  }, [onClose]);

  // возвращает разметку, которая содержит кнопку закрытия, оверлей и отображаемый контент
  return modalsRoot && ReactDOM.createPortal(
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
            <CloseIcon type="primary" />
          </button>
        </div>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    modalsRoot
  );
};

export default React.memo(Modal);
