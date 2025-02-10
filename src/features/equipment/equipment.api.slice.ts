import { apiSlice } from "../../app/api/api.slice";
import { Equipment, GetEquipmentResponse } from "../../types/equipment";

export const equipmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEquipments: builder.query<
      GetEquipmentResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => `/equipment?page=${page}&limit=${limit}`,
      providesTags: ["Equipments"],
    }),
    getEquipmentById: builder.query<Equipment, { id?: string }>({
      query: ({ id }) => `/equipment/${id}`,
      providesTags: ["Equipments"],
    }),
    deleteEquipment: builder.mutation<{ message: string }, string>({
      query: (equipmentID) => ({
        url: `/equipment/${equipmentID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Equipments"],
    }),
  }),
});

export const {
  useGetEquipmentsQuery,
  useGetEquipmentByIdQuery,
  useDeleteEquipmentMutation,
} = equipmentApiSlice;
