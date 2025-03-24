import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseQuery = retry(
  fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    timeout: 3000,
  }),
  {
    maxRetries: 3,
  }
);

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: [
    "Programs",
    "Equipment",
    "Products",
    "Home",
    "Sales-History",
    "Trainees",
    "Staff",
    "StoreReport",
    "StaffReport",
    "TraineeReport",
    "EquipmentReport",
    "ProgramReport",
    "PaymentReport",
    "admins",
  ],
  endpoints: () => ({}),
});
