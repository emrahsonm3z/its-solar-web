import React from "react";
import { Route } from "react-router-dom";

import ReactTable from "./routes/react-table";

const Settings = ({ match }) => (
  <div>
    <Route path={`${match.url}/react-table`} component={ReactTable} />
  </div>
);

export default Settings;
