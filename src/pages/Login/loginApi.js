import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { post } from 'hooks'

export const loginApi = createApi ({
    reducerPath:'loginApi',
    baseQuery:fetchBaseQuery({baseUrl:'httP://localhost:8000/api/'}),
    tagTypes:['Employees'],
    endpoints:(builder)=>({
        loginApi:builder.mutation({
            query:(Employee)=>({
                url:'users',
                method:'post',
                body:Employee
            })
        })
    })
})