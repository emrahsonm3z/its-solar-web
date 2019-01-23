import React from "react";
import classnames from "classnames";
import { Layout } from "antd";
import AppHeader from "../components/Header";
import AppContent from "../components/Content";

class PublicLayout extends React.Component {
  render() {
    const { boxedLayout, fixedHeader } = this.props;

    return (
      <Layout
        id="app-layout"
        className={classnames("app-layout", {
          "boxed-layout": boxedLayout,
          "fixed-header": fixedHeader
        })}
      >
        {fixedHeader ? (
          <Layout style={{ backgroundColor: "#000" }}>
            <AppHeader />
            <Layout>
              <AppContent />
            </Layout>
          </Layout>
        ) : (
          <Layout style={{ backgroundColor: "#000" }}>
            <AppHeader />
            <AppContent />
          </Layout>
        )}
      </Layout>
    );
  }
}

export default PublicLayout;
