import React from "react";
import { Route } from "react-router-dom";

import ReactTable from "./routes/react-table";
import SyncFusionGrid from "./routes/syncfusion-grid";

const Settings = ({ match }) => (
  <div>
    <Route path={`${match.url}/react-table`} component={ReactTable} />
    <Route path={`${match.url}/syncfusion-grid`} component={SyncFusionGrid} />
  </div>
);

export default Settings;
