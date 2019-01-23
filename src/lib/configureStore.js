import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { routerMiddleware } from "react-router-redux";

import { createLogger } from "redux-logger";
//  import createHistory from hashHistory or BrowserHistory:
import createHistory from "history/createBrowserHistory";
import { composeWithDevTools } from "redux-devtools-extension";

import reducers from "../reducers";

import { isDev } from "config/env";
// #endregion

let histo = null;
if (isDev) {
  histo = createHistory();
} else {
  if (typeof document !== "undefined") {
    const createBrowserHistory = require("history/createBrowserHistory")
      .default;
    histo = createBrowserHistory();
  }
}

export const history = histo;

let loggerMiddleware = null;
if (isDev) {
  loggerMiddleware = createLogger({
    level: "info",
    collapsed: true
  });
}
// createStore : enhancer
// NOTE: use now https://github.com/zalmoxisus/redux-devtools-extension#redux-devtools-extension
const enhancer = composeWithDevTools(
  applyMiddleware(thunkMiddleware, routerMiddleware(history), loggerMiddleware)
);

// export default = "redux store"
export default function configureStore(initialState: any) {
  const store = createStore(reducers, initialState, enhancer);

  if (isDev)
    if (module.hot) {
      module.hot.accept("../reducers", () =>
        store.replaceReducer(require("../reducers").default)
      );
    }

  return store;
}
