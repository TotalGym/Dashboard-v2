import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthUserData } from "../../types/staff.types";
import { RootState } from "../../app/store";
import { saveCredentials, clearCredentials } from "../../utils/auth/auth.utils";

export type AuthState = {
  token: string | null;
  userData: AuthUserData | null;
};

const initialState: AuthState = {
  token: null,
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
      clearCredentials();
    },
  },
});

export const { setCredentials, setUserData, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.userData;
