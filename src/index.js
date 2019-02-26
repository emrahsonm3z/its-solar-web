import React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import configureStore, { history } from "lib/configureStore";
import apolloClient from "lib/apolloClient";
import Root from "./components/Root";
import * as serviceWorker from "./serviceWorker";

import { checkIfUserIsAuthenticated } from "routes/user/api/action";
import { checkLocale } from "./components/Locale/api/action";
// import { createPanelProductionData } from "./mocks/api/action";

const store = configureStore();

store.dispatch(checkIfUserIsAuthenticated());
store.dispatch(checkLocale());
// store.dispatch(createPanelProductionData());

render(
  <AppContainer>
    <Root store={store} history={history} apolloClient={apolloClient} />
  </AppContainer>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept("./components/Root", () => {
    const NewRoot = require("./components/Root").default;
    render(
      <AppContainer>
        <NewRoot store={store} history={history} apolloClient={apolloClient} />
      </AppContainer>,
      document.getElementById("root")
    );
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
