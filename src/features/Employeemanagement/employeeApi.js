import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const employeeApi = createApi({
    reducerPath: 'employeeApi',
    baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:8000/api/` }),
    tagTypes: ['Employees'],
    endpoints: (builder) => ({
        getEmployees: builder.query({
            query: () => (
                {
                    url: `users`,
                    method: `GET`
                }
            ),
            providesTags: ['Employees']

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
            query: (employee) => ({
                url: `users/update/${ID}`,
                method:'PUT',
                body:employee
            }),
            invalidatesTags: ['Employees']
        })
    })
});

export const { useGetEmployeesQuery, useAddEmployeeMutation, useDeleteEmployeeMutation,useUpdateEmployeeMutation } = employeeApi;
