import React from "react";
import { connect } from "react-redux";

import App from "./container/App";

// 3rd
// import 'styles/antd.less';
import "styles/bootstrap/bootstrap.scss";
// custom
import "styles/layout.scss";
import "styles/theme.scss";
import "styles/ui.scss";

class AppLayout extends React.Component {
  render() {
    const { boxedLayout, fixedSidenav, fixedHeader } = this.props;
    return (
      <div id="app-layout-container">
        <App
          boxedLayout={boxedLayout}
          fixedSidenav={fixedSidenav}
          fixedHeader={fixedSidenav === true ? fixedHeader : false}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  boxedLayout: state.settings.boxedLayout,
  fixedSidenav: state.settings.fixedSidenav,
  fixedHeader: state.settings.fixedHeader
});

export default connect(mapStateToProps)(AppLayout);
