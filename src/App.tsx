import { ThemeProvider } from "styled-components";

import Router from "./router/router";

import theme from "./styles/theme";
import { GlobalStyle } from "./styles/global.styles";
import { ResetStyles } from "./styles/reset.styles";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { useLazyGetUserDataQuery } from "./features/auth/auth.api.slice";
import { useEffect } from "react";
import { getCredentials } from "./utils/auth/auth.utils";
import {
  logout,
  selectUser,
  setCredentials,
  setUserData,
} from "./features/auth/auth.slice";
import { useGetHomeDataQuery } from "./features/home/home.api.slice";
import { setHomeData, setIsHomeDataLoading } from "./features/home/home.slice";
import { setPrograms } from "./features/programs/programs.slice";
import Spinner from "./components/spinner/spinner.component";
import { setAvailableCoaches } from "./features/staff/staff.slice";

function App() {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(selectUser);
  const [getUserData, { isLoading }] = useLazyGetUserDataQuery();
  const { data: HomeData } = useGetHomeDataQuery();

  useEffect(() => {
    const token = getCredentials();

    if (token) {
      dispatch(setCredentials(token));

      getUserData()
        .unwrap()
        .then((userData) => dispatch(setUserData(userData.data.userData)))
        .catch(() => {
          dispatch(logout());
        });
    }
  }, [getUserData]);

  useEffect(() => {
    if (userData) {
      dispatch(setIsHomeDataLoading(true));

      if (HomeData) {
        dispatch(setHomeData(HomeData.data));
        dispatch(setPrograms(HomeData.data.programs));
        dispatch(setAvailableCoaches(HomeData.data.coaches));
        dispatch(setIsHomeDataLoading(false));
      }
    }
  }, [userData, HomeData]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <ResetStyles />
        <GlobalStyle />
        {isLoading ? <Spinner /> : <Router />}
      </ThemeProvider>
    </>
  );
}

export default App;
