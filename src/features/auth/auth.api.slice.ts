import { apiSlice } from "../../app/api/api.slice";
import { LoginInputs } from "../../components/Auth/login-form/login-form.component";
import { AuthState } from "./auth.slice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthState, LoginInputs>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
