import React from 'react';
import Messages from '../../../features/messages/messages';
import '../message/messageModal.scss'

const MessagesModal = ({ closeModal }) => {
   return (
      <div className="modal10">
         <div className="modal-content10">
            <span className="close10" onClick={closeModal}>close</span>
               <Messages />
            
         </div>
      </div>
   );
};

export default MessagesModal;
