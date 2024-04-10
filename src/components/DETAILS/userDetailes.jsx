import React from 'react';
import { LoadingToast, ErrorToast, SuccessToast } from '../../components/toaster/Toaster';
import '../DETAILS/userDetailes.scss';
import { useGetOneUserQuery } from '../../features/Employeemanagement/employeeApi';

const UserDetailsModal = ({ employeeId, onClose }) => {
  const { data: userData, isLoading, isError } = useGetOneUserQuery(employeeId);

  const handleClose = () => {
    onClose();
  };

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (isError) {
    return <div className='error'>error..</div>;
  }
  if(userData === null) {
    SuccessToast("no user details");
    return null
  }
  
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>close</span>
        <h2>User Details</h2>
        <div className="user-details-container">
          <div className="user-image-container">
            <img src={userData?.PhotoURL} alt="User" className="user-image" />
          </div>
          <div className="user-details">
            <p><span>Firstname:</span> {userData?.Firstname || "-"}</p>
            <p><span><span>Lastname:</span></span> {userData?.Lastname} </p>
            <p><span><span>Position:</span></span> {userData?.Position}</p>
            <p><span><span>ID:</span></span> {userData?.ID}</p>
            <p><span><span>Schedule:</span></span> {userData?.Schedule}</p>
            <p><span>TimeIn:</span> {userData.TimeIn?new Date(userData.TimeIn).toLocaleTimeString(): '-'}</p>
            <p><span>TimeOut:</span> {userData.TimeOut ? new Date (userData.TimeOut).toLocaleTimeString(): '-'}</p>
            <p><span>StartTime:</span>{userData?.StartTime ? new Date (userData.StartTime).toLocaleTimeString(): '-'}</p>
            <p><span><span>EndTime:</span></span> {userData?.EndTime ? new Date (userData.EndTime).toLocaleTimeString(): '-'}</p>
            <p><span><span>Address:</span></span> {userData.Address}</p>
            <p><span><span>Date of birth:</span></span> {userData?.BirthDate ? new Date (userData.BirthDate).toLocaleDateString():"-"}</p>
            <p><span><span>Contact:</span></span>+254 {userData?.ContactInfo}</p>
            <p><span><span>Email:</span></span> {userData?.Email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
