import React from "react";
import { Route } from "react-router-dom";

import Gauge from "./routes/gauge";

const Settings = ({ match }) => (
  <div>
    <Route path={`${match.url}/gauge`} component={Gauge} />
  </div>
);

export default Settings;
