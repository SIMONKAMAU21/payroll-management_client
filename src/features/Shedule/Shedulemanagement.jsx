import React, { useState } from 'react';
import './Shedulemanagement.scss';
import { useGetSchedulesQuery, useUpdateSchedulesMutation, useDeleteSchedulesMutation, useAddSchedulesMutation } from './scheduleApi';
import { ErrorToast, SuccessToast, LoadingToast } from '../../components/toaster/Toaster';
import { useGetEmployeesQuery } from '../Employeemanagement/employeeApi';
import Modal from '../../components/modal/modal'
import { StyleSheet, Text, View, PDFDownloadLink } from '@react-pdf/renderer'

const ScheduleManagement = () => {
   const { data: schedulesData, isLoading, isError } = useGetSchedulesQuery();
   const [shifts, setShifts] = useState([]);
   const [editedShift, setEditedShift] = useState({ date: '', StartTime: '', EndTime: '', employee: '' });
   const [updateSchedule] = useUpdateSchedulesMutation();
   const [deleteSchedule] = useDeleteSchedulesMutation();
   const [addSchedule] = useAddSchedulesMutation();
   const { data: employees } = useGetEmployeesQuery();
   const [showAddForm, setShowAddForm] = useState(false);
   const [modalOpen, setModalOpen] = useState(false)
   const editShift = (index) => {
      setEditedIndex(index);
      setEditedShift(shifts[index]);
      toggleModal();
   };

   const updateShift = async (index) => {
      try {
         await updateSchedule({ ID: shifts[index].ID, ...editedShift });
         setEditedIndex(null);
         setEditedShift({ date: '', StartTime: '', EndTime: '', employee: '' });
      } catch (error) {
         console.error('Error updating shift:', error);
      }
   };

   const deleteShift = async (id) => {
      try {
         const response = await deleteSchedule(id).unwrap();
         SuccessToast(response.message);
         const updatedShifts = shifts.filter((shift) => shift.ID !== id);
         setShifts(updatedShifts);
      } catch (error) {
         console.error('Error deleting shift:', error);
      }
   };

   const toggleModal = () => {
      setModalOpen(!showAddForm);
   };

   const handleAddShift = async (event) => {
      event.preventDefault();
      LoadingToast(true)

      try {
         const formData = new FormData(event.target);

         const newShift = {
            StartTime: formData.get('startTime'),
            EndTime: formData.get('endTime'),
            EmployeeID: formData.get('employee'),
         };
         const response = await addSchedule(newShift).unwrap();
         LoadingToast(false)
         SuccessToast(response.message)

         setModalOpen(false)
      } catch (error) {
         ErrorToast("Schedule exists")
         LoadingToast(false)
         setModalOpen(false)
      }
   };

   return (
      <div className="schedule-management">
         <h2>Schedule Management</h2>
         <button onClick={toggleModal}>Add Schedule</button>
         <Modal isOpen={modalOpen} >
            <form onSubmit={handleAddShift} className='schedule_form'>
               <div>  <input type="date" name="startTime" placeholder="Start Time" /></div>
               <div><input type="date" name="endTime" placeholder="End Time" /></div>
               <div><input type="text" name="Days" autoComplete='on' placeholder="Days" /></div>
               <div> <input type="text" name="employee" placeholder="Employee" /></div>
               <div>
                  <select >
                     <option>select employee</option>
                     {employees && employees.map(employee => (
                        <option key={employee.ID} >
                           {employee.Firstname} {employee.Lastname}
                        </option>

                     ))}

                  </select>
               </div>
               <div className='btne'>
                  <button type="submit">Add</button>

               </div>
            </form>
         </Modal>
         <table>
            <thead>
               <tr>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Employee</th>
                  <th>ID</th>
                  <th>Options</th>
               </tr>
            </thead>
            <tbody>
               {schedulesData && schedulesData.map((shift, index) => (
                  <tr key={index}>
                     <td>{shift.StartTime ? new Date(shift.StartTime).toLocaleDateString() : '-'}</td>
                     <td>{shift.EndTime ? new Date(shift.EndTime).toLocaleDateString() : '-'}</td>
                     <td>{shift.Firstname} {shift.Lastname}</td>
                     <td>{shift.EmployeeID}{shift.ID}</td>
                     <td className='btn'>
                        {(
                           <>
                              <button onClick={() => editShift(index)}>Edit</button>
                              <button onClick={() => deleteShift(shift.ID)}>Delete</button>
                           </>
                        )}
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};

export default ScheduleManagement;
