import React, { useEffect, useState } from 'react';
import { useGetMessagesQuery } from './messageApi';
import '../messages/messages.scss';
import { useGetConversationsQuery } from '../conversation/conversationApi';
import Input from '../../components/sendmessage/input';
import { useGetparticipantsQuery } from '../participant/participantApi';

const Messages = () => {
   const [currentUserID, setCurrentUserID] = useState(null);
   const [selectedConversationId, setSelectedConversationId] = useState(null);
const{data:participant}=useGetparticipantsQuery(selectedConversationId)
console.log('participant', participant)

   useEffect(() => {
      const userDetails = JSON.parse(localStorage.getItem('userDetails'));
      if (userDetails) {
         setCurrentUserID(userDetails.ID);
      }
   }, []);

   const { data: conversations } = useGetConversationsQuery();

   useEffect(() => {
      if (conversations && conversations.length > 0 && selectedConversationId === null) {
         setSelectedConversationId(conversations[0].Conversation_Id);
      }
   }, [conversations, selectedConversationId]);

   const { data: messages, error, isLoading } = useGetMessagesQuery(selectedConversationId);

   if (isLoading) return <div>Loading...</div>;
   if (error) return <div className='error'>error...</div>;

   return (
      <div className='messages'>
         <div className="message1">
            {messages && messages.map(message => (
               <div key={message.Message_id} className={`message ${message.Sender_id === currentUserID ? 'right' : 'left'}`}>
                  <div className="holder">
                     <div className="image">
                        <div className="top">
                           {message.PhotoURL && <img src={message.PhotoURL} style={{ height: "50px", width: "50px", borderRadius: "50%" }} />}
                           <div className="date">
                              <div className="">
                                 {message.Sent_at ? new Date(message.Sent_at).toLocaleDateString() : "-"}
                              </div>
                              {message.Sent_at ? new Date(message.Sent_at).toLocaleTimeString() : "-"}
                           </div>
                        </div>
                        <div className="content">
                           {message.Content}
                        </div>
                     </div>
                  </div>
               </div>
            ))}
         </div>
         <div className="input1">
               <Input  selectedConversationId={selectedConversationId}/>
            </div>
         <div className="conversation">
            <div className="text">
               <h3>latest conversations</h3>
            </div>
            <div className="text1">
               {participant && conversations.map(conversation => (
                  <div key={conversation.Conversation_Id}>
                     <button
                        className="conversationButton"
                        onClick={() => setSelectedConversationId(conversation.Conversation_Id)}
                     >
                        <div className="title">
                           {conversation.Title || "-"}
                           <div className="div">
                              {conversation.Created_at ? new Date(conversation.Created_at).toLocaleDateString() : "-"}
                           </div>
                        </div>
                     </button>
                  </div>
               ))}
               {participant && participant.map(participant=>(
                  <div key={participant.Participant_id}>
                     {participant.Title|| "-"}


                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}

export default Messages;
