import React, { Component } from "react";
import ReactEchartsCore from "echarts-for-react/lib/core";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/effectScatter";
import "echarts/lib/component/graphic";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/geo";
import "echarts/lib/component/title";
import "echarts/lib/component/visualMap";
import "echarts/lib/component/toolbox";

import { isMobile } from "react-device-detect";

import createMockDatas from "./mock";

import turkeyMapData from "./tr-v3.json";

const geoCoordMap = {
  SALİHLİ: [28.158319, 38.494787],
  KULU: [33.066589, 39.103627],
  POLATLI: [32.055303, 39.818594],
  SİVRİHİSAR: [31.502003, 39.453424],
  ATKARACALAR: [32.818937, 40.824664],
  KURŞUNLU: [33.33271, 40.462331]
};

let data = createMockDatas();

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.registerMap();
    this.state = this.getInitialState();
  }
  getInitialState = () => ({ option: this.getOption() });

  registerMap = () => {
    echarts.registerMap("turkey", turkeyMapData);
  };

  convertData = data => {
    let scatterData = [];
    for (var i = 0; i < data.length; i++) {
      var geoCoord = geoCoordMap[data[i].name];
      if (geoCoord) {
        scatterData.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].daily),
          daily: data[i].daily,
          weekly: data[i].weekly,
          monthly: data[i].monthly,
          unit: data[i].unit
        });
      }
    }
    return scatterData;
  };

  getOption = () => {
    return {
      backgroundColor: "#404a59",
      title: {
        text: "Turkey",
        subtext: "ITS Panels Map",
        left: "center",
        top: 10,
        x: "center",
        textStyle: {
          color: "#fff"
        },
        subtextStyle: {
          color: "#fff"
        }
      },
      tooltip: {
        trigger: "item",
        backgroundColor: "transparent",
        formatter: function(params) {
          console.log(params);

          let ht = `<div style="background: rgba(0, 0, 0, .8); max-width: 200px; color: #fff;border-radius: 5%;">
          <div style="padding: 15px;">
          <div>Location: ${params.data.name}</div>
          <div>Daily: ${params.data.daily} ${params.data.unit}</div>
          <div>Weekly: ${params.data.weekly} ${params.data.unit}</div>
          <div>Monthly: ${params.data.monthly} ${params.data.unit}</div>
          </div>
          </div>`;
          // ht +=
          //   "<div>Location: Salihli</div><div>Daily: 300 kW</div><div>Weekly: 2300 kW</div><div>Monthly: 8300 kW</div></div></div>";

          // ht += "<div style='background-color:;width:100px;height:100px'>";
          // ht += params.data.name + "</br>" + params.data.daily;
          // ht += "</div>";
          return ht;
        },
        // formatter: "{a} <br/> {b}: {c}",
        textStyle: {
          fontSize: "24px"
        }
      },
      toolbox: {
        show: true,
        showTitle: false,
        orient: "horizontal",
        left: "left",
        top: "top",
        feature: {
          restore: {},
          saveAsImage: {}
        }
      },
      visualMap: {
        type: "piecewise",
        seriesIndex: 0,
        min: 200,
        max: 400,
        calculable: true,
        color: ["#ff3333", "orange", "yellow", "lime", "aqua"],
        textStyle: {
          color: "#fff"
        },
        formatter: function(value, value2) {
          return value + " - " + value2 + " kW";
        },
        showLabel: true,
        text: ["Günlük Üretim"] //
      },
      geo: {
        map: "turkey",
        right: "10",
        top: isMobile ? "25%" : "13%",
        left: isMobile ? "25%" : "30%",
        center: [31.502003, 39.453424],
        // zoom: 2,
        zoom: isMobile ? 3 : 1.6,
        label: {
          emphasis: {
            show: false // il isimleri
          }
        },
        roam: true,
        // itemStyle: {
        //   normal: {
        //     areaColor: "#323c48",
        //     borderColor: "#111"
        //   },
        //   emphasis: {
        //     areaColor: "#2a333d"
        //   }
        // }
        itemStyle: {
          normal: {
            //         	color: '#ddd',
            borderColor: "rgba(147, 235, 248, 1)",
            borderWidth: 1,
            areaColor: {
              type: "radial",
              x: 0.5,
              y: 0.5,
              r: 0.8,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(175,238,238, 0)" // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(	47,79,79, .2)" // 100% 处的颜色
                }
              ],
              globalCoord: false // 缺省为 false
            },
            shadowColor: "rgba(128, 217, 248, 1)",
            // shadowColor: 'rgba(255, 255, 255, 1)',
            shadowOffsetX: -2,
            shadowOffsetY: 2,
            shadowBlur: 10
          },
          emphasis: {
            areaColor: "#389BB7",
            borderWidth: 0
          }
        }
      },
      graphic: data
        .sort(function(a, b) {
          return b.monthly - a.monthly;
        })
        .reduce(
          (acc, item, index) => {
            acc.push(
              {
                type: "text",
                z: 100,
                bottom: isMobile ? `${1 + index * 3}%` : "",
                top: isMobile ? "" : `${11 + index * 10}%`,
                left: isMobile ? "" : "2%",
                right: isMobile ? "30%" : "",
                style: {
                  fill: "#cecece",
                  text: item.name,
                  font: 'calc(.5vw + 10px) "Roboto", sans-serif'
                }
              },
              {
                type: "text",
                z: 100,
                bottom: isMobile ? `${1 + index * 3}%` : "",
                top: isMobile ? "" : `${14 + index * 10}%`,
                left: isMobile ? "75%" : "2%",
                style: {
                  fill: "#fefefe",
                  font: `${
                    isMobile ? "calc(.5vw + 10px)" : "calc(.5vw + 14px)"
                  } "Roboto", sans-serif`,
                  text: item.monthly + " " + item.unit
                }
              }
            );
            return acc;
          },
          [
            {
              type: "text",
              z: 100,
              bottom: isMobile ? "19%" : "",
              top: isMobile ? "" : "7%",
              left: isMobile ? "60%" : "2%",
              style: {
                fill: "#00ff00",
                text: "AYLIK ÜRETİM",
                font: 'calc(.5vw + 10px) "Roboto", sans-serif'
              }
            }
          ]
        ),
      // [
      //   {
      //     type: "text",
      //     z: 100,
      //     top: "7%",
      //     left: "2%",
      //     style: {
      //       fill: "#fff",
      //       text: data[0].name,
      //       font: '1em "Roboto", sans-serif'
      //     }
      //   },
      //   {
      //     type: "text",
      //     z: 100,
      //     top: "11%",
      //     left: "2%",
      //     style: {
      //       fill: "#fefefe",
      //       font: '2em "Roboto", sans-serif',
      //       text: data[0].monthly + " " + data[0].unit
      //     }
      //   },
      //   {
      //     type: "text",
      //     z: 100,
      //     top: "25%",
      //     left: "2%",
      //     style: {
      //       fill: "#fff",
      //       text: data[1].name, //China
      //       font: '1em "Roboto", sans-serif'
      //     }
      //   },
      //   {
      //     type: "text",
      //     z: 100,
      //     top: "29%",
      //     left: "2%",
      //     style: {
      //       fill: "#fefefe",
      //       text: data[1].monthly + " " + data[1].unit,
      //       font: '2em "Roboto", sans-serif'
      //     }
      //   },
      //   {
      //     type: "text",
      //     z: 100,
      //     top: "43%",
      //     left: "2%",
      //     style: {
      //       fill: "#fff",
      //       text: data[2].name, //United States
      //       font: '1em "Roboto", sans-serif'
      //     }
      //   },
      //   {
      //     type: "text",
      //     z: 100,
      //     top: "47%",
      //     left: "2%",
      //     style: {
      //       fill: "#fefefe",
      //       text: data[2].monthly + " " + data[2].unit,
      //       font: '2em "Roboto", sans-serif'
      //     }
      //   }
      // ],
      series: [
        {
          type: "effectScatter",
          coordinateSystem: "geo",
          data: this.convertData(
            data.sort(function(a, b) {
              return b.daily - a.daily;
            })
          ),
          symbolSize: function(val) {
            console.log(val);
            return window.innerWidth / 100 + 5;
          },
          showEffectOn: "render",
          rippleEffect: {
            period: 10,
            scale: 4,
            brushType: "fill"
          },
          hoverAnimation: true,
          label: {
            normal: {
              formatter: "{b}",
              position: "right",
              show: true,
              textStyle: {
                color: ["#fff"],
                fontWeight: "bold"
              }
            }
          },
          zlevel: 1
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
            style={{ height: "700px", width: "100%" }}
            className="react_for_echarts"
          />
        </div>
        {/* <div
          style={{ backgroundColor: "#00000021", maxWidth: 200, color: "#fff" }}
        >
          <div style={{ padding: 15 }}>
            <div>Location: Salihli</div>
            <div>Daily: 300 kW</div>
            <div>Weekly: 2300 kW</div>
            <div>Monthly: 8300 kW</div>
          </div>
        </div> */}
      </div>
    );
  }
}
