import {createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const payrollApi=createApi({
    reducerPath:"payrollApi",
    baseQuery:fetchBaseQuery({baseUrl:`http://localhost:8000/api/`}),
    tagTypes:['Payroll'],
    endpoints:(builder)=>({
        getPayroll:builder.query({
            query:()=>({
                url:`payrolls`,
                method:`GET`
            }),
            providesTags:['Payroll']
        }),
        addPayroll:builder.mutation({
            query:(payroll)=>({
                url:`payroll/register`,
                method:`POST`,
                body:payroll
            }),
            providesTags:['Payroll']
        }),
        getPayrollById:builder.mutation({
            query:()=>({
                url:`payroll/${EmployeeID}`,
                method:`GET`,
            }),
            providesTags:['Payroll']
        })
    })
})

export const{useGetPayrollQuery,useAddPayrollMutation,useGetPayrollByIdMutation}=payrollApi