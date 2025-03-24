import { apiSlice } from "../app/api/api.slice";
import { Profile } from "../types/profile.types";
import { GetProfileResponse } from "../types/response.types";

export const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfileData: builder.query<GetProfileResponse, void>({
      query: () => "/profile",
      providesTags: ["profile"],
    }),
    updateProfile: builder.mutation<
      { message: string; error: null | string; success: boolean },
      Partial<Profile>
    >({
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
