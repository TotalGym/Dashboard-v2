import { apiSlice } from "../../app/api/api.slice";
import {
  DeleteTraineeResponse,
  GetAddUpdateTrainee,
  GetTraineesDataResponse,
  SearchTraineeByNameResponse,
} from "../../types/response.types";

export type AddTraineeRequest = {
  name: string;
  contact: {
    email: string;
    phoneNumber: string;
  };
  password: string;
  gender: string;
  subscriptionType: string;
  selectedPrograms: string[];
  assignedCoach?: string;
};

export const traineesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTraineesData: builder.query<
      GetTraineesDataResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => `/trainee?page=${page}&limit=${limit}`,
      providesTags: ["Trainees"],
    }),
    getTraineeDataById: builder.query<GetAddUpdateTrainee, { id: string }>({
      query: ({ id }) => `/trainee/${id}`,
      providesTags: ["Trainees"],
    }),
    addTraine: builder.mutation<GetAddUpdateTrainee, AddTraineeRequest>({
      query: (traineeData) => ({
        url: "/trainee",
        method: "POST",
        body: traineeData,
      }),
      invalidatesTags: ["Trainees", "Home", "TraineeReport"],
    }),
    editTrainee: builder.mutation<
      GetAddUpdateTrainee,
      { traineeID: string; updatedFields: Partial<AddTraineeRequest> }
    >({
      query: ({ traineeID, updatedFields }) => ({
        url: `trainee/${traineeID}`,
        method: "PUT",
        body: updatedFields,
      }),
      invalidatesTags: ["Trainees", "TraineeReport"],
    }),
    deleteTrainee: builder.mutation<DeleteTraineeResponse, string>({
      query: (traineeID) => ({
        url: `/trainee/${traineeID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Trainees", "Home", "TraineeReport"],
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
  useAddTraineMutation,
  useEditTraineeMutation,
  useDeleteTraineeMutation,
} = traineesApiSlice;
