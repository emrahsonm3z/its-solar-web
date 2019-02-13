import { combineReducers } from "redux";

import chartReducers from "./routes/charts/reducers";
// import tableReducers from "./routes/table/reducers";
import privateLayoutReducer from "components/Layout/PrivateLayout/api/state";

export default combineReducers({
  charts: chartReducers,
  // tables: tableReducers,
  privateLayout: privateLayoutReducer
});
