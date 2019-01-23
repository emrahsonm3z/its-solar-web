import { LOCALE } from "config/env";

const APP_PERSIST_STORES_TYPES = ["localStorage", "sessionStorage"];

const setLocale = (
  value = "",
  toStorage = APP_PERSIST_STORES_TYPES[0],
  tokenKey = LOCALE
) => {
  // localStorage:
  if (toStorage === APP_PERSIST_STORES_TYPES[0]) {
    if (window && window.localStorage) {
      window.localStorage.setItem(tokenKey, value);
    }
  }
  // sessionStorage:
  if (toStorage === APP_PERSIST_STORES_TYPES[1]) {
    if (window && window.sessionStorage) {
      window.sessionStorage.setItem(tokenKey, value);
    }
  }
};

const getLocale = (
  fromStorage = APP_PERSIST_STORES_TYPES[0],
  tokenKey = LOCALE
) => {
  // localStorage:
  if (fromStorage === APP_PERSIST_STORES_TYPES[0]) {
    return (
      (window &&
        window.localStorage &&
        window.localStorage.getItem(tokenKey)) ||
      null
    );
  }
  // sessionStorage:
  if (fromStorage === APP_PERSIST_STORES_TYPES[1]) {
    return (
      (window &&
        window.sessionStorage &&
        window.sessionStorage.getItem(tokenKey)) ||
      null
    );
  }
  // default:
  return null;
};

export const locale = {
  setLocale,
  getLocale
};
