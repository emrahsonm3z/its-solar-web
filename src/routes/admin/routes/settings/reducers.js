import { combineReducers } from "redux";

import chartReducers from "./routes/charts/reducers";
import privateLayoutReducer from "components/Layout/PrivateLayout/api/state";

export default combineReducers({
  charts: chartReducers,
  privateLayout: privateLayoutReducer
});
