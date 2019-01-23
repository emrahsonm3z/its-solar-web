import {
  CHECK_IS_USER_IS_AUTHENTICATED,
  RECEIVED_USER_LOGGED_IN,
  ERROR_USER_LOGGED_IN,
  SET_LOADING_LOGGED_IN,
  UNSET_LOADING_LOGGED_IN,
  SET_USER_LOGOUT,
  RESET_LOG_ERRORS,
  emptyUser
} from "./action";

const initialState: User = {
  isAuthenticated: false,
  mutationLoading: false,
  error: null,
  ...emptyUser
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RECEIVED_USER_LOGGED_IN:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        id: action.user.id,
        email: action.user.email,
        error: null
      };

    case ERROR_USER_LOGGED_IN:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        // errors:
        error: { ...action.error },
        // user infos:
        id: initialState.id,
        email: initialState.email
      };

    case SET_LOADING_LOGGED_IN:
    case UNSET_LOADING_LOGGED_IN:
      return {
        ...state,
        mutationLoading: action.loading
      };

    case CHECK_IS_USER_IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        // user infos from storage if authenticated:
        id: action.user.id,
        email: action.user.email
      };

    case SET_USER_LOGOUT:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        id: action.user.id,
        email: action.user.email
      };

    case RESET_LOG_ERRORS:
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
}
