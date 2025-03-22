import { apiSlice } from "../app/api/api.slice";

export const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPayment: builder.mutation<
      { success: boolean },
      { TraineeID: string; ProgramID: string }
    >({
      query: (paymentBody) => ({
        url: "/payments",
        method: "POST",
        body: paymentBody,
      }),
    }),
  }),
});

export const { useCreatePaymentMutation } = paymentApiSlice;
