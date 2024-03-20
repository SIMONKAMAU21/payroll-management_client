import React, { useState } from 'react';
import './EmployeeTable.scss';
import { useGetEmployeesQuery, useDeleteEmployeeMutation } from './employeeApi'; 
import { ErrorToast, LoadingToast, SuccessToast } from '../../components/toaster/Toaster';
import UpdateUserForm from './updateEmployee';
import UserDetailsModal from '../../components/DETAILS/userDetailes';

const EmployeeTable = () => {
  const { data: employees, isLoading, isError } = useGetEmployeesQuery(); 
  const [deleteEmployee, { isLoading: deleteLoading }] = useDeleteEmployeeMutation();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const handleRemoveEmployee = async (ID) => {
    try {
      const response = await deleteEmployee(ID).unwrap();
      SuccessToast(response.message);
    } catch (error) {
      ErrorToast('Failed to remove employee');
    }
  };

  const handleEditEmployee = (ID) => {
    setSelectedEmployee(ID);
  };
  const handleSeeMore = async (ID) => {
    setSelectedEmployee(ID);
    setShowDetailsModal(true); 
  };

  if (isLoading) {
    return <LoadingToast />;
  }

  if (isError) {
    return <ErrorToast message="Error fetching data" />;
  }

  return (
    <div className='table'>
      <table>
        <thead>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Position</th>
            <th>ID</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.ID}>
              <td>{employee.Firstname}</td>
              <td>{employee.Lastname}</td>
              <td>{employee.Position}</td>
              <td>{employee.ID}</td>
              <td><img src={employee.PhotoURL} alt="" srcset="" className='img'/></td>
              <td>
                <button onClick={() => handleRemoveEmployee(employee.ID)}>Remove</button>
                <button onClick={() => handleEditEmployee(employee.ID)}>Edit</button>
                <button onClick={() => handleSeeMore(employee.ID)}>See more</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     {showDetailsModal && (
        <UserDetailsModal  employeeId={selectedEmployee} onClose={() => setShowDetailsModal(false)} />
     )}
      
    </div>
  );
};

export default EmployeeTable;
