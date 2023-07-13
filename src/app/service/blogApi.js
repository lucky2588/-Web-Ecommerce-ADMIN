import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseUrl = "http://localhost:8888/api/v1/public"
export const blogApi = createApi({
    reducerPath: "blogApi",
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
        getBlogs: builder.query({
            query: ({ page, pageSize } = { page: 0, pageSize: 6 }) => `getBlogsOfAdmin?page=${page}&pageSize=${pageSize}`
        }),
        getBlogsByAuthor: builder.query({
            query: ({ page, pageSize } = { page: 0, pageSize: 6 }) => `getBlogsOfAuthor?page=${page}&pageSize=${pageSize}`
        }),
        getBlogById: builder.query(
            {
                query: (blogId) => `blog/${blogId}`
            }
        ),
        getCommentBlog: builder.query(
            {
                query:  ({ page, pageSize , blogId } = { page: 0, pageSize: 5 }) => `commentBlog/${blogId}?page=${page}&pageSize=${pageSize}`
            }
        ),
        getLastIdOfBlogs: builder.query(
            {
                query: ()=> `getLastIdOfBlogs`
            }
        ),
        getBlogWithBrand : builder.query(
            {
                query: ({blogId,brandId})=> `findBrand/${blogId}/${brandId}`
            }
        ),
    }),

});

export const { useGetBlogsQuery, useLazyGetBlogsQuery,useLazyGetBlogsByAuthorQuery,useLazyGetLastIdOfBlogsQuery,useGetBlogByIdQuery,useLazyGetCommentBlogQuery,useGetBlogWithBrandQuery,useGetLastIdOfBlogsQuery} = blogApi;