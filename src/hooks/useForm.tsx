import { SyntheticEvent, useState } from "react";

// хук для управления формой
const useForm = <T extends { [key: string]: string | number }>(inputValues: T) => {
  // определяет состояние значений полей
  const [values, setValues] = useState<T>(inputValues);

  // обработчик изменений полей ввода
  const handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const { value, name } = event.target as HTMLInputElement;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
};

export default useForm;
