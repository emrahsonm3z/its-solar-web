import { combineReducers } from "redux";

import reactTableReducer from "./routes/react-table/api/state";
// import mapReducer from "./routes/map/api/state";

export default combineReducers({
  reactTable: reactTableReducer
  // map: mapReducer
});
