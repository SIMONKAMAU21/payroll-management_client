import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const token=localStorage.getItem("token")
export const conversationApi=createApi({
reducerPath:`conversationApi`,
baseQuery:fetchBaseQuery({baseUrl:`http://localhost:8000/api/`}),
tagTypes:[`conversation`],
endpoints:(builder)=>({
   getConversations:builder.query({
      query:()=>({
         url:`conversations`,
         method:`GET`,
         headers:{
            Authorization:`JWT ${token}`
        },

      }),
      providesTags:['conversation']
   })
})

})

export const {useGetConversationsQuery}=conversationApi