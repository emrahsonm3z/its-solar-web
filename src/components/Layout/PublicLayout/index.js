import React from "react";

import App from "./container/App";
// import Particles from "../../Particles";

class PublicLayout extends React.Component {
  state = {
    boxedLayout: false,
    fixedHeader: false
  };
  render() {
    const { boxedLayout, fixedHeader } = this.state;
    return (
      <div id="app-layout-container">
        <App boxedLayout={boxedLayout} fixedHeader={fixedHeader} />
        {/* <Particles /> */}
      </div>
    );
  }
}

export default PublicLayout;
