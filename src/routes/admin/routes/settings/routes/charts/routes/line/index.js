import React from "react";
import ReactEchartsCore from "echarts-for-react/lib/core";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/line";
import "echarts/lib/chart/bar";
import "echarts/lib/component/grid";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/dataZoom";
import "echarts/lib/component/visualMap";
import "echarts/lib/component/markLine";
import "echarts/lib/component/markPoint";
import "echarts/lib/component/legend";

import { isMobile } from "react-device-detect";

import createMockDatas from "./mock";

const data = createMockDatas();
class Line extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }
  getInitialState = () => ({ option: this.getOption() });

  getMinY = data =>
    data.reduce((min, p) => (p.today < min ? p.today : min), data[0].today);
  getMaxY = data =>
    data.reduce((max, p) => (p.today > max ? p.today : max), data[0].today);

  getOption = () => {
    const maxValue = this.getMaxY(data);
    const minValue = this.getMinY(data);
    return {
      title: {
        text: "Günlük Üretim",
        x: "center",
        align: "right",
        top: isMobile ? 80 : 70,
        textStyle: {
          fontSize: isMobile ? 14 : 20
        }
      },
      grid: {
        left: "3%",
        right: "8%",
        top: 100
      },
      toolbox: {
        show: true,
        showTitle: false,
        top: "7%",
        right: "2%",
        itemSize: isMobile ? 10 : 15,
        feature: {
          magicType: {
            show: true,
            type: ["line", "bar"]
          },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      dataZoom: [
        {
          start: 98,
          end: 100
        },
        {
          type: "inside"
        }
      ],
      tooltip: {
        trigger: "axis"
        // formatter: "{b0}<br />{a0}: {c0} kW <br />{a1}: {c1} kW"
      },

      xAxis: {
        type: "category",
        axisTick: {
          alignWithLabel: true,
          interval: 0
        },
        splitLine: { show: false },
        data: data.map(x => x.date)
      },

      yAxis: {
        type: "value",
        min: minValue,
        max: maxValue,
        axisLabel: {
          show: true
        },
        interval: 0
      },
      visualMap: {
        seriesIndex: 0,
        top: 10,
        right: 10,
        textGap: 2,
        itemWidth: 10,
        show: true,
        orient: "horizontal",
        left: "center",
        textStyle: {
          fontSize: isMobile ? 8 : 12
        },
        pieces: (function() {
          const colorList = [
            "#3F88C5",
            "#FFBA08",
            "#136F63",
            "#D00000",
            "#032B43"
          ];

          return colorList.reduce((acc, val, index) => {
            if (index === colorList.length - 1)
              acc.push({
                gt: index * 200,
                color: val
              });
            else
              acc.push({
                gt: index * 200,
                lte: (index + 1) * 200,
                color: val
              });

            return acc;
          }, []);
        })()
        // pieces: [
        //   {
        //     gt: 0,
        //     lte: 200,
        //     color: "#cecece"
        //   },
        //   {
        //     gt: 200,
        //     lte: 400,
        //     color: "#ffde33"
        //   },
        //   {
        //     gt: 400,
        //     lte: 600,
        //     color: "#096"
        //   },
        //   {
        //     gt: 600,
        //     lte: 800,
        //     color: "#cc0033"
        //   },
        //   {
        //     gt: 800,
        //     color: "#660099"
        //   }
        //]
      },
      legend: {
        data: ["Today", "Yesterday"],
        x: "4%",
        top: "8%",
        textStyle: {
          fontSize: isMobile ? 10 : 14
        }
      },
      series: [
        {
          name: "Today",
          type: "line",
          smooth: true,
          lineStyle: {
            normal: { type: "solid", width: 5 }
          },
          markPoint: {
            data: [
              { name: "Today", type: "max" },
              { name: "Today", type: "min" }
            ]
          },
          markLine: {
            silent: true,
            data: (function() {
              let arr = [];
              Array.from({ length: Math.ceil(maxValue / 100) }).forEach(
                (_, i) => {
                  arr.push({
                    yAxis: 100 * (i + 1)
                  });
                }
              );
              return arr;
            })()
          },
          data: data.map(x => x.today)
        },
        {
          name: "Yesterday",
          type: "line",
          smooth: true,
          data: data.map(x => x.yesterday),
          itemStyle: {
            normal: {
              color: "#cecece"
            }
          },
          lineStyle: {
            normal: {
              width: 4
            }
          }
        }
      ]
    };
  };
  render() {
    return (
      <div className="examples">
        <div className="parent">
          <ReactEchartsCore
            echarts={echarts}
            option={this.state.option}
            style={{ height: "500px", width: "100%" }}
            className="react_for_echarts"
          />
        </div>
      </div>
    );
  }
}

export default Line;
