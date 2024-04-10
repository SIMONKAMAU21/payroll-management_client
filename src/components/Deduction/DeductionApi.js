import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const token=localStorage.getItem("token")
export const DeductionApi = createApi({
    reducerPath: "DeductionApi",
    baseQuery: fetchBaseQuery({ baseUrl: ` http://localhost:8000/api/`}),
    tagTypes: ['Deduction'],
    endpoints: (builder) => ({
        getAllDeductions: builder.query({
            query: () => ({
                url: `Deduction`,
                method: `GET`,
                headers:{
                    Authorization:`JWT ${token}`
                },
            }),
            providesTags: ['Deduction']
        }),
        addDeduction: builder.mutation({
            query: (Deduction) => ({
                url: `Deduction/register`,
                method: `POST`,
                body: Deduction,
                headers:{
                    Authorization:`JWT ${token}`
                },

            }),
            invalidatesTags:["Deduction"]
        }),
        deleteDeduction: builder.mutation({
            query: (DeductionID) => ({
                url: `Deduction/delete/${DeductionID}`,
                method: `DELETE`,
                headers:{
                    Authorization:`JWT ${token}`
                },
            }),
            invalidatesTags:["Deduction"]

        }),
        gettingDeductionByEmployeeiD: builder.query({
            query: (EmployeeID) => ({
                url: `Deduction/employee/${EmployeeID}`,
                method: `GET`,
                headers:{
                    Authorization:` JWT ${token}`
                },

            }),
            providesTags: ['Deduction']
        })
    })
})
export const { useGetAllDeductionsQuery, useAddDeductionMutation, useDeleteDeductionMutation, useGettingDeductionByEmployeeiDQuery } = DeductionApi