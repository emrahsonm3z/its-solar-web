import { INITIAL_PANEL_PRODUCTION_MOCK_DATA } from "./action";

const initialState = {
  panelProduction: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case INITIAL_PANEL_PRODUCTION_MOCK_DATA:
      return {
        ...state,
        panelProduction: action.panelProduction
      };

    default:
      return state;
  }
}
