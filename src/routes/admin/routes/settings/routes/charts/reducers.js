import { combineReducers } from "redux";

import gaugeReducer from "./routes/gauge/api/state";
// import mapReducer from "./routes/map/api/state";

export default combineReducers({
  gauge: gaugeReducer
  // map: mapReducer
});
