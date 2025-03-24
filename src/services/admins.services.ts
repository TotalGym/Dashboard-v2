import { apiSlice } from "../app/api/api.slice";
import {
  GetAddUpdateAdmin,
  GetAdmingsDataResponse,
} from "../types/response.types";
import { Admin } from "../types/staff.types";

export const adminsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdmins: builder.query<GetAdmingsDataResponse, void>({
      query: () => "/admin",
      providesTags: ["admins"],
    }),
    addAdmin: builder.mutation<GetAddUpdateAdmin, Partial<Admin>>({
      query: (adminData) => ({
        url: "admin",
        method: "POST",
        body: adminData,
      }),
      invalidatesTags: ["admins"],
    }),
    deleteAdmin: builder.mutation<{ success: boolean }, string>({
      query: (adminId) => ({
        url: `admin/${adminId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["admins"],
    }),
  }),
});

export const {
  useGetAdminsQuery,
  useAddAdminMutation,
  useDeleteAdminMutation,
} = adminsApiSlice;
