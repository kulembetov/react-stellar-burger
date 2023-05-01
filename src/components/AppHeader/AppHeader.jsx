import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <nav className='pb-4 pt-4'>
        <ul className={`${styles.list} pb-4 pt-4`}>
          <li className={`${styles.item} pl-5 pr-5`}>
            <a className={styles.link} href='#burger-constructor'>
              <BurgerIcon type='primary' />
              <p className='text text_type_main-default pl-2'>Конструктор</p>
            </a>
          </li>
          <li className={`${styles.item} pl-5`}>
            <a className={styles.link} href='#order-feed'>
              <ListIcon type='secondary' />
              <p className='text text_type_main-default text_color_inactive pl-2'>
                Лента заказов
              </p>
            </a>
          </li>
          <li className={styles.item}>
            <a className={styles.link} href='#profile'>
              <ProfileIcon type='primary' />
              <p className='text text_type_main-default text_color_inactive pl-2 pr-5'>
                Личный кабинет
              </p>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
