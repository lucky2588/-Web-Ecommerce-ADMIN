import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseUrl = "http://localhost:8888/api/v1/public"
export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => `getCategories`
        }),
        getCategoryById: builder.query({
            query: (id) => `getCategory/${id}`
        }),
        
     
    }),

});

export const {useGetCategoriesQuery,useGetCategoryByIdQuery} = categoryApi;