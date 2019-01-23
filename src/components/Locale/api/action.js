import { locale } from "lib/localeService";

export const LOCALE_SET = "LOCALE_SET";
export const CHECK_LOCALE = "CHECK_LOCALE";

export const setLocale = lang => {
  locale.setLocale(lang);

  return {
    type: LOCALE_SET,
    lang
  };
};

export const getLocale = () => {
  return locale.getLocale() ? locale.getLocale() : "en";
};

export const checkLocale = () => {
  return {
    type: CHECK_LOCALE,
    lang: getLocale()
  };
};
