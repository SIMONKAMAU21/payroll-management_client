import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const positionApi = createApi({
    reducerPath: 'positionApi',
    baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:8000/api/` }),
    tagTypes: ['Positions'],
    endpoints: (builder) => ({
        getPositions: builder.query({
            query: () => (
                {
                    url: `Positions`,
                    method: `GET`
                }
            ),
            providesTags: ['Positions']

        }),
        addPositions: builder.mutation({
            query: (Positions) => ({
                url: 'Positions/register',
                method: 'POST',
                body: Positions
            }),
            invalidatesTags: ['Positions'],
        }),
        deletePositions: builder.mutation({
            query: (PositionID) => ({
                url: `Positions/delete/${PositionID}`,
                method: `DELETE`
            }),
            invalidatesTags: ['Positions'],
        }),
        updatePositions: builder.mutation({
            query: (Positions) => ({
                url: `Positions/update/${ID}`,
                method:'PUT',
                body:Positions
            }),
            invalidatesTags: ['Positions']
        })
    })
});

export const { useGetPositionsQuery, useAddPositionsMutation, useDeletePositionsMutation,useUpdatePositionsMutation } = positionApi;
