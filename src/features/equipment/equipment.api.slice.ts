import { apiSlice } from "../../app/api/api.slice";
import { EquipmentFormInputs } from "../../components/equipment-forms/add-equipment-form";
import { Equipment, GetEquipmentResponse } from "../../types/equipment";

export const equipmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllEquipment: builder.query<
      GetEquipmentResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => `/equipment?page=${page}&limit=${limit}`,
      providesTags: ["Equipment"],
    }),
    getEquipmentById: builder.query<Equipment, { id?: string }>({
      query: ({ id }) => `/equipment/${id}`,
      providesTags: ["Equipment"],
    }),
    addEquipment: builder.mutation<Equipment, EquipmentFormInputs>({
      query: (equipmentData) => ({
        url: "/equipment",
        method: "POST",
        body: equipmentData,
      }),
      invalidatesTags: ["Equipment"],
    }),
    deleteEquipment: builder.mutation<{ message: string }, string>({
      query: (equipmentID) => ({
        url: `/equipment/${equipmentID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Equipment"],
    }),
  }),
});

export const {
  useGetAllEquipmentQuery,
  useGetEquipmentByIdQuery,
  useDeleteEquipmentMutation,
  useAddEquipmentMutation
} = equipmentApiSlice;
