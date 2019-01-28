import React from "react";
import { Route } from "react-router-dom";
import loadable from "react-loadable";
import LoadingComponent from "components/Loading";

let Charts = loadable({
  loader: () => import("./routes/charts/"),
  loading: LoadingComponent
});

const Settings = ({ match }) => {
  return (
    <div>
      <Route path={`${match.url}/charts`} component={Charts} />
    </div>
  );
};

export default Settings;
