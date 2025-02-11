import { apiSlice } from "../../app/api/api.slice";
import { LoginInputs } from "../../components/Auth/login-form/login-form.component";
import { GetUserDataResponse, LoginResponse } from "../../types/response.types";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginInputs>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getUserData: builder.query<GetUserDataResponse, void>({
      query: () => "/auth/user",
    }),
  }),
});

export const { useLoginMutation, useLazyGetUserDataQuery } = authApiSlice;
