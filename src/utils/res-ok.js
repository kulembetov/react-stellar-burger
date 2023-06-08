// проверяет ответ от сервера
export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`${res.status}`));
};