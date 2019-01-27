import React from "react";
import { intlShape, injectIntl } from "react-intl";
import "../style.scss";

class Home extends React.Component {
  render() {
    const { formatMessage } = this.props.intl;
    return (
      <div className="main--content">
        <div className="main--content__home">
          <h3>{formatMessage({ id: "its.long" })} - 2019</h3>
          <h1>{formatMessage({ id: "page.home.body1" })}</h1>
          <h3>{formatMessage({ id: "page.home.body2" })}</h3>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(Home);
