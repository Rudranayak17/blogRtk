
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const serverApi = "http://localhost:5173/api/v1/"
export const myApi = createApi({
  reducerPath: "myApi",
  baseQuery: fetchBaseQuery({
    baseUrl: serverApi
  }),

  endpoints: (builder) => ({
    getAllBlogs: builder.query<Blogpost, string>({
      query: (keyword = "naruto", tag = "", mostViews = false, numPages = 10, page = 1,mostLikes=true) => ({

        url: `blogs?keyword=${keyword}&sort=${tag}&mostViews=${mostViews}&mostLikes${mostLikes}&resultPerPage=${numPages}&page=${page}`,
        
        
        method: "GET",


      }),
    }),

    login: builder.mutation<Login, LoginUser>({
      query: (credentials) => ({
        url: "login", method: "POST",
        body: credentials,
        headers: {
          'Content-Type': 'application/json',
        },
      }),

    }),
    registration: builder.mutation<Login, FormData>({
      query: (credentials) => ({
        url: "register",
        method: "POST",
        body: credentials,
        headers: {
          'Content-Type': undefined,
        },
      }),
    }),
    logout: builder.query<Logout, string>({
      query: () => ({
        url: "logout",
        method: "GET",

      }),
    }),

  })
})

export const { useGetAllBlogsQuery, useLoginMutation, useRegistrationMutation, useLogoutQuery } = myApi