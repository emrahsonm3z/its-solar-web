import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";
import echarts from "echarts";

import turkeyMapData from "./turkey.json";

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.registerMap();
    this.state = this.getInitialState();
  }
  timeTicket = null;
  getInitialState = () => ({ option: this.getOption() });

  registerMap = () => {
    echarts.registerMap("turkey", turkeyMapData);
  };

  getOption = () => {
    return {
      title: {
        text: "Turkey",
        subtext: "Cities",
        left: "center"
      },
      toolbox: {
        show: true,
        orient: "vertical",
        left: "right",
        top: "center",
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {}
        }
      },
      series: [
        {
          type: "map",
          mapType: "turkey",
          roam: false
        }
      ]
    };
  };
  render() {
    return (
      <div className="examples">
        <div className="parent">
          <ReactEcharts
            option={this.state.option}
            style={{ height: "500px", width: "100%" }}
            className="react_for_echarts"
          />
        </div>
      </div>
    );
  }
}
