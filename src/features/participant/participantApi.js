import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const token=localStorage.getItem("token")
export const participantApi=createApi({
reducerPath:`participantApi`,
baseQuery:fetchBaseQuery({baseUrl:`http://localhost:8000/api/`}),
tagTypes:[`participant`],
endpoints:(builder)=>({
   getparticipants:builder.query({
      query:(ID)=>({
         url:`participant/${ID}`,
         method:`GET`,
         headers:{
            Authorization:` JWT ${token}`
        },
      }),
      providesTags:['participant']
   })
})

})

export const {useGetparticipantsQuery}=participantApi