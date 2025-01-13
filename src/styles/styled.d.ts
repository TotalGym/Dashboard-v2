import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      "bg-primary": string;
      "bg-secondary": string;
      "font-primary": string;
      "font-secondary": string;
      "success-color": string;
      "fail-color": string;
      "border-primary": string;
      "border-secondary": string;
    };
    breakpoints: {
      sm: string;
      md: string;
      lg: string;
    };
    typography: {
      fontFamily: string; // Default font family
      fontSize: {
        small: string;
        medium: string;
        large: string;
        xlarge: string;
        xxlarge: string;
      };
      fontWeight: {
        light: string;
        regular: string;
        medium: string;
        bold: string;
      };
      lineHeight: {
        small: string;
        medium: string;
        large: string;
      };
      letterSpacing: {
        normal: string;
        wide: string;
        wider: string;
      };
    };
    grid: {
      col1: string;
      col2: string;
      col3: string;
      col4: string;
      col5: string;
      col6: string;
      col7: string;
      col8: string;
      col9: string;
      col10: string;
      col11: string;
      col12: string;
    };
  }
}
