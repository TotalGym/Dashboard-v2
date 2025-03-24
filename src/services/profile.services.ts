import { apiSlice } from "../app/api/api.slice";
import { GetProfileResponse } from "../types/response.types";

export const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfileData: builder.query<GetProfileResponse, void>({
      query: () => "/profile",
      providesTags: ["profile"],
    }),
    updateProfile: builder.mutation({
      query: (updatedProfileData) => ({
        url: "/profile",
        method: "PATCH",
        body: updatedProfileData,
      }),
      invalidatesTags: ["profile"],
    }),
  }),
});

export const { useGetProfileDataQuery, useUpdateProfileMutation } =
  profileApiSlice;
