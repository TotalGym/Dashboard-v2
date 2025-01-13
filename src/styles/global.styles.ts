import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body{
    color: ${({ theme }) => theme.colors["font-primary"]};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
    font-style: normal;
  }
`;
