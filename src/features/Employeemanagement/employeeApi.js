import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const employeeApi = createApi({
    reducerPath: 'employeeApi',
    baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:8000/api/` }),
    tagTypes: ['Employees'],
    endpoints: (builder) => ({
        getEmployees: builder.query({
            query: () => ({
                url: `users`,
                method: `GET`
            }),
            invalidatesTags: ['Employees'],
        }),
        addEmployee: builder.mutation({
            query: (employee) => ({
                url: 'users/register',
                method: 'POST',
                body: employee
            }),
            invalidatesTags: ['Employees'],
        }),
        deleteEmployee: builder.mutation({
            query: (ID) => ({
                url: `users/delete/${ID}`,
                method: `DELETE`
            }),
            invalidatesTags: ['Employees'],
        }),
        updateEmployee: builder.mutation({
            query: ( employee) => ({
                url: `users/update/${employee.ID}`,
                method: 'PUT',
                body: employee
            }),
            invalidatesTags: ['Employees']
        }),
        
        getOneUser: builder.mutation({
            query: (ID) => ({
                url: `users/byID/${ID}`,
                method: `GET`,
            }),
            invalidatesTags: ['Employees']
        }),
        getOneUserByEmail: builder.mutation({
            query: (Email) => ({
                url: `users/${Email}`,
                method: `GET`,
            }),
            invalidatesTags: ['Employees']
        }),
    }),
});

export const { useGetEmployeesQuery, useAddEmployeeMutation, useDeleteEmployeeMutation, useUpdateEmployeeMutation, useGetOneUserMutation, useGetOneUserByEmailMutation } = employeeApi;
