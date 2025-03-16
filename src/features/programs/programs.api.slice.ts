import { apiSlice } from "../../app/api/api.slice";
import { ProgramFormInputs } from "../../components/Program-forms/add-program-form.component";
import { Program } from "../../types/programs.types";
import {
  DeleteProgramResponse,
  GetAddUpdateProgramResponse,
  GetProgramsResponse,
} from "../../types/response.types";

export const programsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPrograms: builder.query<
      GetProgramsResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => `/programs?page=${page}&limit=${limit}`,
      providesTags: ["Programs"],
    }),
    getProgramByName: builder.query<
      GetAddUpdateProgramResponse,
      { programName?: string }
    >({
      query: ({ programName }) => `/programs/program/${programName}`,
      providesTags: ["Programs"],
    }),
    addProgram: builder.mutation<
      GetAddUpdateProgramResponse,
      ProgramFormInputs
    >({
      query: (programData) => ({
        url: "/programs",
        method: "POST",
        body: programData,
      }),
      invalidatesTags: ["Programs", "Home", "ProgramReport"],
    }),
    updateProgram: builder.mutation<
      GetAddUpdateProgramResponse,
      { programID: string; updatedFields: Partial<Program> }
    >({
      query: ({ programID, updatedFields }) => ({
        url: `programs/${programID}`,
        method: "PUT",
        body: updatedFields,
      }),
      invalidatesTags: ["Programs", "ProgramReport"],
    }),
    deleteProgram: builder.mutation<DeleteProgramResponse, string>({
      query: (programID) => ({
        url: `/programs/${programID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Programs", "Home", "ProgramReport"],
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
