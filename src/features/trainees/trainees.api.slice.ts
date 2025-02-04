import { apiSlice } from "../../app/api/api.slice";
import { GetTraineesResponse } from "../../types/trainee.types";

export const traineesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTraineesData: builder.query<GetTraineesResponse, { page: number }>({
      query: ({ page }) => `/trainee?page=${page}`,
    }),
  }),
});

export const { useGetTraineesDataQuery } = traineesApiSlice;
