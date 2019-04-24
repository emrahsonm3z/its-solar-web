import React from "react";
import MaterialIcon from "components/MaterialIcon";

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

const IconList = [
  {
    name: "Mist",
    Component: Mist
  },
  {
    name: "ThunderStorm",
    Component: ThunderStorm
  },
  {
    name: "Rain",
    Component: Rain
  },
  {
    name: "BrokenClouds",
    Component: BrokenClouds
  },
  {
    name: "ClearSky",
    Component: ClearSky
  },
  {
    name: "FewClouds",
    Component: FewClouds
  },
  {
    name: "ScatteredClouds",
    Component: ScatteredClouds
  },
  {
    name: "ShowerRain",
    Component: ShowerRain
  },
  {
    name: "Snow",
    Component: Snow
  }
];

const Section = props => (
  <article className="article">
    <h2 className="article-title">Weather</h2>

    <div className="row">
      {props.city &&
        props.country && (
          <div className="col-xl-6">
            <div className="number-card-v1 border-0 mdc-elevation--z1 mb-4">
              <div className="card-top">
                <span>
                  {props.city}, {props.country}
                </span>
              </div>
              <div className="card-info">
                <span>Location</span>
              </div>
              <div className="card-bottom">
                {/* <MaterialIcon icon="bar_chart" className="text-info" /> */}
              </div>
            </div>
          </div>
        )}

      {props.temperature && (
        <div className="col-xl-6">
          <div className="number-card-v1 border-0 mdc-elevation--z1 mb-4">
            <div className="card-top">
              <MaterialIcon icon="group_add" className="text-success" />
            </div>
            <div className="card-info">
              <span>Temperature</span>
            </div>
            <div className="card-bottom">
              <span>{props.temperature}</span>
            </div>
          </div>
        </div>
      )}
      {props.humidity && (
        <div className="col-xl-6">
          <div className="number-card-v1 border-0 mdc-elevation--z1 mb-4">
            <div className="card-top">
              <span>{props.humidity}</span>
            </div>
            <div className="card-info">
              <span>Humidity</span>
            </div>
            <div className="card-bottom">
              <MaterialIcon icon="attach_money" className="text-warning" />
            </div>
          </div>
        </div>
      )}
      {props.type &&
        props.description &&
        IconList.map(({ Component, name }, index) => {
          return (
            <div className="col-xl-6" key={index}>
              <div className="number-card-v1 border-0 mdc-elevation--z1 mb-4">
                <div className="card-top">
                  <Component />
                </div>
                <div className="card-info">
                  <span>Conditions</span>
                </div>
                <div className="card-bottom">
                  <span>{name}</span>
                </div>
              </div>
            </div>
          );
        })}
    </div>
    {props.error && <p>{props.error}</p>}
  </article>
);

export default Section;
