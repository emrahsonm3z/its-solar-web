import React from "react";
import { Route } from "react-router-dom";

import ReactTable from "./routes/react-table";
import SyncFusionGrid from "./routes/syncfusion-grid/container/InverterTable";
import SyncFusionGridByLocation from "./routes/syncfusion-grid/container/InverterTableByLocation";

const Settings = ({ match }) => (
  <div>
    <Route path={`${match.url}/react-table`} component={ReactTable} />
    <Route path={`${match.url}/syncfusion-grid`} component={SyncFusionGrid} />
    <Route
      path={`${match.url}/syncfusion-grid-location`}
      component={SyncFusionGridByLocation}
    />
  </div>
);

export default Settings;
