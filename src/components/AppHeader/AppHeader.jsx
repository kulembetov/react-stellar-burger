import {
  BurgerIcon,
  ListIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useRef, useState } from "react";
import { Link, NavLink, useMatch } from "react-router-dom";
import styles from "./AppHeader.module.css";

// функциональный компонент, отображающий шапку приложения
const AppHeader = () => {
  // определяет текущую секцию, изначально выбранная секция - конструктор бургеров
  const [currentSection, setCurrentSection] = useState("burger-constructor");

  // определяет секции
  const section = {
    burgerConstructor: {
      name: "Конструктор",
      type: "burger-constructor",
      ref: useRef(null),
    },
    orderFeed: {
      name: "Лента заказов",
      type: "order-feed",
      ref: useRef(null),
    },
    profile: {
      name: "Личный кабинет",
      type: "profile",
      ref: useRef(null),
    },
  };

  // прокручивает страницу к выбранной секции
  const sectionRefs = {
    [section.burgerConstructor.type]: useRef(null),
    [section.orderFeed.type]: useRef(null),
    [section.profile.type]: useRef(null),
  };

  // определяет состояние выбранной секции и скроллит к ней
  const selectSection = (selectedSection) => {
    if (currentSection === selectedSection) {
      return;
    }
    setCurrentSection(selectedSection);
    const selectedSectionItem = sectionRefs[selectedSection].current;
    if (selectedSectionItem) {
      selectedSectionItem.scrollIntoView({ behavior: "smooth" });
    }
  };

  // возвращает данные соответствия о маршруте по заданному пути относительно текущего местоположения.
  const homeLink = useMatch("/");
  const profileLink = useMatch("/profile");
  const orderFeedLink = useMatch("/orders");

  // возвращает разметку, содержащую - логотип, навигацию по секции
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.menu}>
          <li
            className={`${styles.item} ${
              currentSection === section.burgerConstructor.type
                ? `${styles.disabled}`
                : ""
            } pl-5 pr-5`}
            ref={sectionRefs[section.burgerConstructor.type]}
            onClick={() => selectSection(section.burgerConstructor.type)}
          >
            <NavLink to="/" className={styles.link}>
              {homeLink ? (
                <BurgerIcon type={"primary"} />
              ) : (
                <BurgerIcon type={"secondary"} />
              )}
              {homeLink ? (
                <p className="text text_type_main-default pl-2">
                  {section.burgerConstructor.name}
                </p>
              ) : (
                <p className="text text_type_main-default pl-2 text_color_inactive">
                  {section.burgerConstructor.name}
                </p>
              )}
            </NavLink>
          </li>
          <li
            className={`${styles.item} ${
              currentSection === section.orderFeed.type
                ? `${styles.disabled}`
                : ""
            } pl-5`}
            ref={sectionRefs[section.orderFeed.type]}
            onClick={() => selectSection(section.orderFeed.type)}
          >
            <NavLink to="/orders" className={styles.link}>
              {orderFeedLink ? (
                <ListIcon type={"primary"} />
              ) : (
                <ListIcon type={"secondary"} />
              )}
              {orderFeedLink ? (
                <p className="text text_type_main-default pl-2">
                  {section.orderFeed.name}
                </p>
              ) : (
                <p className="text text_type_main-default pl-2 text_color_inactive">
                  {section.orderFeed.name}
                </p>
              )}
            </NavLink>
          </li>
        </ul>
        <Link className={styles.logo} to="/">
          <Logo />
        </Link>
        <ul className={styles.menu_right}>
          <li
            className={`${styles.item} ${
              currentSection === section.profile.type
                ? `${styles.disabled}`
                : ""
            } pl-5`}
            ref={sectionRefs[section.profile.type]}
            onClick={() => selectSection(section.profile.type)}
          >
            <NavLink to="/profile" className={styles.link}>
              {profileLink ? (
                <ListIcon type={"primary"} />
              ) : (
                <ListIcon type={"secondary"} />
              )}
              {profileLink ? (
                <p className="text text_type_main-default pl-2">
                  {section.profile.name}
                </p>
              ) : (
                <p className="text text_type_main-default pl-2 text_color_inactive">
                  {section.profile.name}
                </p>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default React.memo(AppHeader);
