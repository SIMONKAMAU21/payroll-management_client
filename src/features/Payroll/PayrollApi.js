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
            invalidatesTags:['Payroll']
        }),
        getPayrollById:builder.query({
            query:(Employee)=>({
                url:`Payrolls/${Employee.ID}`,
                method:`GET`,
            }),
            providesTags:['Payroll']
        }),
        getTotalPayrollByEmployeeID:builder.query({
            query:(Employee)=>({
                url:`Payrolls/${Employee.ID}`,
                method:`GET`,
            }),
            providesTags:['Payroll']
        })
    })
})

export const{useGetPayrollQuery,useAddPayrollMutation,useGetPayrollByIdQuery,useGetTotalPayrollByEmployeeIDQuery}=payrollApi