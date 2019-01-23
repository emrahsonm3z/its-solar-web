export const TOGGLE_COLLAPSED_NAV = "TOGGLE_COLLAPSED_NAV";
export const TOGGLE_OFFCANVAS_NAV = "TOGGLE_OFFCANVAS_NAV";
export const TOGGLE_OFFCANVAS_MOBILE_NAV = "TOGGLE_OFFCANVAS_MOBILE_NAV";
export const CHANGE_SIDENAV_WIDTH = "CHANGE_SIDENAV_WIDTH";
export const TOGGLE_HEADER_SHADOW = "TOGGLE_HEADER_SHADOW";
export const CHANGE_COLOR_OPTION = "CHANGE_COLOR_OPTION";
export const TOGGLE_BOXED_LAYOUT = "TOGGLE_BOXED_LAYOUT";
export const TOGGLE_FIXED_SIDENAV = "TOGGLE_FIXED_SIDENAV";
export const TOGGLE_FIXED_HEADER = "TOGGLE_FIXED_HEADER";
export const TOGGLE_SIDENAV_SHADOW = "TOGGLE_SIDENAV_SHADOW";

export function toggleCollapsedNav(isCollapsedNav) {
  return { type: TOGGLE_COLLAPSED_NAV, isCollapsedNav: isCollapsedNav };
}

export function toggleOffCanvasMobileNav(isOffCanvasMobileNav) {
  return {
    type: TOGGLE_OFFCANVAS_MOBILE_NAV,
    isOffCanvasMobileNav: isOffCanvasMobileNav
  };
}
export function toggleOffCanvasNav(isOffCanvasNav) {
  return { type: TOGGLE_OFFCANVAS_NAV, isOffCanvasNav: isOffCanvasNav };
}
