import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthUserData } from "../../types/staff.types";
import { RootState } from "../../app/store";
import {
  saveCredentials,
  clearCredentials,
  getCredentials,
} from "../../utils/auth/auth.utils";

export type AuthState = {
  token: string | null;
  userData: AuthUserData | null;
};

const initialState: AuthState = {
  token: getCredentials() || null,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      saveCredentials(action.payload);
    },
    setUserData: (state, action: PayloadAction<AuthUserData>) => {
      state.userData = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.userData = null;
      clearCredentials();
    },
  },
});

export const { setCredentials, setUserData, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectToken = (state: RootState) => state.auth.token;
export const selectUser = (state: RootState) => state.auth.userData;
export const selectRole = (state: RootState) => state.auth.userData?.role;
export const selectID = (state: RootState) => state.auth.userData?.id;
