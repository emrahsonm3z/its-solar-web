import flatten from "flat";

export default {
  en: flatten(require("./en.json")),
  tr: flatten(require("./tr.json")),
  de: flatten(require("./de.json"))
};
