import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseUrl = "http://localhost:8888/api/v1/admin"
export const infoApi = createApi({
    reducerPath: "infoApi",
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl ,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
         
            if (token) {
           
                headers.set("Authorization", `Bearer ${token}`);
            }
         
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getInfo: builder.query({
            query: () => `getInfoTotal`
        }),
     
    }),

});

export const {useGetInfoQuery} = infoApi;