import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const attendanceApi = createApi({
    reducerPath:'attendanceApi',
    baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:8000/api/` }),
    tagTypes:['Attendance'],
    endpoints:(builder)=>({
        getAttendance:builder.query({
            query:()=>({
                url:`Attendance`,
                method:`GET`
            }),
            providesTags:['Attendance']
        }),
    })
});


export const {useGetAttendanceQuery}=attendanceApi;