import React, { useState, useEffect } from 'react';
import { useAddAttendanceMutation, useUpdateAttendanceMutation } from '../../features/Attendance/AttendanceApi';
import { SuccessToast, ErrorToast } from '../../components/toaster/Toaster';
import '../Worktime/Worktime.scss';

const WorkTimer = () => {
  const [isWorking, setIsWorking] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [stopTime, setStopTime] = useState(null);
  const [motivation, setMotivation] = useState('');
  const [addAttendance] = useAddAttendanceMutation();
  const [updateAttendance] = useUpdateAttendanceMutation();
  const [employeeData, setEmployeeData] = useState(null);

  const Firstname = employeeData ? employeeData.Firstname : "";
  const motivationalMessages = [
    "You're doing great! Keep it up!",
    "Every accomplishment starts with the decision to try.",
    "Believe you can and you're halfway there.",
    "The harder you work for something, the greater you'll feel when you achieve it.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "Your limitation—it's only your imagination.",
    "Push yourself, because no one else is going to do it for you.",
    "Great things never come from comfort zones.",
    "Dream it. Wish it. Do it.",
    "Success doesn’t just find you. You have to go out and get it.",
    `Hello ${Firstname}, keep pushing!`, 
];

  const generateRandomMotivation = () => {
    const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
    return motivationalMessages[randomIndex];
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const randomMotivation = generateRandomMotivation();
      setMotivation(randomMotivation);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const userDetailsString = localStorage.getItem('userDetails');
    if (userDetailsString) {
      const userDetails = JSON.parse(userDetailsString);
      setEmployeeData(userDetails);
    }
  }, []);

  const startWorking = async () => {
      setIsWorking(true);
      const currentTime = new Date();
      setStartTime(currentTime);
      try {
        const currentDate = currentTime.toISOString().split('T')[0];
        
        const response = await addAttendance({ 
          EmployeeID: employeeData.ID, 
          Date: currentDate, 
          TimeIn: currentTime.toISOString() 
        }).unwrap();
  
        const attendanceId = response.message.ID.recordsets[0][0].ID;
        const { ID, message } = response.message;
        localStorage.setItem('attendanceId', attendanceId);
  
        SuccessToast(message);
      } catch (error) {
        console.error('Error recording attendance:', error);
      }
    
  };
  

  const stopWorking = async () => {
    setIsWorking(false);
    const currentTime = new Date();
    setStopTime(currentTime);
    const attendanceID = localStorage.getItem('attendanceId');
    if (!attendanceID) {
      ErrorToast("you dont bhave access") 
    }
  
    try {
      const response = await updateAttendance({ AttendanceID: parseInt(attendanceID), TimeOut: currentTime.toISOString() }).unwrap();
      SuccessToast(response.message);
      localStorage.removeItem('attendanceId'); 
    } catch (error) {
      ErrorToast(error.message || 'Failed to stop working.');
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
     <>
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
            <div className="img">
              <img className='employee-photo' src={employeeData.PhotoURL} alt="Employee Photo" />
            </div>
          </div>
        )}
      </div>
      <div className='worktimer-actions'>
        {isWorking ? (
          <button className='stop-button' onClick={stopWorking}>Stop Working</button>
        ) : (
          <button className='start-button' onClick={startWorking}>Start Working</button>
        )}
      </div>
      <div className="motivation">
        <div className="mtext">{motivation}</div>
      </div>
    </div>
    
     </>
  );
};

export default WorkTimer;
