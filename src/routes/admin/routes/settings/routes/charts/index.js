import React, { Fragment } from "react";
import { Route } from "react-router-dom";

import Gauge from "./routes/gauge";

const Settings = ({ match }) => (
  <Fragment>
    <Route path={`${match.url}/gauge`} component={Gauge} />
  </Fragment>
);

export default Settings;
