import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slice/authSlice";
import { authApi } from "./service/authApi";
import { blogApi } from "./service/blogApi";
import { productApi } from "./service/productApi";
import { categoryApi } from "./service/categoryApi";
import { brandApi } from "./service/brandApi";
import { userApi } from "./service/userApi";
import { orderApi } from "./service/orderApi";
import { infoApi } from "./service/infoApi";
import { analysisApi } from "./service/analysisApi";

export const store = configureStore(
    {
        reducer: {
            [brandApi.reducerPath]: brandApi.reducer,
            [infoApi.reducerPath]: infoApi.reducer,
            [orderApi.reducerPath]: orderApi.reducer,
            [categoryApi.reducerPath]: categoryApi.reducer,
            [userApi.reducerPath]: userApi.reducer,
            [productApi.reducerPath]: productApi.reducer,
            [blogApi.reducerPath]: blogApi.reducer,
            [analysisApi.reducerPath]: analysisApi.reducer,
            [authApi.reducerPath]: authApi.reducer,
            auth: authReducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(authApi.middleware, infoApi.middleware, userApi.middleware, brandApi.middleware, orderApi.middleware, blogApi.middleware,analysisApi.middleware ,productApi.middleware, categoryApi.middleware)
    },

)
