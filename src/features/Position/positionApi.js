import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const token=localStorage.getItem("token")
export const positionApi = createApi({
    reducerPath: 'positionApi',
    baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:8000/api/` }),
    tagTypes: ['Positions'],
    endpoints: (builder) => ({
        getPositions: builder.query({
            query: () => ({
                    url: `Positions`,
                    method: `GET`,
                    headers:{
                        Authorization:` JWT ${token}`
                    },
                    provideTags: ['Positions'],
                 }),
        }),
        addPositions: builder.mutation({
            query: (Positions) => ({
                url: 'Positions/register',
                method: 'POST',
                body: Positions,
                headers:{
                    Authorization:` JWT ${token}`
                },
            }),
            invalidatesTags: ['Positions'],
        }),
        deletePositions: builder.mutation({
            query: (PositionID) => ({
                url: `Positions/delete/${PositionID}`,
                method: `DELETE`,
                headers:{
                    Authorization:`JWT ${token}`
                },
            }),
            invalidatesTags: ['Positions'],
        }),
        updatePositions: builder.mutation({
            query: (Positions) => ({
                url: `Positions/update/${ID}`,
                method:'PUT',
                body:Positions,
                headers:{
                    Authorization:` JWT ${token}`
                },
            }),
            invalidatesTags: ['Positions']
        }),
        getPositionsById:builder.query({
            query:(ID)=>({
                url:`Positions/${ID}`,
                method:'GET',
                headers:{
                    Authorization:` JWT ${token}`
                },
                providesTags:['Positions']
            }),
        }),
    }),
});

export const { useGetPositionsQuery, useAddPositionsMutation, useDeletePositionsMutation,useUpdatePositionsMutation,useGetPositionsByIdQuery } = positionApi;
