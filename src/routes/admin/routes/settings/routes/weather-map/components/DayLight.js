import React from "react";
import moment from "moment";
import { isMobile } from "react-device-detect";

import ReactEchartsCore from "echarts-for-react/lib/core";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/gauge";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/title";

// const primary = "#ffc107";
// const secondary = "#2d3238";
const textColor = "#fff";

const minutesOfaDay = 60 * 24;

class DayLight extends React.Component {
  constructor(props) {
    super(props);

    const { sunrise, sunset } = this.props;

    this.state = {
      sunrise,
      sunset,
      option: {
        title: {
          text: "Güneş doğuş/batış",
          x: "center",
          top: "60%",
          textStyle: {
            fontSize: isMobile ? 10 : 14,
            fontWeight: "400",
            color: textColor,
            align: "right"
          }
        },
        series: [
          {
            type: "gauge",
            name: "DayLight",
            radius: "50%",
            splitNumber: 2,
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 24 * 60,
            data: [
              {
                value: this.convertToMins(moment().format("HH:mm"))
              }
            ],
            axisLine: {
              show: true,
              lineStyle: {
                width: 16,
                shadowColor: "#fff",
                shadowBlur: 0,
                color: [[1, "rgba(0,0,0,.3"]]
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              length: 0,
              lineStyle: {
                color: textColor
              }
            },
            axisLabel: {
              distance: -20,
              formatter: e => this.convertMinsToHrs(e) || "",
              textStyle: {
                color: textColor,
                fontSize: isMobile ? 10 : 12,
                fontWeight: "bold"
              }
            },
            pointer: {
              show: true, // ok
              length: "80%",
              width: 5
            },
            detail: {
              show: true,
              offsetCenter: [0, "30%"],
              formatter: e => this.convertMinsToHrsMins(e) || "",
              textStyle: {
                fontSize: isMobile ? 10 : 16,
                color: textColor
              }
            }
          },
          {
            type: "gauge",
            radius: "50%",
            startAngle: (1 - this.calcAxisLinePoint(sunrise)) * 180,
            endAngle: (1 - this.calcAxisLinePoint(sunset)) * 180,
            splitNumber: 1,
            min: this.convertToMins(sunrise),
            max: this.convertToMins(sunset),
            axisLine: {
              // iç çeber
              show: true,
              lineStyle: {
                width: 16,
                shadowColor: "#fff", //默认透明
                shadowBlur: 4,
                color: [
                  [
                    1,
                    {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 0,
                      colorStops: [
                        {
                          offset: 0,
                          color: "lightskyblue"
                        },
                        {
                          offset: 0.5,
                          color: "yellow"
                        },
                        {
                          offset: 1,
                          color: "orangered"
                        }
                      ],
                      globalCoord: false
                    }
                  ]
                  // [
                  //   1,
                  //   {
                  //     x: "0.00",
                  //     y: "0.00",
                  //     x2: "1.00",
                  //     y2: "0.00",
                  //     type: "linear",
                  //     global: false,
                  //     colorStops: [
                  //       {
                  //         offset: 0.1,
                  //         color: "#3FA7DC"
                  //       },
                  //       {
                  //         offset: 0.2,
                  //         color: "#7fd0f9"
                  //       },
                  //       {
                  //         offset: 0.8,
                  //         color: "#d7f0fd"
                  //       },
                  //       {
                  //         offset: 0.9,
                  //         color: "#7fd0f9"
                  //       },
                  //       {
                  //         offset: 1,
                  //         color: "#3FA7DC"
                  //       }
                  //     ]
                  //   }
                  // ]
                ]
              }
            },
            axisTick: {
              show: 0
            },
            splitLine: {
              show: 0
            },
            axisLabel: {
              formatter: e => this.convertMinsToHrsMins(e) || "",
              distance: -62,
              textStyle: {
                color: textColor,
                fontSize: isMobile ? 10 : 12,
                fontWeight: "bold"
              }
            },
            detail: {
              show: false
            }

            // itemStyle: {
            //   normal: {
            //     color: highlight
            //   }
            // },
          }
        ]
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    debugger;
    if (
      nextProps.sunrise !== this.state.sunrise ||
      nextProps.sunset !== this.state.sunset
    ) {
      let option = { ...this.state.option };

      option.series[1].startAngle =
        (1 - this.calcAxisLinePoint(nextProps.sunrise)) * 180;
      option.series[1].endAngle =
        (1 - this.calcAxisLinePoint(nextProps.sunset)) * 180;
      option.series[1].min = this.convertToMins(nextProps.sunrise);
      option.series[1].max = this.convertToMins(nextProps.sunset);

      this.setState({ option });
    }
  }

  convertMinsToHrsMins = mins => {
    let h = Math.floor(mins / 60);
    let m = mins % 60;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    return `${h}:${m}`;
  };

  convertMinsToHrs = mins => {
    let h = Math.floor(mins / 60);

    return `${h}`;
  };

  convertToMins = time => {
    const { hour, minute } = this.splitTime(time);

    return hour * 60 + minute;
  };

  splitTime = time => {
    const timeValues = time.split(":", 2);
    const hour = parseInt(timeValues[0]);
    const minute = parseInt(timeValues[1]);

    return {
      hour,
      minute
    };
  };

  calcAxisLinePoint = time => {
    const { hour, minute } = this.splitTime(time);
    return ((hour * 60 + minute) / minutesOfaDay).toFixed(2);
  };

  // componentWillMount() {
  //   let option = { ...this.state.option };

  //   const { sunrise } = this.props;
  //   const { sunset } = this.props;

  //   option.series[0].axisLine.color = [
  //     [this.calcAxisLinePoint(sunrise), "grey"],
  //     [this.calcAxisLinePoint(sunset), "yellow"],
  //     [1, "grey"]
  //   ];

  //   this.setState({ option });
  // }

  render() {
    debugger;
    return (
      <ReactEchartsCore
        echarts={echarts}
        option={this.state.option}
        style={{
          minHeight: "240px",
          minWidth: "240px",
          maxHeight: "1200px",
          maxWidth: "1200px",
          width: "30vw",
          height: "30vw"
        }}
        className="react_for_echarts"
      />
    );
  }
}

export default DayLight;
