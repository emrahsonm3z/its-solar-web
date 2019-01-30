import React from "react";
import { Route } from "react-router-dom";

import Gauge from "./routes/gauge";
import Map from "./routes/map";
import Line from "./routes/line";

const Settings = ({ match }) => (
  <div>
    <Route path={`${match.url}/gauge`} component={Gauge} />
    <Route path={`${match.url}/map`} component={Map} />
    <Route path={`${match.url}/line`} component={Line} />
  </div>
);

export default Settings;
