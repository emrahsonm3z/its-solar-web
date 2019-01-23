import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import classnames from "classnames";
import { Layout } from "antd";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import DEMO from "constants/demoData";
import { toggleCollapsedNav, toggleOffCanvasMobileNav } from "../../api/action";
import { setUserLogout } from "routes/user/api/action";

import MaterialIcon from "components/MaterialIcon";
const { Header } = Layout;

class AppHeader extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    const { setUserLogout } = this.props;
    setUserLogout();
  };

  onToggleCollapsedNav = () => {
    const { toggleCollapsedNav, collapsedNav } = this.props;
    toggleCollapsedNav(!collapsedNav);
  };

  onToggleOffCanvasMobileNav = () => {
    const { toggleOffCanvasMobileNav, offCanvasMobileNav } = this.props;
    toggleOffCanvasMobileNav(!offCanvasMobileNav);
  };

  render() {
    const { anchorEl } = this.state;
    const { headerShadow, colorOption } = this.props;

    return (
      <Header
        className={classnames("app-header", {
          "header-elevation": headerShadow
        })}
      >
        <div
          className={classnames("app-header-inner", {
            "bg-white":
              ["11", "12", "13", "14", "15", "16", "21"].indexOf(colorOption) >=
              0,
            "bg-dark": colorOption === "31",
            "bg-primary": ["22", "32"].indexOf(colorOption) >= 0,
            "bg-success": ["23", "33"].indexOf(colorOption) >= 0,
            "bg-info": ["24", "34"].indexOf(colorOption) >= 0,
            "bg-warning": ["25", "35"].indexOf(colorOption) >= 0,
            "bg-danger": ["26", "36"].indexOf(colorOption) >= 0
          })}
        >
          <div className="header-left">
            <div className="list-unstyled list-inline">
              <a
                href={DEMO.link}
                className="list-inline-item d-none d-md-inline-block"
                onClick={this.onToggleCollapsedNav}
              >
                <MaterialIcon icon="menu" className="list-icon" />
              </a>
              <a
                href={DEMO.link}
                className="list-inline-item d-md-none"
                onClick={this.onToggleOffCanvasMobileNav}
              >
                <MaterialIcon icon="menu" className="list-icon" />
              </a>
            </div>
          </div>

          <div className="header-right">
            <div className="list-unstyled list-inline">
              <a className="list-inline-item" href={DEMO.link}>
                <div
                  className="avatar"
                  aria-owns={anchorEl ? "app-header-menu" : null}
                  aria-haspopup="true"
                  onClick={this.handleClick}
                >
                  <img
                    src="assets/images-demo/g1-sm.jpg"
                    alt="avatar"
                    className="avatar-img"
                  />
                  <span className="avatar-text d-none d-md-inline">
                    {DEMO.user}
                  </span>
                </div>
                <Menu
                  id="app-header-menu"
                  className="app-header-dropdown"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose}
                >
                  <MenuItem
                    onClick={this.handleClose}
                    className="d-block d-md-none"
                  >
                    <div>
                      Signed in as <strong>{DEMO.user}</strong>
                    </div>
                  </MenuItem>
                  <div className="divider divider-solid my-1 d-block d-md-none" />
                  <MenuItem disabled>
                    <a href={DEMO.link}>
                      <MaterialIcon icon="settings" />
                      Settings
                    </a>
                  </MenuItem>
                  <div className="divider divider-solid my-1" />
                  <MenuItem onClick={this.handleLogout}>
                    <MaterialIcon icon="forward" />
                    Sign out
                  </MenuItem>
                </Menu>
              </a>
            </div>
          </div>
        </div>
      </Header>
    );
  }
}

const mapStateToProps = state => ({
  offCanvasMobileNav: state.settings.offCanvasMobileNav,
  collapsedNav: state.settings.collapsedNav,
  colorOption: state.settings.colorOption,
  headerShadow: state.settings.headerShadow
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      // layout actions:
      toggleCollapsedNav,
      toggleOffCanvasMobileNav,

      // userAuth action:
      setUserLogout
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppHeader);
