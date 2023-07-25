import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseUrl = "http://localhost:8888/api/v1/order"
export const orderApi = createApi({
    reducerPath: "orderApi",
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
        getPayment: builder.query({
            query: (paymentId) => `getPayment/${paymentId}`
        }),
        getPayments: builder.query({
            query: (userId) => `getPaymentsOfUser/${userId}`
        }),
        getBillbyId: builder.query({
            query: (orderId) => `getOrder/${orderId}`
        }),
        getMyBill: builder.query({ // use to get Bill
            query: (email) => `getMyBill/${email}`
        }),
        getOrderToday: builder.query({ 
            query: () =>  `getOrderToday`
        }),
        getOrderAll: builder.query({
            query: ({page, pageSize,choose,time} =  {page: 0, pageSize:8})  => `getOrders/${choose}/${time}?page=${page}&pageSize=${pageSize}`
        }),
     
    }),

});

export const {useGetBillbyIdQuery,useGetPaymentsQuery,useLazyGetPaymentsQuery,useGetMyBillQuery,useLazyGetPaymentQuery,useGetPaymentQuery,useGetOrderTodayQuery,useLazyGetOrderAllQuery}  = orderApi;