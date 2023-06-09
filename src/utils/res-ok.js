// проверяет ответ от сервера
export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

// проверяет ответ от сервера на успешный запрос
export const checkSuccess = (res) => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Ответ сервера: ${res}`);
};