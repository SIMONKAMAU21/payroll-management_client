import React, { useState } from 'react';
import './EmployeeTable.scss';
import { useGetEmployeesQuery, useDeleteEmployeeMutation } from './employeeApi'; 
import { ErrorToast, LoadingToast, SuccessToast, ToasterContainer } from '../../components/toaster/Toaster';
import UpdateUserForm from './updateEmployee';

const EmployeeTable = () => {
  const { data: employees, isLoading, isError } = useGetEmployeesQuery(); 
  const [deleteEmployee, { isLoading: deleteLoading }] = useDeleteEmployeeMutation();
  const [selectedEmployee, setSelectedEmployee] = useState(null);


  const handleRemoveEmployee = async (ID) => {
    try {
     const response= await deleteEmployee(ID) .unwrap();
      SuccessToast(response.message);
    } catch (error) {
      ErrorToast('Failed to remove employee');
    }
  };


  const handleEditEmployee = (ID) => {
    setSelectedEmployee(ID);
  };

  if (isLoading) {
    return ;
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
            <th>Schedule</th>
            <th>Address</th>
            <th>Image</th>
            <th>Date of birth</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.ID}>
              <td>{employee.Firstname}</td>
              <td>{employee.Lastname}</td>
              <td>{employee.Position}</td>
              <td>{employee.ID}</td>
              <td>{employee.Schedule}</td>
              <td>{employee.Address}</td>
              <td><img src={employee.PhotoURL} alt="nopic " srcset="" className='img' /></td>
              <td>{employee.BirthDate}</td>
              <td>{employee.ContactInfo}</td>
              <td>{employee.Email}</td>
              <td className='btn'>
              <button onClick={() => handleRemoveEmployee(employee.ID)} disabled={deleteLoading}>
                  Remove
                </button>
              <button onClick={() => handleEditEmployee(employee.ID)}>
                  Edit
                </button>
                
              
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedEmployee && <UpdateUserForm employee={selectedEmployee} onClose={() => setSelectedEmployee(null)} />}
    </div>
  );
};

export default EmployeeTable;
