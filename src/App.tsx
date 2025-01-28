import { useEffect } from "react";

import { ThemeProvider } from "styled-components";

import Router from "./router/router";
import { useAppDispatch } from "./app/hooks";
import { setCredentials } from "./features/auth/auth.slice";
import { getCredentials } from "./utils/auth/auth.utils";

import theme from "./styles/theme";
import { GlobalStyle } from "./styles/global.styles";
import { ResetStyles } from "./styles/reset.styles";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const { token, userData } = getCredentials();
    if (token && userData) {
      dispatch(setCredentials({ token, userData }));
    }
  }, []);

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
