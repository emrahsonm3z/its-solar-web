import React from "react";

import {
  ThunderStorm,
  Rain,
  BrokenClouds,
  ClearSky,
  FewClouds,
  ScatteredClouds,
  ShowerRain,
  Snow,
  Mist
} from "../icon";

const Status = props => {
  switch (props.statusId) {
    case "01":
      return <ClearSky />;
    case "02":
      return <FewClouds />;
    case "03":
      return <ScatteredClouds />;
    case "04":
      return <BrokenClouds />;
    case "09":
      return <ShowerRain />;
    case "10":
      return <Rain />;
    case "11":
      return <ThunderStorm />;
    case "13":
      return <Snow />;
    case "50":
      return <Mist />;

    default:
      return <div>Weather status error..</div>;
  }
};

export default Status;
