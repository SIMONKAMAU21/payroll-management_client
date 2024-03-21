import React, { useEffect, useState } from 'react';
import { LoadingToast, ErrorToast } from '../../components/toaster/Toaster';
import { useGetOneUserMutation } from '../../features/Employeemanagement/employeeApi';
import '../DETAILS/userDetailes.scss';

const UserDetailsModal = ({ employeeId, onClose }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [getOneUser] = useGetOneUserMutation();

  useEffect(() => {
    const fetchUserDetails = async () => {
      setIsLoading(true);
      try {
        const response = await getOneUser(employeeId).unwrap();
        setUserDetails(response);
        console.log('response', response)
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (employeeId) {
      fetchUserDetails();
    }
  }, [employeeId,getOneUser]);

  const handleClose = () => {
    onClose();
  };

  if (isLoading) {
    return <LoadingToast />;
  }

  if (isError) {
    return <ErrorToast message="Error fetching user details" />;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>close</span>
        <h2>User Details</h2>
        <div className="user-details-container">
          <div className="user-image-container">
            <img src={userDetails?.PhotoURL} alt="User" className="user-image" />
          </div>
          <div className="user-details">
            <p><strong>Firstname:</strong> {userDetails?.Firstname || "-"}</p>
            <p><strong>Lastname:</strong> {userDetails?.Lastname}</p>
            <p><strong>Position:</strong> {userDetails?.Position}</p>
            <p><strong>ID:</strong> {userDetails?.ID}</p>
            <p><strong>Schedule:</strong> {userDetails?.Schedules_name}</p>
            <p><strong>TimeIn:</strong> {userDetails?.TimeIn}</p>
            <p><strong>TimeOut:</strong> {userDetails?.TimeOut}</p>
            <p><strong>StartTime:</strong> {userDetails?.StartTime}</p>
            <p><strong>Address:</strong> {userDetails?.Address}</p>
            <p><strong>Date of birth:</strong> {userDetails?.BirthDate}</p>
            <p><strong>Contact:</strong>+254 {userDetails?.ContactInfo}</p>
            <p><strong>Email:</strong> {userDetails?.Email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
