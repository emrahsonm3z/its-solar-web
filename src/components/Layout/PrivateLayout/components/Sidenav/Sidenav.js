import React from "react";
import { bindActionCreators } from "redux";
import classnames from "classnames";
import { connect } from "react-redux";
import { Layout } from "antd";

import Logo from "components/Logo";
import MaterialIcon from "components/MaterialIcon";
import LocalesMenu from "components/Locale/components/LocalesMenu";
import APPCONFIG from "constants/appConfig";
import DEMO from "constants/demoData";
import { toggleCollapsedNav, toggleOffCanvasNav } from "../../api/action";
import AppMenu from "./Menu";
const { Sider } = Layout;

class AppSidenav extends React.Component {
  render() {
    const {
      collapsedNav,
      offCanvasNav,
      sidenavWidth,
      headerShadow,
      sidenavShadow,
      colorOption
    } = this.props;
    const collapsedWidth = offCanvasNav ? 0 : 80;

    return (
      <Sider
        collapsible
        collapsed={collapsedNav || offCanvasNav}
        collapsedWidth={collapsedWidth}
        trigger={null}
        width={sidenavWidth}
        id="app-sidenav"
        className={classnames("app-sidenav d-none d-md-flex", {
          "sidenav-elevation": sidenavShadow,
          "sidenav-bg-light":
            ["31", "32", "33", "34", "35", "36"].indexOf(colorOption) >= 0,
          "sidenav-bg-dark":
            ["31", "32", "33", "34", "35", "36"].indexOf(colorOption) < 0
        })}
      >
        <section
          className={classnames("sidenav-header", {
            "header-elevation": headerShadow,
            "bg-dark": ["11", "31"].indexOf(colorOption) >= 0,
            "bg-white": colorOption === "21",
            "bg-primary": ["12", "22", "32"].indexOf(colorOption) >= 0,
            "bg-success": ["13", "23", "33"].indexOf(colorOption) >= 0,
            "bg-info": ["14", "24", "34"].indexOf(colorOption) >= 0,
            "bg-warning": ["15", "25", "35"].indexOf(colorOption) >= 0,
            "bg-danger": ["16", "26", "36"].indexOf(colorOption) >= 0
          })}
        >
          <Logo body="#343a40" glare="#343a40" />
          <a href="#/" className="brand">
            {APPCONFIG.brand}
          </a>
        </section>

        <div className="sidenav-content" ref="sidenavContent">
          <AppMenu />
          <LocalesMenu isPrivate={true} />
        </div>

        <div className="sidenav-footer">
          <a href={DEMO.link}>
            <MaterialIcon icon="help" className="nav-icon" />
            <span className="nav-text">
              <span>Help</span> & <span>Support</span>
            </span>
          </a>
        </div>
      </Sider>
    );
  }
}

const mapStateToProps = state => ({
  collapsedNav: state.settings.privateLayout.collapsedNav,
  offCanvasNav: state.settings.privateLayout.offCanvasNav,
  sidenavWidth: state.settings.privateLayout.sidenavWidth,
  headerShadow: state.settings.privateLayout.headerShadow,
  sidenavShadow: state.settings.privateLayout.sidenavShadow,
  colorOption: state.settings.privateLayout.colorOption
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      // layout actions:
      toggleCollapsedNav,
      toggleOffCanvasNav
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppSidenav);
