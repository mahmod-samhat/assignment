import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    primary: { main: string; light: string };
    secondary: { main: string; light: string };
    danger: { main: string; light: string };
    success: { main: string; light: string };
    text: { main: string; light: string };
    background: { main: string; light: string };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    primary?: { main: string; light: string };
    secondary?: { main: string; light: string };
    danger?: { main: string; light: string };
    success?: { main: string; light: string };
    text?: { main: string; light: string };
    background?: { main: string; light: string };
  }
}
export const theme = createTheme({
  primary: { main: "#ffba28", light: "#FFD16D" },
  secondary: { main: "#616161  ", light: "#e0e0e0  " },
  danger: { main: "#cc3433", light: "#ef9a9a" },
  success: { main: "#017936", light: "#c8e6c9" },
  text: { main: "white", light: "rgb(180, 180, 180)" },
  background: { main: "#FFD16D", light: "#F8FF71" },
});
