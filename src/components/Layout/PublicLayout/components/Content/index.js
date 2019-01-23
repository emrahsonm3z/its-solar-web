import React from "react";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";
import loadable from "react-loadable";
import { Layout } from "antd";

import LoadingComponent from "components/Loading";

const { Content } = Layout;

let Home = loadable({
  loader: () => import("routes/home"),
  loading: LoadingComponent
});

let About = loadable({
  loader: () => import("routes/about"),
  loading: LoadingComponent
});

class AppContent extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <Content id="app-content">
        <Route exact path={match.url} component={Home} />
        <Route exact path={`${match.url}/about`} component={About} />
      </Content>
    );
  }
}

export default withRouter(AppContent);
