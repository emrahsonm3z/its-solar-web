import React from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import { Layout, Icon } from "antd";

import Logo from "components/Logo";
import LocalesMenu from "components/Locale/components/LocalesMenu";
import APPCONFIG from "constants/appConfig";
import DEMO from "constants/demoData";
import AppMenu from "./Menu";

const { Sider } = Layout;

class AppSidenav extends React.Component {
  render() {
    const { sidenavWidth, colorOption } = this.props;

    return (
      <Sider
        trigger={null}
        width={sidenavWidth}
        id="app-sidenav"
        className={classnames("app-sidenav", {
          "sidenav-bg-light":
            ["31", "32", "33", "34", "35", "36"].indexOf(colorOption) >= 0,
          "sidenav-bg-dark":
            ["31", "32", "33", "34", "35", "36"].indexOf(colorOption) < 0
        })}
      >
        <section
          className={classnames("sidenav-header", {
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
          <AppMenu isMobileNav={true} />
          <LocalesMenu isPrivate={true} />
        </div>

        <div className="sidenav-footer">
          <a
            target="_blank"
            without="true"
            rel="noopener noreferrer"
            href={DEMO.link}
          >
            <Icon type="question-circle" />
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
  sidenavWidth: state.settings.privateLayout.sidenavWidth,
  colorOption: state.settings.privateLayout.colorOption
});

export default connect(mapStateToProps)(AppSidenav);
