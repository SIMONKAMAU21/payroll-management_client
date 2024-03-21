import React from 'react'
import '../DashbordC omponent/upperDashbord.scss'
import { useGetEmployeesQuery  } from '../../features/Employeemanagement/employeeApi'

const UpperDashbord = () => {
   return (
      <div className="top-holder">
         <div className="div">
            <div className="head">
                     <h2>Number of employees</h2>
            </div>      <div className="total">
            <div className='text'><h3>Total</h3></div>
            <div className='number'><h3>1002</h3></div>
            </div>
         </div>
         <div className="div">
            <div className="head"> 
                 <h2>Number of Admins</h2>
            </div>      <div className="total">
            <div className='text'><h3>Total</h3></div>
               <div className='number'><h3>3</h3></div>
            </div>
         </div>
         <div className="div">
            <div className="head"> 
                 <h2>Total salary</h2>
            </div>      <div className="total">
               <div className='text'><h3>Total</h3></div>
               <div className='number'><h3>$1002</h3></div>
            </div>
         </div>
      </div>

   )
}

export default UpperDashbord