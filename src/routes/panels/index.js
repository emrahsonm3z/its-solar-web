import React from "react";

class Inverter extends React.Component {
  render() {
    const { match } = this.props;
    return (
      <div>
        Location: {match.params.pathParam1} Central: {match.params.pathParam2}{" "}
        Inverter: {match.params.pathParam3}
      </div>
    );
  }
}

export default Inverter;
