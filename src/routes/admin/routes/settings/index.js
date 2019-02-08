import React from "react";
import { Route } from "react-router-dom";
import loadable from "react-loadable";
import LoadingComponent from "components/Loading";

let Charts = loadable({
  loader: () => import("./routes/charts/"),
  loading: LoadingComponent
});

let Tables = loadable({
  loader: () => import("./routes/table/"),
  loading: LoadingComponent
});

const Settings = ({ match }) => {
  return (
    <div>
      <Route path={`${match.url}/charts`} component={Charts} />
      <Route path={`${match.url}/table`} component={Tables} />
    </div>
  );
};

export default Settings;
