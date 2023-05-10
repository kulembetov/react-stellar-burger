import { useCallback, useState } from "react";

// кастомный хук, отслеживающий состояние модального окна
const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // открывает модальное окно
  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  // закрывает модальное окно
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};

export default useModal;
