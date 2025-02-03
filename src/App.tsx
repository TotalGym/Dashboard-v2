import { ThemeProvider } from "styled-components";

import Router from "./router/router";

import theme from "./styles/theme";
import { GlobalStyle } from "./styles/global.styles";
import { ResetStyles } from "./styles/reset.styles";
import { useAppDispatch } from "./app/hooks";
import { useLazyGetUserDataQuery } from "./features/auth/auth.api.slice";
import { useEffect } from "react";
import { getCredentials } from "./utils/auth/auth.utils";
import {
  logout,
  setCredentials,
  setUserData,
} from "./features/auth/auth.slice";

function App() {
  const dispatch = useAppDispatch();
  const [getUserData, { isLoading }] = useLazyGetUserDataQuery();

  useEffect(() => {
    const token = getCredentials();

    if (token) {
      dispatch(setCredentials(token));

      getUserData()
        .unwrap()
        .then((userData) => dispatch(setUserData(userData)))
        .catch(() => {
          dispatch(logout());
        });
    }
  }, [getUserData]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <ResetStyles />
        <GlobalStyle />
        {isLoading ? <p>Loading...</p> : <Router />}
      </ThemeProvider>
    </>
  );
}

export default App;
