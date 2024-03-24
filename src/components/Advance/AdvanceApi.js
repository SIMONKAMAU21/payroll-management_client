import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const AdvanceApi =createApi({
    reducerPath:"AdvanceApi",
    baseQuery:fetchBaseQuery({baseUrl:`http://localhost:8000/api/`}),
    tagTypes:['Advance'],
    endpoints:(builder)=>({
        getAllAdvances:builder.query({
            query:()=>({
                url:`Advance`,
                method:`GET`
            }),
            providesTags:['Advance']
        }),
        addAdvance:builder.mutation({
            query:(Advance)=>({
                url:`Advance/register`,
                method:`POST`,
                body:Advance

            }),
            providesTags:['Advance']
        }),
        deleteAdvance:builder.mutation({
            query:(ID)=>({
                url:`Advance/delete/${ID}`,
                method:`DELETE`,
            }),
            providesTags:["Advance"]
        }),
        gettingAdvanceByEmployeeiD:builder.mutation({
            query:(EmployeeID)=>({
                url:`Advance/employee/${EmployeeID}`,
                method:`GET`,

            }),
            providesTags:['Advance']
        })
    })
})
export const {useGetAllAdvancesQuery,useAddAdvanceMutation,useDeleteAdvanceMutation,useGettingAdvanceByEmployeeiDMutation}=AdvanceApi