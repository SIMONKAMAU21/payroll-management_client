import React, { useEffect, useState } from 'react';
import { LoadingToast, ErrorToast, SuccessToast } from '../../components/toaster/Toaster';
import { useGetOneUserMutation } from '../../features/Employeemanagement/employeeApi';
import '../userdetails/modal.scss'

const UserDetailsModal = ({ employee, onClose }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [getOneUser] = useGetOneUserMutation();

  useEffect(() => {
    const fetchUserDetails = async () => {
      setIsLoading(true);
      try {
        const response = await getOneUser(employee.ID).unwrap();
        setUserDetails(response);
        SuccessToast('succefull')
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (employee) {
      fetchUserDetails();
    }
  }, [employee, getOneUser]);

  const handleClose = () => {
    onClose();
  };

  if (!employee) {
    return null;
  }

  if (isLoading) {
    return <LoadingToast />;
  }

  if (isError) {
    return <ErrorToast message="Error fetching user details" />;
  }
console.log('employee',employee.Firstname)
  return (
    <div className="modal">
      <div className="modal-content">
        <span >&times;</span>
        <div className="close" onClick={handleClose}>show less</div>
        {employee && (
            <div>
              <h2>{employee.Firstname}</h2>
            <img src={employee.PhotoURL} alt="User" className="user-image" />
            <ul>
              <li>
                <strong>Firstname:</strong> {employee.Firstname}
              </li>
              <li>
                <strong>Lastname:</strong> {employee.Lastname}
              </li>
              <li>
                <strong>Position:</strong> {employee.TimeIn}
              </li>
              <li>
                <strong>ID:</strong> {employee.ID}
              </li>
              <li>
                <strong>Schedule:</strong> {employee.Schedule}
              </li>
              <li>
                <strong>Address:</strong> {employee.Address}
              </li>
              <li>
                <strong>Date of birth:</strong> {employee.BirthDate}
              </li>
              <li>
                <strong>Contact:</strong> {employee.ContactInfo}
              </li>
              <li>
                <strong>Email:</strong> {employee.Email}
              </li>
              {/* Add more fields as needed */}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetailsModal;
