import { apiSlice } from "../app/api/api.slice";
import {
  GetEquipmentReportResponse,
  GetPaymentReportResponse,
  GetProgramReportResponse,
  GetStaffReportResponse,
  GetStoreReportResponse,
  GetTraineeReportResponse,
} from "../types/response.types";

export const reportsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStoreReports: builder.query<
      GetStoreReportResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => ({
        url: "/report/store-report",
        params: { page, limit },
      }),
      providesTags: ["StoreReport"],
    }),
    getStaffReports: builder.query<
      GetStaffReportResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => ({
        url: "/report/staff-report",
        params: { page, limit },
      }),
      providesTags: ["StaffReport"],
    }),
    getTraineeReports: builder.query<
      GetTraineeReportResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => ({
        url: "/report/trainee-report",
        params: { page, limit },
      }),
      providesTags: ["TraineeReport"],
    }),
    getEquipmentReports: builder.query<
      GetEquipmentReportResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => ({
        url: "/report/equipment-report",
        params: { page, limit },
      }),
      providesTags: ["EquipmentReport"],
    }),
    getProgramReport: builder.query<
      GetProgramReportResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => ({
        url: "/report/programs-report",
        params: { page, limit },
      }),
      providesTags: ["ProgramReport"],
    }),
    getPaymentReports: builder.query<
      GetPaymentReportResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => ({
        url: "/report/payments-reports",
        params: { page, limit },
      }),
      providesTags: ["PaymentReport"],
    }),
  }),
});

export const {
  useGetStoreReportsQuery,
  useGetStaffReportsQuery,
  useGetTraineeReportsQuery,
  useGetEquipmentReportsQuery,
  useGetProgramReportQuery,
  useGetPaymentReportsQuery,
} = reportsApiSlice;
