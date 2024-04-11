import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const token=localStorage.getItem("token")
export const positionApi = createApi({
    reducerPath: 'positionApi',
    baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:8000/api/` }),
    tagTypes: ["Position"],
    endpoints: (builder) => ({
        getPositions: builder.query({
            query: () => ({
                    url: `Positions`,
                    method: `GET`,
                    headers:{
                        Authorization:` JWT ${token}`
                    },
                }),
                provideTags: ["Position"],
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
            invalidatesTags: ["Position"],
        }),
        deletePositions: builder.mutation({
            query: (PositionID) => ({
                url: `Positions/delete/${PositionID}`,
                method: `DELETE`,
                headers:{
                    Authorization:`JWT ${token}`
                },
            }),
            invalidatesTags: ["Position"],
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
            invalidatesTags: ['Position']
        }),
        getPositionsById:builder.query({
            query:(ID)=>({
                url:`Positions/${ID}`,
                method:'GET',
                headers:{
                    Authorization:` JWT ${token}`
                },
            }),
            providesTags:["Position"]
        }),
    }),
});

export const { useGetPositionsQuery, useAddPositionsMutation, useDeletePositionsMutation,useUpdatePositionsMutation,useGetPositionsByIdQuery } = positionApi;
