import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import { compose } from "recompose";

import LoginForm from "../components/LoginForm";
import LOGIN from "../gql/Login.gql";

import {
  setLoadingStateForUserLogin,
  receivedUserLoggedIn,
  unsetLoadingStateForUserLogin,
  errorUserLoggedIn
} from "../api/action";

class Login extends React.Component {
  render() {
    return (
      <div className="p-1 p-sm-4">
        <LoginForm {...this.props} />
      </div>
    );
  }
}

const LoginOptions = {
  props: ({ ownProps, mutate }) => ({
    async loginUser({ email, password }) {
      ownProps.setLoadingStateForUserLogin();
      try {
        const payload = { variables: { email, password } };
        const {
          data: { login }
        } = await mutate(payload);
        ownProps.receivedUserLoggedIn(login.token, login.user);
        ownProps.unsetLoadingStateForUserLogin();
        return Promise.resolve();
      } catch (error) {
        ownProps.errorUserLoggedIn(error);
        ownProps.unsetLoadingStateForUserLogin();
        return Promise.reject();
      }
    }
  })
};

const mapStateToProps = state => {
  return {
    // user Auth props:
    userIsAuthenticated: state.user.isAuthenticated,
    mutationLoading: state.user.mutationLoading,
    // errors:
    error: state.user.error
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      // userAuth actions:
      setLoadingStateForUserLogin,
      receivedUserLoggedIn,
      unsetLoadingStateForUserLogin,
      errorUserLoggedIn
    },
    dispatch
  );
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  graphql(LOGIN, LoginOptions)
)(Login);
