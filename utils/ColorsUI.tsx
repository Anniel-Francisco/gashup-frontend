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
  },
});

export default theme;