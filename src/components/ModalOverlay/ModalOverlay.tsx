import React, { FC } from "react";
import styles from "./ModalOverlay.module.css";

interface IModalOverlayProps {
  onClose: () => void;
}

// функциональный компонент, отображающий область вокруг модального окна, кликнув на который - закрывается модальное окно
const ModalOverlay: FC<IModalOverlayProps> = ({ onClose }) => {
  // возвращает разметку, которая содержит тёмную область вокруг модального окна
  return <div className={styles.overlay} onClick={onClose}></div>;
};

export default React.memo(ModalOverlay);
