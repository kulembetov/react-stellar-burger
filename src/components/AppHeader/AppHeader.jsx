import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, useState } from "react";
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

  // возвращает разметку, содержащую - логотип, навигацию по секции
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <nav className="pb-4 pt-4">
        <ul className={`${styles.list} pb-4 pt-4`}>
          <li
            className={`${styles.item} ${
              currentSection === section.burgerConstructor.type
                ? `${styles.disabled}`
                : ""
            } pl-5 pr-5`}
            ref={sectionRefs[section.burgerConstructor.type]}
            onClick={() => selectSection(section.burgerConstructor.type)}
          >
            <BurgerIcon
              type={
                currentSection === section.burgerConstructor.type
                  ? "primary"
                  : "secondary"
              }
            />
            <p
              className={
                currentSection === section.burgerConstructor.type
                  ? "text text_type_main-default pl-2"
                  : "text text_type_main-default pl-2 text_color_inactive"
              }
            >
              {section.burgerConstructor.name}
            </p>
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
            <ListIcon
              type={
                currentSection === section.orderFeed.type
                  ? "primary"
                  : "secondary"
              }
            />
            <p
              className={
                currentSection === section.orderFeed.type
                  ? "text text_type_main-default pl-2"
                  : "text text_type_main-default pl-2 text_color_inactive"
              }
            >
              {section.orderFeed.name}
            </p>
          </li>
          <li
            className={`${styles.item} ${
              currentSection === section.profile.type
                ? `${styles.disabled}`
                : ""
            } pl-5`}
            ref={sectionRefs[section.profile.type]}
            onClick={() => selectSection(section.profile.type)}
          >
            <ProfileIcon
              type={
                currentSection === section.profile.type
                  ? "primary"
                  : "secondary"
              }
            />
            <p
              className={
                currentSection === section.profile.type
                  ? "text text_type_main-default pl-2 pr-5"
                  : "text text_type_main-default pl-2 pr-5 text_color_inactive"
              }
            >
              {section.profile.name}
            </p>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
