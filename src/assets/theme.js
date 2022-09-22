import { createTheme } from "@material-ui/core/styles";
import createPalette from "@material-ui/core/styles/createPalette";

const theme = createTheme({
  palette: createPalette({
    primary: {
      main: "#8F479B",
    },
    secondary: {
      main: "#530970",
    },
    success: {
      main: "#4caf50",
    },
  }),
});

theme.overrides = {
  MuiPaper: {
    rounded: {
      borderRadius: 16,
    },
  },

  MuiButton: {
    root: {
      borderRadius: 16,
    },
  },

  MuiOutlinedInput: {
    root: {
      borderRadius: 16,
    },
  },

  MuiTabPanel: {
    root: {
      backgroundColor: "red",
    },
  },
};

export default theme;
