import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Drawer } from "antd";

import MobileSidenavSider from "./MobileSidenavSider";
import { toggleOffCanvasMobileNav } from "../../api/action";

class AppSidenav extends React.Component {
  render() {
    const {
      offCanvasMobileNav,
      toggleOffCanvasMobileNav,
      sidenavWidth
    } = this.props;

    return (
      <Drawer
        closable={false}
        visible={!offCanvasMobileNav}
        placement="left"
        className="d-md-none app-drawer"
        width={sidenavWidth}
        onClose={() => {
          toggleOffCanvasMobileNav(true);
        }}
      >
        <MobileSidenavSider />
      </Drawer>
    );
  }
}

const mapStateToProps = state => ({
  offCanvasMobileNav: state.settings.offCanvasMobileNav,
  sidenavWidth: state.settings.sidenavWidth
});

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
)(AppSidenav);
