import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:8888/api/v1/admin/AnalysisData";
export const analysisApi = createApi({
  reducerPath: "analysisApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSale: builder.query({
      query: ({type ,time}) =>`getSales?type=${type}&time=${time}`,
    })
  }),
});

export const { useLazyGetSaleQuery  } = analysisApi;

// type=${type}&day=${day}&month=${month}&year=${year}
