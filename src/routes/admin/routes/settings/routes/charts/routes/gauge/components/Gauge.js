import React from "react";
import ReactEchartsCore from "echarts-for-react/lib/core";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/gauge";
import "echarts/lib/component/toolbox";

const Gauge = ({ options, data }) => {
  let opt = Object.assign({}, options);

  opt.series[0].splitNumber = data.splitNumber || 10; // 12 dene
  opt.series[0].min = data.range[0];
  opt.series[0].max = data.range[1];
  opt.series[1].name = data.name;
  opt.series[1].min = data.range[0];
  opt.series[1].max = data.range[1];
  opt.series[1].detail.formatter = [
    "{value} " + (data.unit || ""),
    "{name|" + data.name + "}"
  ].join("\n");
  opt.series[1].data = [
    {
      value: data.value
    }
  ];

  return (
    <ReactEchartsCore
      echarts={echarts}
      option={opt}
      style={{
        minHeight: "140px",
        maxHeight: "400px",
        minWidth: "140px",
        maxWidth: "400px",
        width: "50vw",
        height: "50vw"
      }}
      className="react_for_echarts"
    />
  );
};

export default Gauge;
