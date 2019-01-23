import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

const AppFooter = () => (
  <Footer className="app-footer app-footer-custom">
    <div className="footer-inner-v1">
      <span className="small">©ITS Bilişim ve Enerji</span>
    </div>
  </Footer>
);

export default AppFooter;
