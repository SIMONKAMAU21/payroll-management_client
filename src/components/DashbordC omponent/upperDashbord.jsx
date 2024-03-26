import React from 'react';
import '../DashbordC omponent/upperDashbord.scss';
import { useGetEmployeesQuery } from '../../features/Employeemanagement/employeeApi';
import { SuccessToast } from '../toaster/Toaster';

const UpperDashbord = () => {
   const { data: employees, isLoading } = useGetEmployeesQuery();

   // Filter employees with admin status
   const adminEmployees = employees ? employees.filter(employee => employee.Admin) : [];

   // Calculate total number of admin employees
   const totalAdmins = adminEmployees.length;
   SuccessToast('Welcome back')

   return (
      <div className="top-holder">
         <div className="div">
            <div className="head">
               <h2>Number of employees</h2>
            </div>
            <div className="total">
               <div className='text'><h3>Total</h3></div>
               <div className='number'><h3>{isLoading ? 'Loading...' : employees.length}</h3></div>
            </div>
         </div>
         <div className="div">
            <div className="head"> 
               <h2>Number of Admins</h2>
            </div>
            <div className="total">
               <div className='text'><h3>Total</h3></div>
               <div className='number'><h3>{isLoading ? 'Loading...' : totalAdmins}</h3></div>
            </div>
         </div>
         <div className="div">
            <div className="head"> 
               <h2>Total salary</h2>
            </div>
            <div className="total">
               <div className='text'><h3>Total</h3></div>
               <div className='number'><h3>$1002</h3></div>
            </div>
         </div>
      </div>
   );
}

export default UpperDashbord;
