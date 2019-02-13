import React from "react";

class Location extends React.Component {
  render() {
    const { match } = this.props;
    return (
      <div>
        Location : {match.params.pathParam1} {match.params.pathParam2}
      </div>
    );
  }
}

export default Location;
