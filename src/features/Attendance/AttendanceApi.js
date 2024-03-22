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
        addAttendance:builder.mutation({
            query:(Attendance)=>({
                url:`Attendance/record`,
                method:`post`,
                body:Attendance
            }),
            providesTags:['Attendance']
        }),
        updateAttendance:builder.mutation({
            query:(Attendance)=>({
                url:`Attendance/update/${Attendance.AttendanceID}`,
                method:`PUT`,
                body:Attendance
            }),
            providesTags:['Attendance']

        }),
        getAttendanceById:builder.mutation({
            query:()=>({
                url:`Attendance${employeeId}`,
                method:`GET`
            }),
            providesTags:['Attendance']

        })
    })
});


export const {useGetAttendanceQuery,useAddAttendanceMutation,useUpdateAttendanceMutation,useGetAttendanceByIdMutation}=attendanceApi;