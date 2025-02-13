import { apiSlice } from "../../app/api/api.slice";
import {
  DeleteProductResponse,
  GetAddUpdateProduct,
  GetAllProductsResponse,
} from "../../types/response.types";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<
      GetAllProductsResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => `/store?page=${page}&limit=${limit}`,
      providesTags: ["Products"],
    }),
    getProductById: builder.query<GetAddUpdateProduct, { id?: string }>({
      query: ({ id }) => `/store/${id}`,
      providesTags: ["Products"],
    }),
    deleteProduct: builder.mutation<DeleteProductResponse, string>({
      query: (productId) => ({
        url: `/store/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useDeleteProductMutation,
} = productsApiSlice;
