import React from 'react';

const Modal = ({ isOpen, handleModalClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>&times;</span>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
