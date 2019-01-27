import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import userReducer from "../routes/user/api/state";
import localeReducer from "../components/Locale/api/state";
import settingsReducer from "routes/admin/routes/settings/reducers";

const appReducers = {
  user: userReducer,
  locale: localeReducer,
  settings: settingsReducer
};

// combine reducers -> createStore reducer
const reducers = combineReducers({
  ...appReducers,
  routing: routerReducer
});

export default reducers;
