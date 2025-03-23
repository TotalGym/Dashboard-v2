import { apiSlice } from "../app/api/api.slice";

export const adminsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdmins: builder.query({
      query: () => "/admins",
    }),
  }),
});

export const { useGetAdminsQuery } = adminsApiSlice;
