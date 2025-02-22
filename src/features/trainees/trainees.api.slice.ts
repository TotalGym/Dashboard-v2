import { apiSlice } from "../../app/api/api.slice";
import { SearchTraineeByNameResponse } from "../../types/response.types";
import { GetTraineesResponse } from "../../types/trainee.types";

export const traineesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTraineesData: builder.query<GetTraineesResponse, { page: number }>({
      query: ({ page }) => `/trainee?page=${page}`,
    }),
    searchTraineesByName: builder.query<
      SearchTraineeByNameResponse,
      { search: string }
    >({
      query: ({ search }) => `/trainee/search?search=${search}`,
    }),
  }),
});

export const { useGetTraineesDataQuery, useSearchTraineesByNameQuery } =
  traineesApiSlice;
