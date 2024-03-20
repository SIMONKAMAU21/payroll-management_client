import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/' }),
  tagTypes: ['Employees'],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (employee) => ({
        url: 'users/login', 
        method: 'POST',
        body: employee,
      }),
      invalidatesTags: ['Employees'], 
    }),
  }),
});

export const {useLoginUserMutation}=loginApi;