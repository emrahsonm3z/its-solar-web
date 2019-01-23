import { LOCALE_SET, CHECK_LOCALE } from "./action";

export default function(state = { lang: "en" }, action = {}) {
  switch (action.type) {
    case LOCALE_SET:
    case CHECK_LOCALE:
      return {
        lang: action.lang
      };

    default:
      return state;
  }
}
