import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#9b34b7",
      dark: "#8b2ea5",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#aaaaaa",
      dark: "#878787",
      contrastText: "#fff",
    },
    customBlack: {
      light: "#484848",
      main: "#000000",
      dark: "#0d0d0d",
      contrastText: "#ffffff",
    },
    customColor2: {
      light: "#b2ff59",
      main: "#76ff03",
      dark: "#64dd17",
      contrastText: "#000",
    },
  },
});

export default theme;
