import { AuthState } from "../../features/auth/auth.slice";
import { AuthUserData } from "../../types/staff.types";

export const saveCredentials = (
  token: string | null,
  user: AuthUserData | null
): void => {
  if (token && user) {
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    clearCredentials();
  }
};

export const getCredentials = (): AuthState => {
  const token = localStorage.getItem("authToken");
  const userString = localStorage.getItem("user");
  const user = userString ? (JSON.parse(userString) as AuthUserData) : null;
  return { token, user };
};

export const clearCredentials = (): void => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
};
