import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/products" }),
  endpoints: (builder) => ({
    getProductByName: builder.query({
      query: () => `/`,
    }),
  }),
});

export const { useGetProductByNameQuery } = productsApi;
