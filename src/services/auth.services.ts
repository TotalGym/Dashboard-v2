import { apiSlice } from "../app/api/api.slice";
import { LoginInputs } from "../components/Auth/login-form/login-form.component";
import { GetUserDataResponse, LoginResponse } from "../types/response.types";

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
    changePasswrod: builder.mutation<
      { message: string; success: boolean; error: string },
      { oldPassword: string; newPassword: string; id: string }
    >({
      query: (passwordObject) => ({
        url: `/auth/changePassword/${passwordObject.id}`,
        method: "PUT",
        body: {
          oldPassword: passwordObject.oldPassword,
          newPassword: passwordObject.newPassword,
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLazyGetUserDataQuery,
  useChangePasswrodMutation,
} = authApiSlice;
