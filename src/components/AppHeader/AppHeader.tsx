import {
  BurgerIcon,
  ListIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useRef, useState } from "react";
import { Link, NavLink, useMatch } from "react-router-dom";
import styles from "./AppHeader.module.css";

interface ISectionType {
  name: string;
  type: string;
  ref: React.RefObject<HTMLLIElement>;
}

// функциональный компонент, отображающий шапку приложения
const AppHeader = () => {
  // определяет текущую секцию, изначально выбранная секция - конструктор бургеров
  const [currentSection, setCurrentSection] = useState<string>("");

  // определяет секции
  const sections: { [key: string]: ISectionType } = {
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
    orderHistory: {
      name: "История заказов",
      type: "order-history",
      ref: useRef(null),
    },
    logOut: {
      name: "Выход",
      type: "log-out",
      ref: useRef(null),
    },
    profile: {
      name: "Личный кабинет",
      type: "profile",
      ref: useRef(null),
    },
  };

  // прокручивает страницу к выбранной секции
  const sectionRefs: { [key: string]: React.RefObject<HTMLElement> } = {
    [sections.burgerConstructor.type]: useRef(null),
    [sections.orderFeed.type]: useRef(null),
    [sections.profile.type]: useRef(null),
  };

  // определяет состояние выбранной секции и скроллит к ней
  const selectSection = (selectedSection: string) => {
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
  const orderFeedLink = useMatch("/feed");
  const profileLink = useMatch("/profile");
  const profileOrdersLink = useMatch("/profile/orders");
  const logOutLink = useMatch("/logout");

  // возвращает разметку, содержащую - логотип, навигацию по секции
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.menu}>
          <li
            className={`${styles.item} ${currentSection === sections.burgerConstructor.type
              ? `${styles.disabled}`
              : ""
              } pl-5 pr-5`}
            ref={sectionRefs[sections.burgerConstructor.type] as React.RefObject<HTMLLIElement>}
            onClick={() => selectSection(sections.burgerConstructor.type)}
          >
            <NavLink
              to="/"
              className={`${styles.link} ${currentSection === sections.burgerConstructor.type
                ? styles.disabled
                : ""
                }`}
            >
              {homeLink ? (
                <BurgerIcon type={"primary"} />
              ) : (
                <BurgerIcon type={"secondary"} />
              )}
              {homeLink ? (
                <p className="text text_type_main-default pl-2">
                  {sections.burgerConstructor.name}
                </p>
              ) : (
                <p className="text text_type_main-default pl-2 text_color_inactive">
                  {sections.burgerConstructor.name}
                </p>
              )}
            </NavLink>
          </li>
          <li
            className={`${styles.item} pl-5`}
            ref={sectionRefs[sections.orderFeed.type] as React.RefObject<HTMLLIElement>}
            onClick={() => selectSection(sections.orderFeed.type)}
          >
            <NavLink
              to="/feed"
              className={`${styles.link} ${currentSection === sections.orderFeed.type ? styles.disabled : ""
                }`}
            >
              {orderFeedLink ? (
                <ListIcon type="primary" />
              ) : (
                <ListIcon type="secondary" />
              )}
              {orderFeedLink ? (
                <p className="text text_type_main-default pl-2">
                  {sections.orderFeed.name}
                </p>
              ) : (
                <p className="text text_type_main-default pl-2 text_color_inactive">
                  {sections.orderFeed.name}
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
            className={`${styles.item} ${currentSection === sections.profile.type
              ? `${styles.disabled}`
              : ""
              } pl-5`}
            ref={sectionRefs[sections.profile.type] as React.RefObject<HTMLLIElement>}
            onClick={() => selectSection(sections.profile.type)}
          >
            <NavLink
              to="/profile"
              className={`${styles.link} ${currentSection ===
                (sections.profile.type || sections.orderHistory || sections.logOut)
                ? styles.disabled
                : ""
                }`}
            >
              {(profileLink || profileOrdersLink || logOutLink) ? (
                <ListIcon type={"primary"} />
              ) : (
                <ListIcon type={"secondary"} />
              )}
              {(profileLink || profileOrdersLink || logOutLink) ? (
                <p className="text text_type_main-default pl-2">
                  {sections.profile.name}
                </p>
              ) : (
                <p className="text text_type_main-default pl-2 text_color_inactive">
                  {sections.profile.name}
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
