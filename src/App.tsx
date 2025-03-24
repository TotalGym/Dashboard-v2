import { ThemeProvider } from "styled-components";

import Router from "./router/router";

import theme from "./styles/theme";
import { GlobalStyle } from "./styles/global.styles";
import { ResetStyles } from "./styles/reset.styles";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { useLazyGetUserDataQuery } from "./services/auth.services";
import { useEffect, useState } from "react";
import { getCredentials } from "./utils/auth/auth.utils";
import {
  logout,
  selectUser,
  setCredentials,
  setUserData,
} from "./features/auth/auth.slice";
import { setHomeData, setIsHomeDataLoading } from "./features/home/home.slice";
import { setPrograms } from "./features/programs/programs.slice";
import Spinner from "./components/spinner/spinner.component";
import { setAvailableCoaches } from "./features/staff/staff.slice";
import { useLazyGetHomeDataQuery } from "./services/home.services";
import ScrollToTop from "./components/scroll-to-top/scroll-to-top.component";

function App() {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(selectUser);
  const [getUserData, { isLoading: isUserLoading }] = useLazyGetUserDataQuery();
  const [getHomeData] = useLazyGetHomeDataQuery();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const token = getCredentials();

    if (token) {
      dispatch(setCredentials(token));

      getUserData()
        .unwrap()
        .then((userData) => {
          dispatch(setUserData(userData.data.userData));
          setIsAuthChecked(true);
        })
        .catch(() => {
          dispatch(logout());
          setIsAuthChecked(true);
        });
    } else {
      setIsAuthChecked(true);
    }
  }, [getUserData]);

  useEffect(() => {
    const token = getCredentials();
    if (userData && token) {
      dispatch(setIsHomeDataLoading(true));
      getHomeData()
        .unwrap()
        .then((homeData) => {
          dispatch(setHomeData(homeData.data));
          dispatch(setPrograms(homeData.data.programs));
          dispatch(setAvailableCoaches(homeData.data.coaches));
          dispatch(setIsHomeDataLoading(false));
        });
    }
  }, [userData]);

  return (
    <>
      <ScrollToTop />
      <ThemeProvider theme={theme}>
        <ResetStyles />
        <GlobalStyle />
        {isUserLoading || !isAuthChecked ? <Spinner /> : <Router />}
      </ThemeProvider>
    </>
  );
}

export default App;
