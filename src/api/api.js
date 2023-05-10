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
const getData = () => fetch(`${settings.baseUrl}`).then(checkResponse);

export { getData };
