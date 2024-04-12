import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const token=localStorage.getItem("token")
export const attendanceApi = createApi({
    reducerPath: 'attendanceApi',
    baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:8000/api/` }),
    tagTypes: ['Attendance'],
    endpoints: (builder) => ({
        getAttendance: builder.query({
            query: () => ({
                url: `Attendance`,
                method: `GET`,
                headers:{
                    Authorization:`JWT ${token}`
                },
            }),
            providesTags:['Advance']
        }),
        addAttendance: builder.mutation({
            query: (Attendance) => ({
                url: `Attendance/record`,
                method: `post`,
                body: Attendance,
                headers:{
                    Authorization:`JWT ${token}`
                },
            }),
            invalidatesTags: ['Attendance']

        }),

        updateAttendance: builder.mutation({
            query: (Attendance) => ({
                url: `Attendance/update/${Attendance.AttendanceID}`,
                method: `PUT`,
                body: Attendance,
                headers:{
                    Authorization:`JWT ${token}`
                },
            }),
            invalidatesTags: ['Attendance']
        }),

        getAttendanceById: builder.query({
            query: (employeeId) => ({
                url: `Attendance/${employeeId}`,
                method: `GET`,
                headers:{
                    Authorization:`JWT ${token}`
                }
            }),
            providesTags: ['Attendance']
        }),
    })
});


export const { useGetAttendanceQuery, useAddAttendanceMutation, useUpdateAttendanceMutation,  useGetAttendanceByIdQuery} = attendanceApi;