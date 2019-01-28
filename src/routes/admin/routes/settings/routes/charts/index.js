import React from "react";
import { Route } from "react-router-dom";

import Gauge from "./routes/gauge";
import Map from "./routes/map";

const Settings = ({ match }) => (
  <div>
    <Route path={`${match.url}/gauge`} component={Gauge} />
    <Route path={`${match.url}/map`} component={Map} />
  </div>
);

export default Settings;
