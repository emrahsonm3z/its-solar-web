import React, { Component } from "react";

import { connect } from "react-redux";
import loadable from "react-loadable";
// import Gauge from "../components/Gauge";
import createMockDatas from "../mock";
import LoadingComponent from "components/Loading";

let Gauge = loadable({
  loader: () => import("../components/Gauge"),
  loading: LoadingComponent
});

class GaugeCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: createMockDatas()
    };
  }

  renderItem = (item, options) => (
    <Gauge key={item.id} data={item} options={options} />
  );

  render() {
    const { data } = this.state;
    const { options } = this.props;
    return (
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "space-around",
          background: "#222939"
        }}
      >
        {data.map((item, index) => this.renderItem(item, options))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    options: state.settings.charts.gauge
  };
};

export default connect(
  mapStateToProps,
  null
)(GaugeCollection);
