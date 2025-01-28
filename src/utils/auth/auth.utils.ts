export const saveCredentials = (token: string | null): void => {
  if (token) {
    localStorage.setItem("authToken", token);
  } else {
    clearCredentials();
  }
};

export const getCredentials = (): string | void => {
  const token = localStorage.getItem("authToken");
  if (token) {
    return token;
  } else {
    clearCredentials();
  }
};

export const clearCredentials = (): void => {
  localStorage.removeItem("authToken");
};
