import { apiSlice } from "../app/api/api.slice";
import { AdminProfile, Profile } from "../types/profile.types";
import {
  GetAdminProfileResponse,
  GetProfileResponse,
  UpdateAdminProfileResponse,
} from "../types/response.types";

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
    getAdminProfileData: builder.query<GetAdminProfileResponse, void>({
      query: () => "/admin/profile",
      providesTags: ["profile"],
    }),
    updateAdminProgile: builder.mutation<
      UpdateAdminProfileResponse,
      Partial<AdminProfile>
    >({
      query: (updatedData) => ({
        url: "/admin/profile",
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["profile"],
    }),
  }),
});

export const {
  useLazyGetProfileDataQuery,
  useLazyGetAdminProfileDataQuery,
  useUpdateProfileMutation,
  useUpdateAdminProgileMutation,
} = profileApiSlice;
