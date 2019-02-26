import createPanelData from "../PanelProduction";
// import { allData } from "../PanelProduction/productionByDay";

export const INITIAL_PANEL_PRODUCTION_MOCK_DATA =
  "INITIAL_PANEL_PRODUCTION_MOCK_DATA";

// login sucess:
export function createPanelProductionData() {
  const data = createPanelData();

  // const xxx = allData();

  return {
    type: INITIAL_PANEL_PRODUCTION_MOCK_DATA,
    panelProduction: data
  };
}
