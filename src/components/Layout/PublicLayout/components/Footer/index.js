import React from "react";
import { Layout, Icon } from "antd";

import DEMO from "constants/demoData";
import APPCONFIG from "constants/appConfig";

const { Footer } = Layout;

const Section = () => (
  <Footer className="app-footer">
    <div className="footer-inner-v1">
      <span className="footer-copyright">
        <span>© 2019 {APPCONFIG.its}. All Rights Reserved.</span>
        <a className="list-item" href={DEMO.link}>
          Privacy
        </a>
        <a className="list-item" href={DEMO.link}>
          Terms
        </a>
      </span>
      <ul className="footer-social-list">
        <li>
          <a href={DEMO.link}>
            <Icon type="google" />
          </a>
        </li>
        <li>
          <a href={DEMO.link}>
            <Icon type="facebook" />
          </a>
        </li>
        <li>
          <a href={DEMO.link}>
            <Icon type="twitter" />
          </a>
        </li>
        <li>
          <a href={DEMO.link}>
            <Icon type="instagram" />
          </a>
        </li>
      </ul>
    </div>
  </Footer>
);

export default Section;
