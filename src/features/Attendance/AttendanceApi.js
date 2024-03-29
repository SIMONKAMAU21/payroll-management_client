import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const attendanceApi = createApi({
    reducerPath: 'attendanceApi',
    baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:8000/api/` }),
    tagTypes: ['Attendance'],
    endpoints: (builder) => ({
        getAttendance: builder.query({
            query: () => ({
                url: `Attendance`,
                method: `GET`,
            }),
            providesTags:['Advance']
        }),
        addAttendance: builder.mutation({
            query: (Attendance) => ({
                url: `Attendance/record`,
                method: `post`,
                body: Attendance
            }),
            invalidatesTags: ['Attendance']

        }),

        updateAttendance: builder.mutation({
            query: (Attendance) => ({
                url: `Attendance/update/${Attendance.AttendanceID}`,
                method: `PUT`,
                body: Attendance
            }),
            invalidatesTags: ['Attendance']
        }),

        getAttendanceById: builder.query({
            query: (Employee) => ({
                url: `Attendance/${Employee.ID}`,
                method: `GET`
            }),
            providesTags: ['Attendance']
        }),
    })
});


export const { useGetAttendanceQuery, useAddAttendanceMutation, useUpdateAttendanceMutation,  useGetAttendanceByIdQuery} = attendanceApi;