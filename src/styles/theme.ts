import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  colors: {
    "bg-primary": "#F0FAF8",
    "bg-secondary": "#2CD889",
    "font-primary": "#646D82",
    "font-secondary": "#2CD889",
    "font-secondary-2": "#FF6565",
    "success-color": "#28a745",
    "fail-color": "#dc3545",
  },

  breakpoints: {
    sm: "400px",
    md: "1025px",
    lg: "1320px",
  },

  typography: {
    fontFamily: "quicksand, sans-serif",
    fontSize: {
      small: "12px",
      medium: "14px",
      large: "20px",
      xlarge: "22px",
      xxlarge: "28px",
      xxxlarge: "32px",
    },
    fontWeight: {
      light: "300",
      regular: "400",
      medium: "500",
      bold: "700",
    },
    lineHeight: {
      small: "1.4",
      medium: "1.6",
      large: "1.8",
    },
    letterSpacing: {
      normal: "0",
      wide: "0.05em",
      wider: "0.1em",
    },
  },
};

export default theme;
