import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const employeeApi= createApi({
    reducerPath:'employeeApi',
    baseQuery:fetchBaseQuery({baseUrl:API}),
    tagTypes:['Employees'],
    endpoints:(builder)=>({
        getEmployees:builder.query({
            query:()=>'Employees',
            providesTags:['Employees']
        })
    })
})