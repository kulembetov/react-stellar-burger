// проверяет ответ от сервера
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`${res.status}`));
};

// объект с настройками для запросов к серверу
const settings = {
  baseUrl: "https://norma.nomoreparties.space/api/ingredients",
  headers: {
    "Content-Type": "application/json",
  },
};

// получение данных с сервера
const getData = async () => {
  try {
    const response = await fetch(`${settings.baseUrl}`, {
      method: "GET",
      headers: settings.headers,
    });
    const data = await checkResponse(response);
    return data;
  } catch (error) {
    console.error(error);
    throw console.error("Произошла ошибка при получении данных с сервера");
  }
};

export { getData };
