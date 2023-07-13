import { useState } from "react";

// хук для управления формой
const useForm = (inputValues) => {
  // определяет состояние значений полей
  const [values, setValues] = useState(inputValues);

  // обработчик изменений полей ввода
  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
};

export default useForm;
