import { isMobile } from "react-device-detect";

const highlight = "#03b7c9";

const options = {
  tooltip: {
    formatter: "{a} <br/>{c} {b}"
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      restore: { show: TextTrackCue },
      saveAsImage: {
        show: true,
        title: "export"
      }
    },
    showTitle: false
  },
  series: [
    {
      type: "gauge", // dış çember
      radius: "50%",
      splitNumber: 10, // aralık sayısı
      startAngle: 225, //başlangıç açı değeri
      endAngle: -45, //bitiş açı değeri
      axisLine: {
        //çember
        show: true,
        lineStyle: {
          width: 2,
          shadowColor: "#fff", //默认透明
          shadowBlur: 4,
          color: [[1, highlight]]
          // color: [
          //   [0.2, "grey"],
          //   [0.5, "yellow"],
          //   [0.8, "green"],
          //   [1, "#ff4500"]
          // ]
        }
      },
      axisTick: {
        // tırtıklar
        show: false,
        lineStyle: {
          color: highlight,
          width: 1
        },
        length: -5,
        splitNumber: 10
      },
      splitLine: {
        show: true,
        length: 10,
        lineStyle: {
          color: highlight
        }
      },
      axisLabel: {
        distance: -32,
        textStyle: {
          color: highlight,
          fontSize: isMobile ? 10 : 12,
          fontWeight: "bold"
        }
      },
      pointer: {
        show: 0
      },
      detail: {
        show: 0
      }
    },
    {
      type: "gauge",
      radius: "30%",
      startAngle: 225,
      endAngle: -45,
      axisLine: {
        // iç çeber
        show: true,
        lineStyle: {
          width: 2,
          color: [
            [0.2, "grey"],
            [0.5, "yellow"],
            [0.8, "green"],
            [1, "#ff4500"]
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
        show: 0
      },
      pointer: {
        show: true, // ok
        length: "105%",
        width: 2
      },
      detail: {
        show: true,
        offsetCenter: [0, "180%"],
        textStyle: {
          fontSize: isMobile ? 12 : 16,
          color: "#fff"
        },
        rich: {
          name: {
            // fontSize: "calc(1vw + 4px)",
            fontSize: isMobile ? 10 : 14,
            lineHeight: 30,
            color: "#ddd"
          }
        }
      }
      // itemStyle: {
      //   normal: {
      //     color: highlight
      //   }
      // },
    }
  ]
};

export default options;
