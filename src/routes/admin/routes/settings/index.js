import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import loadable from "react-loadable";
import LoadingComponent from "components/Loading";

let Charts = loadable({
  loader: () => import("./routes/charts/"),
  loading: LoadingComponent
});

const Settings = ({ match }) => (
  <Fragment>
    <Route path={`${match.url}/charts`} component={Charts} />
  </Fragment>
);

export default Settings;
