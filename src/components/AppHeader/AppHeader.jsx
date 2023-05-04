import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef, useState } from 'react';
import styles from './AppHeader.module.css';

// функциональный компонент, отображающий шапку приложения
const AppHeader = () => {
  // определяет текущую секцию, изначально выбранная секция - конструктор бургеров
  const [currentSection, setCurrentSection] = useState('burger-constructor');

  // прокручивает страницу к выбранной секции
  const sectionRefs = {
    'burger-constructor': useRef(null),
    'order-feed': useRef(null),
    profile: useRef(null),
  };

  // устанавливает текущую выбранную секцию и прокручивает страницу к этой категории.
  const selectSection = (selectedSection) => {
    setCurrentSection(selectedSection);
    const selectedSectionItem = sectionRefs[selectedSection].current;
    if (selectedSectionItem) {
      selectedSectionItem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // возвращает разметку, содержащую - логотип, навигацию по секции
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <nav className='pb-4 pt-4'>
        <ul className={`${styles.list} pb-4 pt-4`}>
          <li
            className={`${styles.item} pl-5 pr-5`}
            id='burger-constructor'
            ref={sectionRefs['burger-constructor']}
            onClick={() => selectSection('burger-constructor')}
          >
            <BurgerIcon
              type={
                currentSection === 'burger-constructor'
                  ? 'primary'
                  : 'secondary'
              }
            />
            <p
              className={
                currentSection === 'burger-constructor'
                  ? 'text text_type_main-default pl-2'
                  : 'text text_type_main-default pl-2 text_color_inactive'
              }
            >
              Конструктор
            </p>
          </li>
          <li
            className={`${styles.item} pl-5`}
            id='order-feed'
            ref={sectionRefs['order-feed']}
            onClick={() => selectSection('order-feed')}
          >
            <ListIcon
              type={currentSection === 'order-feed' ? 'primary' : 'secondary'}
            />
            <p
              className={
                currentSection === 'order-feed'
                  ? 'text text_type_main-default pl-2'
                  : 'text text_type_main-default pl-2 text_color_inactive'
              }
            >
              Лента заказов
            </p>
          </li>
          <li
            className={styles.item}
            id='profile'
            ref={sectionRefs['profile']}
            onClick={() => selectSection('profile')}
          >
            <ProfileIcon
              type={currentSection === 'profile' ? 'primary' : 'secondary'}
            />
            <p
              className={
                currentSection === 'profile'
                  ? 'text text_type_main-default pl-2 pr-5'
                  : 'text text_type_main-default pl-2 pr-5 text_color_inactive'
              }
            >
              Личный кабинет
            </p>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
