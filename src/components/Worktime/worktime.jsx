import React, { useState, useEffect } from 'react';
import { useAddAttendanceMutation, useUpdateAttendanceMutation } from '../../features/Attendance/AttendanceApi';
import { SuccessToast, ErrorToast } from '../../components/toaster/Toaster';
import '../Worktime/Worktime.scss';

const WorkTimer = () => {
  const [isWorking, setIsWorking] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [stopTime, setStopTime] = useState(null);
  const [addAttendance] = useAddAttendanceMutation();
  const [updateAttendance] = useUpdateAttendanceMutation(); // New hook to update attendance
  const [employeeData, setEmployeeData] = useState(null);
  const [attendanceId, setAttendanceId] = useState(null); // State to hold attendance ID

  useEffect(() => {
    const userDetailsString = localStorage.getItem('userDetails');
    if (userDetailsString) {
      const userDetails = JSON.parse(userDetailsString);
      setEmployeeData(userDetails);
    }

    const storedAttendanceId = localStorage.getItem('attendanceId');
    if (storedAttendanceId) {
      setAttendanceId(storedAttendanceId);
    }
  }, []);

  const startWorking = async () => {
    const confirmation = window.confirm('Are you sure you want to start working?');
    if (confirmation) {
      setIsWorking(true);
      const currentTime = new Date();
      setStartTime(currentTime);
      
      try {
        const response = await addAttendance({ EmployeeID: employeeData.ID, TimeIn: currentTime.toISOString() }).unwrap();
        const attendanceId = response.message.ID.recordsets[0][0].ID;
        const { ID, message } = response.message;
        localStorage.setItem('attendanceId', attendanceId);
  
        SuccessToast(message);
      } catch (error) {
        console.error('Error recording attendance:', error);
      }
    }
  };

  const stopWorking = async () => {
    const confirmation = window.confirm('Are you sure you want to stop working?');
    if (confirmation) {
      setIsWorking(false);
      const currentTime = new Date();
      setStopTime(currentTime);
      const attendanceID = localStorage.getItem('attendanceId');
      if (!attendanceID) {
        console.error('Attendance ID not found in localStorage.');
        return;
      }
      const body =  currentTime.toISOString()
      console.log(body);
      console.log(typeof(attendanceID));

      try {
        const response = await updateAttendance({ AttendanceID:attendanceID, TimeOut: currentTime.toISOString() } ).unwrap();
        console.log('response', response);
        SuccessToast(response.message);
        localStorage.removeItem('attendanceId'); 
      } catch (error) {
        console.error('Error updating attendance:', error);
        ErrorToast(response.message)
      }
    }
  };

  const calculateTotalTime = () => {
    if (startTime && stopTime) {
      const totalTime = Math.round((stopTime - startTime) / 1000);
      const hours = Math.floor(totalTime / 3600);
      const minutes = Math.floor((totalTime % 3600) / 60);
      const seconds = totalTime % 60;
      return `${hours}h ${minutes}m ${seconds}s`;
    }
    return 'N/A';
  };

  return (
    <div className='worktimer-container'> 
      <h2 className='worktimer-heading'>Work Timer</h2>
      <div className='worktimer-details'>
        <p><strong>Total time worked:</strong> {calculateTotalTime()}</p>
        {employeeData && (
          <div className='display'>
            <p><strong>Name:</strong> {employeeData.Firstname} {employeeData.Lastname}</p>
            <p><strong>Email:</strong> {employeeData.Email}</p>
            <p><strong>Address:</strong> {employeeData.Address}</p>
            <p><strong>Contact Info:</strong> {employeeData.ContactInfo}</p>
<div className="img">            <img className='employee-photo' src={employeeData.PhotoURL} alt="Employee Photo" />
</div>          </div>
        )}
      </div>
      <div className='worktimer-actions'>
        {isWorking ? (
          <button className='stop-button' onClick={stopWorking}>Stop Working</button>
        ) : (
          <button className='start-button' onClick={startWorking}>Start Working</button>
        )}
      </div>
    </div>
  );
};

export default WorkTimer;



export const formatDate = (dateString) => {
  const formattedDate = new Date(dateString);
  
  const formattedDateInUTC = formattedDate.getUTCDate();
  const formattedMonthInUTC = formattedDate.getUTCMonth() + 1; 
  const formattedYear = formattedDate.getUTCFullYear();
  
  return `${formattedMonthInUTC}/${formattedDateInUTC}/${formattedYear}`;
};
