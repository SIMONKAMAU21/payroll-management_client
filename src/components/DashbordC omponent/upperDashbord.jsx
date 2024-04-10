import React from 'react';
import '../DashbordC omponent/upperDashbord.scss';
import { useGetEmployeesQuery } from '../../features/Employeemanagement/employeeApi';
import { SuccessToast } from '../toaster/Toaster';

const UpperDashbord = () => {
   const { data: employees, isLoading ,isError} = useGetEmployeesQuery();
   const adminEmployees = employees ? employees.filter(employee => employee.Admin) : [];
   const totalAdmins = adminEmployees.length;
   SuccessToast('Welcome back')

   return (
      <div className="top-holder">
         <div className="div">
            <div className="head">
               <h3>Number of employees</h3>
            </div>
            <div className="total">
               <div className='text'><h3>Total</h3></div>
               <div className='number'><h3>{isLoading ? 'Loading...' :employees && employees.length}</h3>
               {isError?<div className='error'>error..</div>: "-"}
               </div>
            </div>
         </div>
         <div className="div">
            <div className="head"> 
               <h3>Number of Admins</h3>
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
