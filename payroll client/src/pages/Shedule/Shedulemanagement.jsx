import React, { useState } from 'react';
import '../Shedule/Shedulemanagement.scss';

const ScheduleManagement = () => {

   const [shifts, setShifts] = useState([]);


   const addShift = () => {
      const newShifts = [...shifts, { date: '2024-03-15', startTime: '09:00', endTime: '17:00', employee: 'simon kamau' }];
      setShifts(newShifts);
   };
   return (
      <div className="schedule-management">
         <h2>Schedule Management</h2>
         <button onClick={addShift}>Add Shift</button>
         <table>
            <thead>
               <tr>
                  <th>Date</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Employee</th>
                  <th>Option</th>
               </tr>
            </thead>
            <tbody>
               {shifts.map((shift, index) => (
                  <tr key={index}>
                     <td>{shift.date}</td>
                     <td>{shift.startTime}</td>
                     <td>{shift.endTime}</td>
                     <td>{shift.employee}</td>
                     <td className='btn'>
                        <button>Edit</button>
                        <button>Delete</button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};

export default ScheduleManagement;
