import { Component } from 'react';
import styles from './ErrorBoundary.module.css';

// классовый компонент, который обрабатывает ошибки, возникающие в дочерних компонентах и отображает их
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // вызывается, когда происходит ошибка в дочернем компоненте
  componentDidCatch(error, errorInfo) {
    // выводит сообщение в консоль об ошибке и устанавливает состояние
    console.error('Ошибка:', error, errorInfo);
    this.setState({ hasError: true });
  }

  // проверяет, есть ли ошибка
  render() {
    if (this.state.hasError) {
      return (
        <h1 className={styles.message}>Произошла ошибка. Проверьте консоль.</h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
