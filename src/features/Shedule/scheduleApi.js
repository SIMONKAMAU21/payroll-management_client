import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ScheduleApi = createApi({
    reducerPath: 'ScheduleApi',
    baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:8000/api/` }),
    tagTypes: ['Schedules'],
    endpoints: (builder) => ({
        getSchedules: builder.query({
            query: () => (
                {
                    url: `Schedules`,
                    method: `GET`
                }
            ),
            providesTags: ['Schedules']

        }),
        addSchedules: builder.mutation({
            query: (Schedules) => ({
                url: 'Schedules/register',
                method: 'POST',
                body: Schedules
            }),
            invalidatesTags: ['Schedules'],
        }),
        deleteSchedules: builder.mutation({
            query: (ID) => ({
                url: `Schedules/delete/${ID}`,
                method: `DELETE`
            }),
            invalidatesTags: ['Schedules'],
        }),
        updateSchedules: builder.mutation({
            query: (Schedules) => ({
                url: `Schedules/update/${ID}`,
                method:'PUT',
                body:Schedules
            }),
            invalidatesTags: ['Schedules']
        })
    })
});

export const { useGetSchedulesQuery, useAddSchedulesMutation, useDeleteSchedulesMutation,useUpdateSchedulesMutation } = ScheduleApi;
