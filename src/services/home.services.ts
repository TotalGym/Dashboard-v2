import { apiSlice } from "../app/api/api.slice";
import { HomeDataResponse } from "../types/response.types";

export const homeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHomeData: builder.query<HomeDataResponse, void>({
      query: () => "/home",
      providesTags: ["Home"],
    }),
  }),
});

export const { useLazyGetHomeDataQuery } = homeApiSlice;
