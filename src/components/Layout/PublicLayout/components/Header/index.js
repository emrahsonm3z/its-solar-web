import React from "react";
import { Link } from "react-router-dom";
import { Layout, Modal } from "antd";
import { FormattedMessage } from "react-intl";
import Button from "@material-ui/core/Button";

import APPCONFIG from "constants/appConfig";
import LoginView from "routes/user/container/Login";

import Logo from "components/Logo";
import LocalesMenu from "components/Locale/components/LocalesMenu";

const { Header } = Layout;

class Modal2 extends React.Component {
  state = { visible: false };
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  handleOk = e => {
    // console.log(e);
    this.setState({
      visible: false
    });
  };
  handleCancel = e => {
    // console.log(e);
    this.setState({
      visible: false
    });
  };
  render() {
    return (
      <div>
        <Button className="btn-w-xs" color="primary" onClick={this.showModal}>
          <FormattedMessage id="navlink.login" />
        </Button>
        <Modal
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <LoginView />
        </Modal>
      </div>
    );
  }
}
const Section = () => (
  <Header className="app-header">
    <div className="app-header-inner">
      <div className="header-left">
        <div className="list-unstyled list-inline">
          <Link
            to="/main"
            className="list-inline-item logo"
            style={{ color: "rgb(252, 181, 34)", display: "inline-block" }}
          >
            <Logo color="rgb(252, 181, 34)" />
            <span>{APPCONFIG.brand}</span>
          </Link>
        </div>
      </div>

      <div className="header-right">
        <div className="list-unstyled list-inline">
          <div className="list-inline-item">
            <Link to="/main/about">About</Link>
          </div>
          <div className="list-inline-item">
            <LocalesMenu />
          </div>
          <div className="list-inline-item">
            <Modal2 />
          </div>
        </div>
      </div>
    </div>
  </Header>
);

export default Section;
