import { apiSlice } from "../../app/api/api.slice";
import { ProductFormInputs } from "../../components/product-forms/add-product-form.component";
import { Product } from "../../types/products.types";
import {
  DeleteProductResponse,
  GetAddUpdateProduct,
  GetAllProductsResponse,
  GetSalesHistoryResponse,
  UnifiedResponse,
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
    addProduct: builder.mutation<GetAddUpdateProduct, ProductFormInputs>({
      query: (productData) => ({
        url: `/store`,
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation<
      GetAddUpdateProduct,
      { productId: string; updatedFields: Partial<Product> }
    >({
      query: ({ productId, updatedFields }) => ({
        url: `store/${productId}`,
        method: "PUT",
        body: updatedFields,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation<DeleteProductResponse, string>({
      query: (productId) => ({
        url: `/store/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    sellProduct: builder.mutation<
      UnifiedResponse,
      { ProductID: string; quantitySold: number; TraineeID: string }
    >({
      query: (purchaseDetails) => ({
        url: "/sales",
        method: "POST",
        body: purchaseDetails,
      }),
      invalidatesTags: ["Products"],
    }),
    getSalesHistory: builder.query<
      GetSalesHistoryResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => `/sales?page=${page}&limit=${limit}`,
      providesTags: ["Sales-History"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useDeleteProductMutation,
  useAddProductMutation,
  useUpdateProductMutation,
  useSellProductMutation,
  useGetSalesHistoryQuery,
} = productsApiSlice;
