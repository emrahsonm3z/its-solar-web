import { auth } from "lib/authService";
// Actions Types
export const RECEIVED_USER_LOGGED_IN = "RECEIVED_USER_LOGGED_IN";
export const ERROR_USER_LOGGED_IN = "ERROR_USER_LOGGED_IN";
export const CHECK_IS_USER_IS_AUTHENTICATED = "CHECK_IS_USER_IS_AUTHENTICATED";
export const SET_USER_LOGOUT = "SET_USER_LOGOUT";
export const SET_LOADING_LOGGED_IN = "SET_LOADING_LOGGED_IN";
export const UNSET_LOADING_LOGGED_IN = "UNSET_LOADING_LOGGED_IN";
export const RESET_LOG_ERRORS = "RESET_LOG_ERRORS";

export const emptyUser = {
  id: "",
  email: ""
};

// login sucess:
export function receivedUserLoggedIn(userToken = null, user = emptyUser) {
  const isAuthenticated = userToken ? true : false;

  auth.clearAllAppStorage(); // clear previous token
  auth.setToken(userToken); // set token to default store = localStorage and to default token key = 'token'
  auth.setUserInfo(user);

  return {
    type: RECEIVED_USER_LOGGED_IN,
    isAuthenticated,
    user
  };
}

// login error:
export function errorUserLoggedIn(error = null) {
  auth.clearAllAppStorage(); // clear previous token

  return {
    type: ERROR_USER_LOGGED_IN,
    error,
    isAuthenticated: false
  };
}

// user logout:
export function setUserLogout() {
  auth.clearAllAppStorage();
  return {
    type: SET_USER_LOGOUT,
    isAuthenticated: false,
    user: emptyUser
  };
}

// check user auth (check token)
export function checkIfUserIsAuthenticated() {
  const user = auth.getUserInfo() ? auth.getUserInfo() : emptyUser;
  // need token and user info in localStorage to be authenticated
  const isAuthenticated =
    auth.isAuthenticated() && checkUserHasId(user) ? true : false;

  return {
    type: CHECK_IS_USER_IS_AUTHENTICATED,
    isAuthenticated: isAuthenticated,
    user
  };
}

function checkUserHasId(user) {
  // $FlowIgnore
  return user && user.id;
}

// set loading state for login
export function setLoadingStateForUserLogin() {
  return {
    type: SET_LOADING_LOGGED_IN,
    loading: true
  };
}

export function unsetLoadingStateForUserLogin() {
  return {
    type: UNSET_LOADING_LOGGED_IN,
    loading: false
  };
}

// reset login and register error:
export function resetLogError() {
  return {
    type: RESET_LOG_ERRORS
  };
}
