import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import classnames from "classnames";
import { compose } from "recompose";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";

import { setLocale, getLocale } from "../api/action";

const styles = theme => ({
  fab: {
    margin: "3px",
    width: "30px",
    height: "30px",
    minHeight: "20px",
    backgroundColor: "transparent",
    color: "#fff",
    "&:hover": {
      backgroundColor: "rgba(132, 130, 130, 0.6)"
    }
  },
  selectedFab: {
    backgroundColor: theme.palette.primary.main
  },
  privateLocalesMenu: {
    textAlign: "center",
    margin: "10px"
  }
});

//TODO : i18n dosyasından referance alsın
const languages = ["tr", "en", "de"];

class LocalesMenu extends React.Component {
  state = {
    selected: getLocale()
  };

  handleChange = (e, lang) => {
    e.preventDefault();
    const {
      actions: { setLocale }
    } = this.props;

    this.setState({
      selected: lang
    });

    setLocale(lang);
  };

  render() {
    const { classes, isPrivate } = this.props;
    const { selected } = this.state;
    return (
      <div className={classnames({ [classes.privateLocalesMenu]: isPrivate })}>
        {languages.map(lang => {
          return (
            <Fab
              key={lang}
              className={classnames(classes.fab, {
                [classes.selectedFab]: selected === lang
              })}
              onClick={e => this.handleChange(e, lang)}
            >
              {lang}
            </Fab>
          );
        })}
      </div>
    );
  }
}

LocalesMenu.defaultProps = {
  isPrivate: false
};

LocalesMenu.propTypes = {
  isPrivate: PropTypes.bool.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        setLocale
      },
      dispatch
    )
  };
};

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withStyles(styles)
)(LocalesMenu);
