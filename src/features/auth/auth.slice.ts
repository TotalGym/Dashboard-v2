import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthUserData } from "../../types/staff.types";
import { RootState } from "../../app/store";
import {
  saveCredentials,
  clearCredentials as clearLocalCredentials,
} from "../../utils/auth/auth.utils";

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
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.userData = action.payload.userData;
      saveCredentials(action.payload.token, action.payload.userData);
    },
    clearCredentials: (state) => {
      state.token = null;
      state.userData = null;
      clearLocalCredentials();
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.userData;
