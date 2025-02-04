import { apiSlice } from "../../app/api/api.slice";
import { GetProgramsResponse, Program } from "../../types/programs.types";

export const programsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPrograms: builder.query<
      GetProgramsResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => `/programs?page=${page}&limit=${limit}`,
    }),
    getProgramByName: builder.query<Program, { programName?: string }>({
      query: ({ programName }) => `/programs/program/${programName}`,
    }),
  }),
});

export const { useGetProgramsQuery, useGetProgramByNameQuery } =
  programsApiSlice;
