import decode from "jwt-decode";
import { isAfter } from "date-fns";

import { AUTH_TOKEN_KEY, USER_INFO } from "config/env";

const APP_PERSIST_STORES_TYPES = ["localStorage", "sessionStorage"];

const parse = JSON.parse;
const stringify = JSON.stringify;

const setToken = (
  value = "",
  toStorage = APP_PERSIST_STORES_TYPES[0],
  tokenKey = AUTH_TOKEN_KEY
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

const getToken = (
  fromStorage = APP_PERSIST_STORES_TYPES[0],
  tokenKey = AUTH_TOKEN_KEY
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

const clearToken = (
  storage = APP_PERSIST_STORES_TYPES[0],
  tokenKey = AUTH_TOKEN_KEY
) => {
  // localStorage:
  if (window && window.localStorage && window.localStorage[tokenKey]) {
    window.localStorage.removeItem(tokenKey);
    return true;
  }
  // sessionStorage:
  if (window && window.sessionStorage && window.sessionStorage[tokenKey]) {
    window.sessionStorage.removeItem(tokenKey);
    return true;
  }

  return false;
};

const getTokenExpirationDate = encodedToken => {
  if (!encodedToken) {
    return new Date(0); // is expired
  }

  const token = decode(encodedToken);
  if (!token.exp) {
    return new Date(0); // is expired
  }
  const expirationDate = new Date(token.exp * 1000);
  return expirationDate;
};

const isExpiredToken = encodedToken => {
  const expirationDate = this.getTokenExpirationDate(encodedToken);
  const rightNow = new Date();
  const isExpiredToken = isAfter(rightNow, expirationDate);

  return isExpiredToken;
};

const isAuthenticated = (
  fromStorage = APP_PERSIST_STORES_TYPES[0],
  tokenKey = AUTH_TOKEN_KEY
) => {
  // localStorage:
  if (fromStorage === APP_PERSIST_STORES_TYPES[0]) {
    if (
      window &&
      window.localStorage &&
      window.localStorage.getItem(tokenKey)
    ) {
      return true;
    } else {
      return false;
    }
  }
  // sessionStorage:
  if (fromStorage === APP_PERSIST_STORES_TYPES[1]) {
    if (
      window &&
      window.sessionStorage &&
      window.sessionStorage.getItem(tokenKey)
    ) {
      return true;
    } else {
      return false;
    }
  }
  // default:
  return false;
};

const getUserInfo = (
  fromStorage = APP_PERSIST_STORES_TYPES[0],
  userInfoKey = USER_INFO
) => {
  if (!window) {
    return "";
  }

  // localStorage:
  if (fromStorage === APP_PERSIST_STORES_TYPES[0]) {
    return (
      (window &&
        window.localStorage &&
        parse(window.localStorage.getItem(userInfoKey))) ||
      null
    );
  }
  // sessionStorage:
  if (fromStorage === APP_PERSIST_STORES_TYPES[1]) {
    return (
      (window &&
        window.sessionStorage &&
        parse(window.sessionStorage.getItem(userInfoKey))) ||
      null
    );
  }
  // default:
  return null;
};

const setUserInfo = (
  value,
  toStorage = APP_PERSIST_STORES_TYPES[0],
  userInfoKey = USER_INFO
) => {
  if (!value) {
    return;
  }
  // localStorage:
  if (toStorage === APP_PERSIST_STORES_TYPES[0]) {
    if (window && window.localStorage) {
      window.localStorage.setItem(userInfoKey, stringify(value));
    }
  }
  // sessionStorage:
  if (toStorage === APP_PERSIST_STORES_TYPES[1]) {
    if (window && window.sessionStorage) {
      window.sessionStorage.setItem(userInfoKey, stringify(value));
    }
  }
};

const clearUserInfo = (userInfoKey = USER_INFO) => {
  // localStorage:
  if (window && window.localStorage && window.localStorage[userInfoKey]) {
    window.localStorage.removeItem(userInfoKey);
  }
  // sessionStorage:
  if (window && window.sessionStorage && window.sessionStorage[userInfoKey]) {
    window.sessionStorage.removeItem(userInfoKey);
  }
};

const clearAllAppStorage = () => {
  if (window && window.localStorage) {
    window.localStorage.clear();
  }
  if (window && window.sessionStorage) {
    window.sessionStorage.clear();
  }
};

export const auth = {
  setToken,
  getToken,
  clearToken,
  getTokenExpirationDate,
  isExpiredToken,
  isAuthenticated,
  getUserInfo,
  setUserInfo,
  clearUserInfo,
  clearAllAppStorage
};
