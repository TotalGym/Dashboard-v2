import { apiSlice } from "../../app/api/api.slice";
import {
  GetTraineeDataById,
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
    getTraineeDataById: builder.query<GetTraineeDataById, { id: string }>({
      query: ({ id }) => `/trainee/${id}`,
    }),
    searchTraineesByName: builder.query<
      SearchTraineeByNameResponse,
      { search: string }
    >({
      query: ({ search }) => `/trainee/search?search=${search}`,
      providesTags: ["Trainees"],
    }),
  }),
});

export const {
  useGetTraineesDataQuery,
  useGetTraineeDataByIdQuery,
  useLazySearchTraineesByNameQuery,
} = traineesApiSlice;
