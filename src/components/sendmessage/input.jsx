import React, { useState } from 'react';
import { useSendMessagesMutation } from '../../features/messages/messageApi';
import { useGetConversationsQuery } from '../../features/conversation/conversationApi';
import { ErrorToast, LoadingToast, SuccessToast } from '../../components/toaster/Toaster';
import '../sendmessage/input.scss'


const Input = ({selectedConversationId}) => {
  const [messageContent, setMessageContent] = useState('');

  const [sendMessages, { isLoading, isError, error }] = useSendMessagesMutation();

  const currentUserID = JSON.parse(localStorage.getItem('userDetails')).ID;

  const handleSendMessage = async () => {
    LoadingToast(true)
    if (messageContent==="" ) {
      ErrorToast("enter text");
      LoadingToast(false)
    }else{
      try {
        const response = await sendMessages({ Content: messageContent, Sender_id: currentUserID, Conversation_id: selectedConversationId }).unwrap();
         SuccessToast(response.message)
         LoadingToast(false)
         setMessageContent('');
       } catch (error) {
         ErrorToast("oops message not sent")
         LoadingToast(false)
     }
    }
 
  };

  return (
    <div className='message-holder'>
      <textarea
        type="text"
        placeholder='Type text...'
        value={messageContent}
        onChange={e => setMessageContent(e.target.value)}
        disabled={isLoading}
      />
      <button onClick={handleSendMessage} disabled={isLoading}>Send</button>
      {isError && <div>Error: {error.message}</div>}
    </div>
  );
};

export default Input;
