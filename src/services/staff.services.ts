import { apiSlice } from "../app/api/api.slice";
import { GetAddUpdateStaff, GetStaffResponse } from "../types/response.types";
import { Staff } from "../types/staff.types";

export const staffApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStaff: builder.query<GetStaffResponse, { page: number; limit: number }>({
      query: ({ page, limit }) => `/staff?page=${page}&limit=${limit}`,
      providesTags: ["Staff"],
    }),
    getStaffById: builder.query<GetAddUpdateStaff, { id?: string }>({
      query: ({ id }) => `/staff/${id}`,
      providesTags: ["Staff"],
    }),
    addStaff: builder.mutation<GetAddUpdateStaff, Partial<Staff>>({
      query: (staffData) => ({
        url: "/staff",
        method: "POST",
        body: staffData,
      }),
      invalidatesTags: ["Staff", "StaffReport"],
    }),
    updateStaff: builder.mutation<
      GetAddUpdateStaff,
      Partial<Staff> & { _id: string }
    >({
      query: (updatedStaffData) => ({
        url: `/staff/${updatedStaffData._id}`,
        method: "PUT",
        body: updatedStaffData,
      }),
      invalidatesTags: ["Staff", "StaffReport"],
    }),
    deleteStaff: builder.mutation<void, string>({
      query: (id) => ({
        url: `/staff/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Staff", "StaffReport"],
    }),
  }),
});

export const {
  useGetStaffQuery,
  useGetStaffByIdQuery,
  useAddStaffMutation,
  useUpdateStaffMutation,
  useDeleteStaffMutation,
} = staffApiSlice;
