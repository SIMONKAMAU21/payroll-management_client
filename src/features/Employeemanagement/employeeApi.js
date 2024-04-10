import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const token=localStorage.getItem("token")
console.log('token', token)
export const employeeApi = createApi({
    reducerPath: 'employeeApi',
    baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:8000/api/` }),
    tagTypes: ['Employees'],
    endpoints: (builder) => ({
        getEmployees: builder.query({
            query: () => ({
                url: `users`,
                method: `GET`,
                headers:{
                    Authorization:` JWT ${token}`
                }
            }),
            providesTags : ['Employees'] 
}),
        addEmployee: builder.mutation({
            query: (employee) => ({
                url: 'users/register',
                method: 'POST',
                headers:{
                    Authorization:` JWT ${token}`
                },
                body: employee
            }),
            invalidatesTags: ['Employees'],
        }),
        deleteEmployee: builder.mutation({
            query: (ID) => ({
                url: `users/delete/${ID}`,
                method: `DELETE`,
                headers:{
                    Authorization:` JWT ${token}`
                }
            }),
            invalidatesTags: ['Employees'],
        }),
        updateEmployee: builder.mutation({
            query: ( employee) => ({
                url: `users/update/${employee.ID}`,
                method: 'PUT',
                body: employee,
                headers:{
                    Authorization:` JWT ${token}`
                },
            }),
            invalidatesTags:['Employees']
        }),
        
        getOneUser: builder.query({
            query: (ID) => ({
                url: `users/byID/${ID}`,
                method: `GET`,
                headers:{
                    Authorization:` JWT ${token}`
                }
            }),
            providesTags : ['Employees'] 
        }),
        getOneUserByEmail: builder.mutation({
            query: (Email) => ({
                url: `users/${Email}`,
                method: `GET`,
                headers:{
                    Authorization:` JWT ${token}`
                },
            }),
            invalidatesTags: ['Employees']
        }),
    }),
});

export const { useGetEmployeesQuery, useAddEmployeeMutation, useDeleteEmployeeMutation, useUpdateEmployeeMutation, useGetOneUserQuery, useGetOneUserByEmailMutation } = employeeApi;
