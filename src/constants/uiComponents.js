// optional `menuName` overrides default name for menu item if it's defined
// hideInMenu hides item in menu
// hideInOverview hides item in Overview page

export const LOCATİONS = [
  {
    name: "Locations - Salihli",
    menuName: "Salihli",
    desc: "",
    path: "/app/location/salihli"
  },
  {
    name: "Locations - Konya",
    menuName: "Konya",
    desc: "",
    path: "/app/location/konya"
  }
];

const CHARTS = [
  {
    name: "Gauge",
    path: "/app/settings/charts/gauge"
  },
  {
    name: "Map",
    path: "/app/settings/charts/map"
  }
];

export const SETTINGS = [
  {
    name: "Layout",
    path: "/app/settings/layout"
  },
  {
    name: "Charts",
    path: "/app/settings/charts",
    children: CHARTS
  }
];

// for UI Overview page
const COMPONENTS = [...LOCATİONS, ...SETTINGS];

export default COMPONENTS;
