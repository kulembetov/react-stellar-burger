import { Component, ErrorInfo, ReactNode } from "react";
import styles from "./ErrorBoundary.module.css";

// пропсы компонента
interface IProps {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

// классовый компонент, который обрабатывает ошибки, возникающие в дочерних компонентах и отображает их
class ErrorBoundary extends Component<IProps, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  // вызывается, когда происходит ошибка в дочернем компоненте
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(
      "%cПроизошла ошибка. Информация об ошибке ниже.",
      "background: red; color: white; font-size: 18px; padding: 4px;"
    );
    console.error(error, errorInfo);
  }

  // проверяет, есть ли ошибка
  public render() {
    if (this.state.hasError) {
      return <h1 className={styles.message}>Произошла ошибка. Проверьте консоль.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
