import { apiSlice } from "../../app/api/api.slice";
import { ProgramFormInputs } from "../../components/Program-forms/add-program-form.component";
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
      providesTags: ["Programs"],
    }),
    addProgram: builder.mutation<Program, ProgramFormInputs>({
      query: (programData) => ({
        url: "/programs",
        method: "POST",
        body: programData,
      }),
      invalidatesTags: ["Programs"],
    }),
    updateProgram: builder.mutation<
      Program,
      { programID: string; updatedFields: unknown }
    >({
      query: ({ programID, updatedFields }) => ({
        url: `programs/${programID}`,
        method: "PUT",
        body: updatedFields,
      }),
      invalidatesTags: ["Programs"],
    }),
    deleteProgram: builder.mutation<{ message: string }, string>({
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
  useUpdateProgramMutation,
} = programsApiSlice;
