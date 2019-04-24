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

let WeatherMap = loadable({
  loader: () => import("./routes/weather-map/"),
  loading: LoadingComponent
});

const Settings = ({ match }) => {
  return (
    <div>
      <Route path={`${match.url}/charts`} component={Charts} />
      <Route path={`${match.url}/table`} component={Tables} />
      <Route path={`${match.url}/weather-map`} component={WeatherMap} />
    </div>
  );
};

export default Settings;
