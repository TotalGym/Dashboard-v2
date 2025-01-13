import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  colors: {
    "bg-primary": "#f9f9f9",
    "bg-secondary": "#2CD889",
    "font-primary": "#646D82",
    "font-secondary": "#2CD889",
    "success-color": "#28a745",
    "fail-color": "#dc3545",
    "border-primary": "#000000",
    "border-secondary": "#ffffff",
  },

  breakpoints: {
    sm: "580px",
    md: "925px",
    lg: "1024px",
  },

  typography: {
    fontFamily: "quicksand, sans-serif",
    fontSize: {
      small: "10px", // Small font size
      medium: "14px", // Medium font size
      large: "20px", // Large font size
      xlarge: "22px", // Extra large font size
      xxlarge: "30px", // Extra extra large font size
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
  grid: {
    col1: "8.33%",
    col2: "16.66%",
    col3: "25%",
    col4: "33.33%",
    col5: "41.66%",
    col6: "50%",
    col7: "58.33%",
    col8: "66.66%",
    col9: "75%",
    col10: "83.33%",
    col11: "91.66%",
    col12: "100%",
  },
};

export default theme;
