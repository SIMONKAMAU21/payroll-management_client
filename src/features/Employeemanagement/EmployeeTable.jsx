import React, { useState } from 'react';
import './EmployeeTable.scss';
import { useGetEmployeesQuery, useDeleteEmployeeMutation } from './employeeApi'; 
import { ErrorToast, LoadingToast, SuccessToast } from '../../components/toaster/Toaster';
import UserDetailsModal from '../../components/DETAILS/userDetailes';

const EmployeeTable = () => {
  const { data: employees, isLoading, isError } = useGetEmployeesQuery(); 
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const handleRemoveEmployee = async (ID) => {
    LoadingToast()
    try {
      const response = await deleteEmployee(ID).unwrap();
      LoadingToast()
      SuccessToast(response.message);
      LoadingToast(false)
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
    return<p>loading...</p>;
  }

  if (isError) {
    return <ErrorToast/>;
  }

  return (
    <div className='table'>
      <table>
        <thead>
          <tr>
            <th>Fullnames</th>
            <th>Email</th>
            <th>ID</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.ID}>
              <td>{employee.Firstname} {employee.Lastname}</td>
              <td>{employee.Email}</td>
              <td>{employee.ID}</td>
              <td><img src={employee.PhotoURL} alt="no pic"  className='img'/></td>
              <td>
                <button onClick={() => handleRemoveEmployee(employee.ID)} className='btn2'>Remove</button>
                <button onClick={() => handleEditEmployee(employee.ID)}className='btn3'>Edit</button>
                <button onClick={() => handleSeeMore(employee.ID)}className='btn1'>See more</button>
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
