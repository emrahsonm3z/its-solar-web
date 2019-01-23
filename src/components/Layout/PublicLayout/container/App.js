import React from "react";
import classnames from "classnames";
import { Layout } from "antd";
import AppHeader from "../components/Header";
import AppContent from "../components/Content";
import AppFooter from "../components/Footer";
import Particles from "components/Particles";

class PublicLayout extends React.Component {
  render() {
    const { boxedLayout, fixedHeader } = this.props;

    return (
      <Layout
        id="app-layout"
        className={classnames("app-layout", "main-layout", {
          "boxed-layout": boxedLayout,
          "fixed-header": fixedHeader
        })}
      >
        {fixedHeader ? (
          <Layout className="main-layout__container">
            <AppHeader />
            <Layout>
              <AppContent />
              <AppFooter />
            </Layout>
          </Layout>
        ) : (
          <Layout className="main-layout__container">
            <AppHeader />
            <AppContent />
            <AppFooter />
            <Particles />
          </Layout>
        )}
      </Layout>
    );
  }
}

export default PublicLayout;
