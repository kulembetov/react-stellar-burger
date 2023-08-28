interface ICookieOptions {
  expires?: Date;
  path?: string;
  domain?: string;
  secure?: boolean;
}

// получает куки
export const getCookie = (name: string): string | undefined => {
  const encodedName = encodeURIComponent(name);
  const cookies = document.cookie.split(";").map((cookie) => cookie.trim());

  for (const cookie of cookies) {
    if (cookie.startsWith(encodedName + "=")) {
      const encodedValue = cookie.substring(encodedName.length + 1);
      return decodeURIComponent(encodedValue);
    }
  }

  return undefined;
};

// устанавливает куки
export const setCookie = (
  name: string,
  value: string,
  options: ICookieOptions = {}
): void => {
  const { expires, path, domain, secure } = options;

  let cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  if (expires instanceof Date) {
    cookie += "; expires=" + expires.toUTCString();
  }

  if (path) {
    cookie += "; path=" + path;
  }

  if (domain) {
    cookie += "; domain=" + domain;
  }

  if (secure) {
    cookie += "; secure";
  }

  document.cookie = cookie;
};

// удаляет куки
export const deleteCookie = (
  name: string,
  options: ICookieOptions = {}
): void => {
  const { path, domain } = options;
  const deletionOptions = { expires: new Date(0), path, domain };
  setCookie(name, "", deletionOptions);
};
