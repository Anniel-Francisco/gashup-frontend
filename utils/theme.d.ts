import { PaletteColorOptions, PaletteOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    customBlack: PaletteColorOptions;
    customColor2: PaletteColorOptions;
  }

  interface PaletteOptions {
    customBlack?: PaletteColorOptions;
    customColor2?: PaletteColorOptions;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    customBlack: true;
  }
}