export const saveCredentials = (token: string | null): void => {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    clearCredentials();
  }
};

export const getCredentials = (): string | void => {
  const token = localStorage.getItem("token");
  if (token) {
    return token;
  } else {
    clearCredentials();
  }
};

export const clearCredentials = (): void => {
  localStorage.removeItem("token");
};
