import PropTypes from "prop-types";
import React from "react";
import styles from "./ModalOverlay.module.css";

// функциональный компонент, отображающий область вокруг модального окна, кликнув на который - закрывается модальное окно
const ModalOverlay = ({ onClose }) => {
  // возвращает разметку, которая содержит тёмную область вокруг модального окна
  return <div className={styles.overlay} onClick={onClose}></div>;
};

// описывает типы пропсов, которые ожидает компонент
ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default React.memo(ModalOverlay);
