import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const DeductionApi = createApi({
    reducerPath: "DeductionApi",
    baseQuery: fetchBaseQuery({ baseUrl: ` http://localhost:8000/api/`}),
    tagTypes: ['Deduction'],
    endpoints: (builder) => ({
        getAllDeductions: builder.query({
            query: () => ({
                url: `Deduction`,
                method: `GET`
            }),
            providesTags: ['Deduction']
        }),
        addDeduction: builder.mutation({
            query: (Deduction) => ({
                url: `Deduction/register`,
                method: `POST`,
                body: Deduction

            }),
            providesTags: ['Deduction']
        }),
        deleteDeduction: builder.mutation({
            query: (DeductionID) => ({
                url: `Deduction/delete/${DeductionID}`,
                method: `DELETE`,
            }),
            providesTags: ["Deduction"]
        }),
        gettingDeductionByEmployeeiD: builder.mutation({
            query: (EmployeeID) => ({
                url: `Deduction/employee/${EmployeeID}`,
                method: `GET`,

            }),
            providesTags: ['Deduction']
        })
    })
})
export const { useGetAllDeductionsQuery, useAddDeductionMutation, useDeleteDeductionMutation, useGettingDeductionByEmployeeiDMutation } = DeductionApi