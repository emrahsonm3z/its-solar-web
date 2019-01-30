import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";
import echarts from "echarts";
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
  timeTicket = null;
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
      // animation: true,
      // animationDuration: 1000,
      // animationEasing: "cubicInOut",
      // animationDurationUpdate: 1000,
      // animationEasingUpdate: "cubicInOut",
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

          let ht = `<div style="background: rgba(0, 0, 0, .8); max-width: 200px; color: #fff;">
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
      visualMap: {
        min: 200,
        max: 400,
        calculable: true,
        color: ["#ff3333", "orange", "yellow", "lime", "aqua"],
        textStyle: {
          color: "#fff"
        }
      },
      xAxis: {
        show: false
        // axisLine: {
        //   show: false,
        //   lineStyle: {
        //     color: "rgba(121,121,121,0.3)"
        //     //color:'red'
        //   }
        // },
        // splitLine: {
        //   show: false
        // }
      },
      yAxis: {
        type: "category",
        inverse: true,
        nameGap: 16,
        axisLine: {
          show: false,
          lineStyle: {
            color: "#ddd"
          }
        },
        axisTick: {
          show: false,
          lineStyle: {
            color: "#ddd"
          }
        },
        axisLabel: {
          interval: 0,
          margin: 125,
          textStyle: {
            color: "#ddd",
            align: "left",
            fontSize: 12
          },
          rich: {
            a: {
              color: "#fff",
              backgroundColor: "#FAAA39",
              width: 20,
              height: 20,
              align: "center",
              borderRadius: 2
            },
            b: {
              color: "#fff",
              backgroundColor: "#4197FD",
              width: 20,
              height: 20,
              align: "center",
              borderRadius: 2
            }
          },
          formatter: function(params) {
            if (parseInt(params.slice(0, 1)) < 3) {
              return [
                "{a|" +
                  (parseInt(params.slice(0, 1)) + 1) +
                  "}" +
                  "  " +
                  params.slice(1)
              ].join("\n");
            } else {
              return [
                "{b|" +
                  (parseInt(params.slice(0, 1)) + 1) +
                  "}" +
                  "  " +
                  params.slice(1)
              ].join("\n");
            }
          }
        },
        data: data.map(function(ele, index) {
          return index + ele.name;
        })
      },
      // yAxis: {
      //   type: "category",
      //   inverse: true,
      //   nameGap: 16,
      //   axisTick: {
      //     show: false,
      //     lineStyle: {
      //       color: "rgba(121,121,121,0.3)"
      //     }
      //   },
      //   axisLine: {
      //     show: false,
      //     lineStyle: {
      //       color: "rgba(121,121,121,0.3)"
      //       //color:'red'
      //     }
      //   },
      //   axisLabel: {
      //     show: false,
      //     textStyle: {
      //       //  color: '#ddd'
      //     }
      //   },
      //   data: data
      //     .map(function(ele) {
      //       return ele.name;
      //     })
      //     .reverse()
      // },
      grid: {
        left: "15%",
        right: "73%",
        top: "15%",
        height: "auto",
        bottom: "56%"
      },
      series: [
        // {
        //   type: "pie",
        //   center: ["20%", "25%"],
        //   //selectedMode: 'single',
        //   radius: ["12%", "20%"],

        //   data: this.convertData(
        //     data.sort(function(a, b) {
        //       return b.daily - a.daily;
        //     })
        //   )
        // },
        {
          id: "bar",
          type: "bar",
          roam: false,
          visualMap: false,
          zlevel: 2,
          barMaxWidth: 5,
          barGap: 0,
          label: {
            show: true,
            position: "right",
            color: "#fff",
            formatter: function(p) {
              return p.value + " kW";
            }
          },
          itemStyle: {
            color: function(params) {
              // build a color map as your need.
              const colorList = [
                {
                  colorStops: [
                    {
                      offset: 0,
                      color: "#FFD119" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#FFAC4C" // 100% 处的颜色
                    }
                  ]
                },
                {
                  colorStops: [
                    {
                      offset: 0,
                      color: "#00C0FA" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#2F95FA" // 100% 处的颜色
                    }
                  ]
                }
              ];
              if (params.dataIndex < 3) {
                return colorList[0];
              } else {
                return colorList[1];
              }
            },
            barBorderRadius: 15
          },
          // label: {
          //   normal: {
          //     position: "insideLeft",
          //     formatter: function(p) {
          //       return p.name + " : " + p.value;
          //     },
          //     color: "#6f3071",
          //     fontSize: 15
          //     //color: '#000000'
          //   }
          // },
          tooltip: { show: false },
          data: data
            .map(function(ele) {
              return ele.monthly;
            })
            .sort(function(a, b) {
              return a > b;
            })
        },
        {
          type: "effectScatter",
          coordinateSystem: "geo",
          data: this.convertData(
            data.sort(function(a, b) {
              return b.daily - a.daily;
            })
          ),
          symbolSize: function(val) {
            return 15;
          },
          showEffectOn: "render",
          rippleEffect: {
            // period: 3,
            // brushType: "stroke",
            // scale: 4
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
          <ReactEcharts
            option={this.state.option}
            style={{ height: "500px", width: "100%" }}
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
