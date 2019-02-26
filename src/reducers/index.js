import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import userReducer from "../routes/user/api/state";
import localeReducer from "../components/Locale/api/state";
import settingsReducer from "routes/admin/routes/settings/reducers";

import mocksReducer from "../mocks/api/state";

const appReducers = {
  user: userReducer,
  locale: localeReducer,
  settings: settingsReducer,
  mocks: mocksReducer
};

// combine reducers -> createStore reducer
const reducers = combineReducers({
  ...appReducers,
  routing: routerReducer
});

export default reducers;
