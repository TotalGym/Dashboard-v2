import { apiSlice } from "../../app/api/api.slice";
import {
  GetTraineesDataResponse,
  SearchTraineeByNameResponse,
} from "../../types/response.types";

export const traineesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTraineesData: builder.query<
      GetTraineesDataResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => `/trainee?page=${page}&limit=${limit}`,
      providesTags: ["Trainees"],
    }),
    searchTraineesByName: builder.query<
      SearchTraineeByNameResponse,
      { search: string }
    >({
      query: ({ search }) => `/trainee/search?search=${search}`,
    }),
  }),
});

export const { useGetTraineesDataQuery, useLazySearchTraineesByNameQuery } =
  traineesApiSlice;
