import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      "bg-primary": string;
      "bg-secondary": string;
      "font-primary": string;
      "font-secondary": string;
      "font-secondary-2": string;
      "success-color": string;
      "fail-color": string;
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
        xxxlarge:string;
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
  }
}
