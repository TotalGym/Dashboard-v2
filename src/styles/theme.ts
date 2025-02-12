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
    md: "1001px",
    lg: "1320px",
  },

  typography: {
    fontFamily: "quicksand, sans-serif",
    fontSize: {
      small: "12px", // Small font size
      medium: "14px", // Medium font size
      large: "20px", // Large font size
      xlarge: "22px", // Extra large font size
      xxlarge: "28px", // Extra extra large font size
      xxxlarge: "32px",
    },
    fontWeight: {
      light: "300",
      regular: "400",
      medium: "500",
      bold: "700",
    },
    lineHeight: {
      small: "1.4", // Line height for small text
      medium: "1.6", // Line height for medium text
      large: "1.8", // Line height for large text
    },
    letterSpacing: {
      normal: "0", // Default letter spacing
      wide: "0.05em", // Slightly wide spacing
      wider: "0.1em", // Wider spacing
    },
  },
};

export default theme;
