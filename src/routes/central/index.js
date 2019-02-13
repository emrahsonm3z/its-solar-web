import React from "react";

class Central extends React.Component {
  render() {
    const { match } = this.props;
    return (
      <div>
        Location: {match.params.pathParam1} Central: {match.params.pathParam2}
      </div>
    );
  }
}

export default Central;
