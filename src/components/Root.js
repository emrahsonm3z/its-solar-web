import React, { Component } from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import { Provider } from "react-redux";
import { ApolloProvider } from "react-apollo";

// import configureStore, { history } from "lib/configureStore";
// import apolloClient from "lib/apolloClient";
import ScrollToTop from "./ScrollToTop";

import App from "./App";

export default class Root extends Component {
  render() {
    const { store, apolloClient, history } = this.props;
    return (
      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <ConnectedRouter history={history}>
            <ScrollToTop>
              <Route path="/" component={App} />
            </ScrollToTop>
          </ConnectedRouter>
        </ApolloProvider>
      </Provider>
    );
  }
}
