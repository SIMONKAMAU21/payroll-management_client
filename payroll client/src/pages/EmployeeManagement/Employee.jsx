import React from 'react'
import '../EmployeeManagement/Employee.scss'
import ReactDOM from 'react-dom';
import { useState } from 'react';
import AddEmployee from '../../components/Employeemanagement/AddEmployee';
import EmployeeTable from '../../components/Employeemanagement/EmployeeTable';


const Employee = () => {
   const [isEmployeeOpen, setEmployeeOpen] = useState(false);


   const openEmployee = () => {
      setEmployeeOpen(true);
   };

   const closeEmployee = () => {
      setEmployeeOpen(false);
   };

   return (
      <div className='employee'>
         <div className="btn" onClick={() => openEmployee(Employee)}>
            {isEmployeeOpen &&
               ReactDOM.createPortal(
                  <AddEmployee closeEmployee={closeEmployee} />,
                  document.body
               )
            }
            <button>Add Emloyee</button>
         </div>
         <EmployeeTable/>

      </div>
   )
}

export default Employee