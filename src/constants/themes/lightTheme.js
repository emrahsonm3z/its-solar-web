import { createMuiTheme } from "@material-ui/core/styles";
import { green, amber } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      // light: will be calculated from palette.primary.main,
      // main: cyan[500],
      // dark: cyan[700],
      main: amber[600],
      dark: amber[700],
      contrastText: "#fff"
    },
    secondary: {
      main: green[400],
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#fff"
    }
    // error: will use the default color
  },
  typography: {
    useNextVariants: true
  }
});

export default theme;
