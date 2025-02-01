import { ThemeProvider } from "styled-components";

import Router from "./router/router";

import theme from "./styles/theme";
import { GlobalStyle } from "./styles/global.styles";
import { ResetStyles } from "./styles/reset.styles";

function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <ResetStyles />
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
