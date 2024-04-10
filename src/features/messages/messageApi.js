import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const token=localStorage.getItem("token")
export const messageApi= createApi({
   reducerPath:"messageApi",
   baseQuery:fetchBaseQuery({baseUrl:`http://localhost:8000/api/`}),
   tagTypes:[`messages`],
   endpoints:(builder)=>({
      getMessages:builder.query({
        query:(Conversation_id)=>({
         url:`messages/${Conversation_id}`,
         method:`GET`,
         headers:{
            Authorization:` JWT ${token}`
        },
      }),
      providesTags:[`messages`],
      }),
      sendMessages:builder.mutation({
         query:(Message)=>({
            url:`sendmessages`,
            method:`POST`,
            headers:{
               Authorization:` JWT ${token}`
           },
            body:Message
         }),
         invalidatesTags:['messages']
      }),
   })
})

export const {useGetMessagesQuery,useSendMessagesMutation}=messageApi