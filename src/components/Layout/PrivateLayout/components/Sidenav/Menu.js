import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import Button from "@material-ui/core/Button";

import APPCONFIG from "constants/appConfig";
import { LOCATİONS } from "constants/uiComponents";
import { toggleOffCanvasMobileNav } from "../../api/action";
import MaterialIcon from "components/MaterialIcon";

const SubMenu = Menu.SubMenu;

class AppMenu extends React.Component {
  // list for AccordionNav
  rootMenuItemKeys = [
    // without submenu
    "/app/dashboard",
    "/app/alarm"
  ];
  rootSubmenuKeys = ["/app/locations"];

  state = {
    openKeys: ["/app/dashboard"]
  };

  onOpenChange = openKeys => {
    // AccordionNav
    // console.log(openKeys)
    const latestOpenKey = openKeys.find(
      key => this.state.openKeys.indexOf(key) === -1
    );
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      });
    }
  };

  onMenuItemClick = item => {
    // AccordionNav
    const itemKey = item.key;
    if (this.rootMenuItemKeys.indexOf(itemKey) >= 0) {
      this.setState({ openKeys: [itemKey] });
    }

    //
    const { isMobileNav } = this.props;
    if (isMobileNav) {
      this.closeMobileSidenav();
    }
  };

  closeMobileSidenav = () => {
    if (APPCONFIG.AutoCloseMobileNav) {
      const { toggleOffCanvasMobileNav } = this.props;
      toggleOffCanvasMobileNav(true);
    }
  };

  //
  getSubMenuOrItem = item => {
    if (item.children && item.children.some(child => child.name)) {
      const childrenItems = this.getNavMenuItems(item.children);
      // hide submenu if there's no children items
      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubMenu
            title={<Button className="nav-item">{item.name}</Button>}
            key={item.path}
          >
            {childrenItems}
          </SubMenu>
        );
      }
      return null;
    } else {
      return (
        <Menu.Item key={item.path}>
          <Button className="nav-item" href={item.path}>
            <span>{item.menuName || item.name}</span>
          </Button>
        </Menu.Item>
      );
    }
  };

  getNavMenuItems = menusData => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(item => !item.hideInMenu)
      .map(item => {
        // make dom
        const ItemDom = this.getSubMenuOrItem(item);
        return ItemDom;
      })
      .filter(item => item);
  };

  render() {
    const { collapsedNav, colorOption, location } = this.props;
    // const mode = collapsedNav ? 'vertical' : 'inline';
    const menuTheme =
      ["31", "32", "33", "34", "35", "36"].indexOf(colorOption) >= 0
        ? "light"
        : "dark";
    const currentPathname = location.pathname;

    const menuProps = collapsedNav
      ? {}
      : {
          openKeys: this.state.openKeys
        };
    return (
      <Menu
        className="app-menu"
        theme={menuTheme}
        mode="inline"
        inlineCollapsed={collapsedNav}
        {...menuProps}
        onOpenChange={this.onOpenChange}
        onClick={this.onMenuItemClick}
        selectedKeys={[currentPathname]}
      >
        <Menu.Item key="/app/dashboard">
          <Button component={Link} className="nav-item" to="/app/dashboard">
            <MaterialIcon icon="dashboard" />
            <span className="nav-text">Dashboard</span>
          </Button>
        </Menu.Item>
        <Menu.Item key="/app/alarm">
          <Button component={Link} className="nav-item" to="/app/alarm">
            <MaterialIcon icon="store" />
            <span className="nav-text">Alarm</span>
            <span className="nav-badge nav-badge-icon badge-right ml-1">
              <MaterialIcon
                icon="notification_important"
                className="m-0 text-warning"
              />
            </span>
          </Button>
        </Menu.Item>
        <SubMenu
          key="/app/locations"
          title={
            <Button className="nav-item">
              <MaterialIcon icon="web" />
              <span className="nav-text">Locations</span>
            </Button>
          }
        >
          {this.getNavMenuItems(LOCATİONS)}
        </SubMenu>
        <Menu.Divider />
      </Menu>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);
  return {
    collapsedNav: state.settings.collapsedNav,
    colorOption: state.settings.colorOption,
    location: state.routing.location
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      // layout actions:
      toggleOffCanvasMobileNav
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppMenu);
