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
        getNotificationInfo: builder.query({
            query: ({page, pageSize,chooseId} =  {page: 0, pageSize:10})  => `getNotificationInfo/${chooseId}?page=${page}&pageSize=${pageSize}`
        }),
        getNoticationOfUser: builder.query({
            query: () => `getNotificationOfUser`
        }),
        getNoticationOfAdmin: builder.query({
            query: () => `getNotificationOfAdmin`
        }),
        getBlogs: builder.query({
            query: () => `getBlogs`
        }),
     
    }),

});

export const {useGetInfoQuery,useLazyGetNotificationInfoQuery,useLazyGetNoticationOfAdminQuery,useLazyGetNoticationOfUserQuery,useGetBlogsQuery} = infoApi;