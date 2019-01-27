import React from "react";
import { withRouter } from "react-router-dom";
import { intlShape, injectIntl } from "react-intl";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import MaterialIcon from "components/MaterialIcon";

import { validator, email as isEmail, required } from "utils/validation";

const initialState = {
  email: "",
  password: "",
  errors: {}
};
class Form extends React.Component {
  state = {
    ...initialState
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  resetState = () => {
    this.setState({
      ...initialState
    });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const validationErrors = validator(
      {
        email: [isEmail, required],
        password: [required]
      },
      this.state
    );

    if (Object.keys(validationErrors).length > 0) {
      this.setState({ errors: validationErrors });
    } else {
      const { loginUser } = this.props;
      const { email, password } = this.state;

      try {
        await loginUser({ email, password });
      } catch (error) {
        console.log("login went wrong..., error: ", error);
      }
    }
  };

  componentWillUnmount() {
    this.resetState();
  }

  render() {
    const { email, password, errors } = this.state;
    const {
      mutationLoading,
      error,
      intl: { formatMessage }
    } = this.props;
    return (
      <section className="form-v1-container">
        <h2>{formatMessage({ id: "page.user.login.title" })}</h2>
        <p className="lead">
          {formatMessage({ id: "page.user.login.message" })}
        </p>
        <form onSubmit={this.handleSubmit} className="form-v1">
          <div className="form-group">
            <Grid container spacing={8} alignItems="flex-end">
              <Grid item>
                <MaterialIcon icon="account_circle" className="font-24" />
              </Grid>
              <Grid item xs>
                <TextField
                  id="login-email"
                  label={formatMessage({ id: "page.user.login.email" })}
                  autoComplete="off"
                  fullWidth
                  value={email}
                  name="email"
                  onChange={this.onChange}
                />
              </Grid>
              {errors.email && (
                <Grid item>
                  <div className="box box-default bg-danger text-body-reverse">
                    <div className="box-body p-2">{errors.email}</div>
                  </div>
                </Grid>
              )}
            </Grid>
          </div>

          <div className="form-group">
            <Grid container spacing={8} alignItems="flex-end">
              <Grid item>
                <MaterialIcon icon="lock" className="font-24" />
              </Grid>
              <Grid item xs>
                <TextField
                  id="login-password"
                  label={formatMessage({ id: "page.user.login.password" })}
                  type="password"
                  fullWidth
                  autoComplete="off"
                  value={password}
                  name="password"
                  onChange={this.onChange}
                />
              </Grid>
              {errors.password && (
                <Grid item>
                  <div className="box box-default bg-danger text-body-reverse">
                    <div className="box-body p-2">{errors.password}</div>
                  </div>
                </Grid>
              )}
            </Grid>
          </div>

          <div className="form-group">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="btn-cta btn-block"
              disabled={mutationLoading}
            >
              {formatMessage({ id: "page.user.login.button" })}
            </Button>
          </div>
          {error && (
            <div className="box box-default bg-danger text-body-reverse">
              <div className="box-body">{error.graphQLErrors[0].message}</div>
            </div>
          )}
        </form>
        <p className="additional-info">
          {formatMessage({ id: "page.user.login.forgot" })}
        </p>
      </section>
    );
  }
}

Form.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(withRouter(Form));
