import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import loadable from "react-loadable";
import LoadingComponent from "components/Loading";

let Settings = loadable({
  loader: () => import("./routes/settings/"),
  loading: LoadingComponent
});

const Admin = ({ match }) => (
  <Fragment>
    <Route path={`${match.url}/settings`} component={Settings} />
  </Fragment>
);

export default Admin;
