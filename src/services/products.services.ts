import { apiSlice } from "../app/api/api.slice";
import { ProductFormInputs } from "../components/product-forms/add-product-form.component";
import { Product } from "../types/products.types";
import {
  DeleteProductResponse,
  GetAddUpdateProduct,
  GetAllProductsResponse,
  GetSalesHistoryResponse,
  UnifiedResponse,
} from "../types/response.types";

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
      invalidatesTags: ["Products", "StoreReport"],
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
      invalidatesTags: ["Products", "StoreReport"],
    }),
    deleteProduct: builder.mutation<DeleteProductResponse, string>({
      query: (productId) => ({
        url: `/store/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products", "Sales-History", "StoreReport"],
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
      invalidatesTags: ["Products", "Sales-History", "StoreReport"],
    }),
    getSalesHistory: builder.query<
      GetSalesHistoryResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => `/sales?page=${page}&limit=${limit}`,
      providesTags: ["Sales-History"],
      // logic to merge incoming data with existing data
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        if (newItems.data.page === 1) {
          return newItems;
        }
        currentCache.data.results.push(...newItems.data.results);
        currentCache.data.next = newItems.data.next;
        return currentCache;
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg?.page !== previousArg?.page;
      },
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
