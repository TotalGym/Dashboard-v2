import { apiSlice } from "../../app/api/api.slice";
import { ProgramFormInputs } from "../../components/ProgramForms/add-program-form.component";
import { GetProgramsResponse, Program } from "../../types/programs.types";

export const programsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPrograms: builder.query<
      GetProgramsResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => `/programs?page=${page}&limit=${limit}`,
      providesTags: ["Programs"],
    }),
    getProgramByName: builder.query<Program, { programName?: string }>({
      query: ({ programName }) => `/programs/program/${programName}`,
    }),
    addProgram: builder.mutation<Program, ProgramFormInputs>({
      query: (programData) => ({
        url: "/programs",
        method: "POST",
        body: programData,
      }),
      invalidatesTags: ["Programs"],
    }),
    deleteProgram: builder.mutation({
      query: (programID) => ({
        url: `/programs/${programID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Programs"],
    }),
  }),
});

export const {
  useGetProgramsQuery,
  useGetProgramByNameQuery,
  useAddProgramMutation,
  useDeleteProgramMutation,
} = programsApiSlice;
