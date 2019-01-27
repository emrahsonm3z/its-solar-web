import APPCONFIG from "constants/appConfig";
import {
  TOGGLE_COLLAPSED_NAV,
  TOGGLE_OFFCANVAS_NAV,
  TOGGLE_OFFCANVAS_MOBILE_NAV,
  CHANGE_SIDENAV_WIDTH,
  CHANGE_COLOR_OPTION,
  TOGGLE_HEADER_SHADOW,
  TOGGLE_SIDENAV_SHADOW,
  TOGGLE_BOXED_LAYOUT,
  TOGGLE_FIXED_SIDENAV,
  TOGGLE_FIXED_HEADER
} from "./action";

const initialSettings = APPCONFIG.settings.layout;

export default function(state = initialSettings, action) {
  switch (action.type) {
    case TOGGLE_COLLAPSED_NAV:
      return {
        ...state,
        collapsedNav: action.isCollapsedNav
      };
    case TOGGLE_OFFCANVAS_NAV:
      return {
        ...state,
        offCanvasNav: action.isOffCanvasNav
      };
    case TOGGLE_OFFCANVAS_MOBILE_NAV:
      return {
        ...state,
        offCanvasMobileNav: action.isOffCanvasMobileNav
      };

    case CHANGE_SIDENAV_WIDTH:
    case CHANGE_COLOR_OPTION:
    case TOGGLE_HEADER_SHADOW:
    case TOGGLE_SIDENAV_SHADOW:
    case TOGGLE_BOXED_LAYOUT:
    case TOGGLE_FIXED_SIDENAV:
    case TOGGLE_FIXED_HEADER:
      return {
        ...state
      };
    default:
      return state;
  }
}
