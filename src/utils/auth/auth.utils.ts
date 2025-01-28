import { AuthState } from "../../features/auth/auth.slice";
import { AuthUserData } from "../../types/staff.types";

export const saveCredentials = (
  token: string | null,
  userData: AuthUserData | null
): void => {
  if (token && userData) {
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(userData));
  } else {
    clearCredentials();
  }
};

export const getCredentials = (): AuthState => {
  const token = localStorage.getItem("authToken");
  const userString = localStorage.getItem("user");
  const userData = userString ? (JSON.parse(userString) as AuthUserData) : null;
  return { token, userData };
};

export const clearCredentials = (): void => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
};
