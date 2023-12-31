import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseUrl = "http://localhost:8888/api/v1/public"
export const brandApi = createApi({
    reducerPath: "brandApi",
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        getBrand: builder.query({
            query: () => `getBrand`
        }),
        getBrandById: builder.query({
            query: (id) => `getBrand/${id}`
        }),
    
     
    }),

});

export const {useGetBrandQuery,useGetBrandByIdQuery} = brandApi;