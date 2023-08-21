import React from "react";
import styles from "./Loader.module.css";

// функциональный компонент, отображающий процесс загрузки
const Loader = () => {
  // возвращает разметку, которая содержит 4 блока, которые создают анимацию бегущих точек
  return (
    <div className={styles.loader}>
      <div className={styles.box}></div>
      <div className={styles.box}></div>
      <div className={styles.box}></div>
      <div className={styles.box}></div>
    </div>
  );
};

export default React.memo(Loader);
