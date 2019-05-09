import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";
import de from "react-intl/locale-data/de";
import tr from "react-intl/locale-data/tr";

import { L10n /*loadCldr*/ } from "@syncfusion/ej2-base";
// import * as numberingSystems from "cldr-data/supplemental/numberingSystems.json";
// import * as numbers from "cldr-data/main/tr/numbers.json";
// import * as cagregorian from "cldr-data/main/tr/ca-gregorian.json";
// import * as timeZoneNames from "cldr-data/main/tr/timeZoneNames.json";
// import * as currencies from "cldr-data/main/tr/currencies.json";

import syncFusionGridLocaleTR from "routes/admin/routes/settings/routes/table/routes/syncfusion-grid/locale/gridLocaleConfig/tr.json";
import syncFusionGridLocaleDE from "routes/admin/routes/settings/routes/table/routes/syncfusion-grid/locale/gridLocaleConfig/de.json";
import classnames from "classnames";
import { MuiThemeProvider } from "@material-ui/core/styles";

import lightTheme from "constants/themes/lightTheme";
import darkTheme from "constants/themes/darkTheme";
import grayTheme from "constants/themes/grayTheme";

import PublicLayout from "./Layout/PublicLayout";
import PrivateLayout from "./Layout/PrivateLayout";

import messages from "i18n/messages";
import Error404 from "../routes/exception/routes/404";

addLocaleData(en);
addLocaleData(tr);
addLocaleData(de);

// Syncfusion component globalization load
L10n.load({
  "tr-TR": syncFusionGridLocaleTR,
  "de-DE": syncFusionGridLocaleDE
});

// loadCldr(currencies, cagregorian, numbers, timeZoneNames, numberingSystems);

const AppRoute = ({
  userIsAuthenticated,
  component: Component,
  requireAuth,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (requireAuth === userIsAuthenticated) {
        return <Component {...props} />;
      } else {
        if (requireAuth) {
          return (
            <Redirect
              to={{ pathname: "/main", state: { from: props.location } }}
            />
          );
        } else {
          return (
            <Redirect
              to={{
                pathname: "/app/dashboard",
                state: { from: props.location }
              }}
            />
          );
        }
      }
    }}
  />
);

class App extends Component {
  render() {
    const { match, location, lang, userIsAuthenticated, theme } = this.props;
    const isRoot =
      location.pathname === "/" || location.pathname === "/app" ? true : false;
    if (isRoot) {
      return userIsAuthenticated === true ? (
        <Redirect to="/app/dashboard" />
      ) : (
        <Redirect to="/main" />
      );
    }
    let materialUITheme;
    switch (theme) {
      case "gray":
        materialUITheme = grayTheme;
        break;
      case "dark":
        materialUITheme = darkTheme;
        break;
      default:
        materialUITheme = lightTheme;
    }

    return (
      <MuiThemeProvider theme={materialUITheme}>
        <div
          id="app"
          className={classnames("app-main", {
            "theme-gray": theme === "gray",
            "theme-dark": theme === "dark"
          })}
        >
          <IntlProvider locale={lang} key={lang} messages={messages[lang]}>
            <Switch>
              <AppRoute
                // path="/main"
                path={`${match.url}main`}
                component={PublicLayout}
                requireAuth={false}
                userIsAuthenticated={userIsAuthenticated}
              />
              <AppRoute
                // path="/app"
                path={`${match.url}app`}
                component={PrivateLayout}
                requireAuth={true}
                userIsAuthenticated={userIsAuthenticated}
              />
              <Route path="*" component={Error404} />
            </Switch>
          </IntlProvider>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    userIsAuthenticated: state.user.isAuthenticated,
    lang: state.locale.lang,
    theme: state.settings.privateLayout.theme
  };
};

export default connect(
  mapStateToProps,
  null
)(App);
