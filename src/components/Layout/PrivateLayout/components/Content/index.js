import React from "react";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";
import loadable from "react-loadable";
import { Layout } from "antd";

import LoadingComponent from "components/Loading";

import LocationView from "routes/location";
import CentralView from "routes/central";
import InverterView from "routes/inverter";

const { Content } = Layout;

let Dashboard = loadable({
  loader: () => import("routes/dashboard"),
  loading: LoadingComponent
});
let Alarm = loadable({
  loader: () => import("routes/alarm"),
  loading: LoadingComponent
});

let Settings = loadable({
  loader: () => import("routes/admin/routes/settings"),
  loading: LoadingComponent
});

class AppContent extends React.Component {
  render() {
    const { match } = this.props;
    return (
      <Content id="app-content">
        <Route
          exact
          path={`${match.url}/panels/:pathParam1?`}
          component={LocationView}
        />
        <Route
          exact
          path={`${match.url}/panels/:pathParam1?/central-:pathParam2?`}
          component={CentralView}
        />
        <Route
          exact
          path={`${
            match.url
          }/panels/:pathParam1?/central-:pathParam2?/inverter-:pathParam3?`}
          component={InverterView}
        />
        <Route path={`${match.url}/dashboard`} component={Dashboard} />
        <Route path={`${match.url}/alarm`} component={Alarm} />
        <Route path={`${match.url}/settings`} component={Settings} />
      </Content>
    );
  }
}

export default withRouter(AppContent);
