import React from "react";
import { Layout, Icon } from "antd";
import { intlShape, injectIntl } from "react-intl";

import DEMO from "constants/demoData";
import APPCONFIG from "constants/appConfig";

const { Footer } = Layout;

const Section = props => {
  const { formatMessage } = props.intl;
  return (
    <Footer className="app-footer">
      <div className="footer-inner-v1">
        <span className="footer-copyright">
          <span>
            © 2019 {APPCONFIG.its}. {formatMessage({ id: "footer.message" })}
          </span>
          <a className="list-item" href={DEMO.link}>
            {formatMessage({ id: "footer.privacy" })}
          </a>
          <a className="list-item" href={DEMO.link}>
            {formatMessage({ id: "footer.terms" })}
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
};

Section.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(Section);
