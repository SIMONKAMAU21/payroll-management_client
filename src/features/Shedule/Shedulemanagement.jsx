import React, { useState } from 'react';
import './Shedulemanagement.scss';
import { useGetSchedulesQuery, useUpdateSchedulesMutation, useDeleteSchedulesMutation, useAddSchedulesMutation } from './scheduleApi';
import { ErrorToast, SuccessToast, LoadingToast } from '../../components/toaster/Toaster';
import Modal from '../../components/modal/Modal';

const ScheduleManagement = () => {
   const { data: schedulesData, isLoading, isError } = useGetSchedulesQuery();
   const [shifts, setShifts] = useState([]);
   const [editedIndex, setEditedIndex] = useState(null);
   const [editedShift, setEditedShift] = useState({ date: '', StartTime: '', EndTime: '', employee: '' });
   const [updateSchedule] = useUpdateSchedulesMutation();
   const [deleteSchedule] = useDeleteSchedulesMutation();
   const [addSchedule] = useAddSchedulesMutation();
   const [showAddForm, setShowAddForm] = useState(false);
   const [modalOpen, setModalOpen]= useState(false)

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
      try {
         const formData = new FormData(event.target);
         
         const newShift = {
            Schedules_name: formData.get('scheduleName'),
            StartTime: formData.get('startTime'),
            EndTime: formData.get('endTime'),
            EmployeeID: formData.get('employee'),
         };
         const response = await addSchedule(newShift).unwrap();
         SuccessToast(response.message)
         setShowAddForm(false);
         setModalOpen(false)
      } catch (error) {
         ErrorToast(response.message)
         console.error('Error adding shift:', error);
      }
   };
``
   return (
      <div className="schedule-management">
         <h2>Schedule Management</h2>
         <button onClick={toggleModal}>Add Shift</button>
         <Modal isOpen={modalOpen} >
            <form onSubmit={handleAddShift} className='schedule_form'>
               <div className="hold">   <div><input type="text" name="scheduleName" autoComplete='on' placeholder="Schedule Name" /></div>
                  <div>     <input type="datetime-local" name="startTime" placeholder="Start Time" /></div>
                  <div><input type="datetime-local" name="endTime" placeholder="End Time" /></div>
                  <div> <input type="text" name="employee" placeholder="Employee" /></div></div>
               <div className='btne'>
                  <button type="submit">Add</button>

               </div>
            </form>
         </Modal>
         <table>
            <thead>
               <tr>
                  <th>Schedule Name</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Employee</th>
                  <th>ID</th>
                  <th>Options</th>
               </tr>
            </thead>
            <tbody>
               {isError && <p><ErrorToast /></p>}
               {schedulesData && schedulesData.map((shift, index) => (
                  <tr key={index}>
                     <td>{shift.Schedules_name}</td>
                     <td>{shift.StartTime}</td>
                     <td>{shift.EndTime}</td>
                     <td>{shift.Firstname} {shift.Lastname}</td>
                     <td>{shift.ID}</td>
                     <td className='btn'>
                        { (
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
