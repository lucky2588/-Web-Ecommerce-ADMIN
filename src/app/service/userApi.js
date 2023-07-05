import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseUrl = "http://localhost:8888/api/v1/admin"
export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
    
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
   
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: ({page, pageSize} =  {page: 0, pageSize:4}) => `getUser?page=${page}&pageSize=${pageSize}`
        }),
        getUser: builder.query({
            query: (id) => `getUser/${id}`
        }),
        getTopCustomer: builder.query({
            query: () => `getBuyer`
        }),
          getUserByEmail: builder.query({
            query: (email) => `getUserByEmail?email=${email}`
        }),
        
        
    }),

});

export const {useGetUserQuery,useLazyGetUserQuery,useGetTopCustomerQuery,useLazyGetUsersQuery,useGetUserByEmailQuery} = userApi;