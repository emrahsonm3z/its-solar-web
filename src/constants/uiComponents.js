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
  },
  {
    name: "Line",
    path: "/app/settings/charts/line"
  }
];
const TABLES = [
  {
    name: "React Table",
    path: "/app/settings/table/react-table"
  },
  {
    name: "SyncFusion Grid",
    path: "/app/settings/table/syncfusion-grid"
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
  },
  {
    name: "Tables",
    path: "/app/settings/table",
    children: TABLES
  }
];

// for UI Overview page
const COMPONENTS = [...LOCATİONS, ...SETTINGS];

export default COMPONENTS;
