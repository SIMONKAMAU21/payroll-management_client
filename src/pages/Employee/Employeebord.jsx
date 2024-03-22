import React, { useState, useEffect } from 'react';
import WorkTimer from '../../components/Worktime/worktime';
import '../Employee/Employeebord.scss';
import Clock from '../../components/clock/clock';
import PayrollRecord from '../../components/Payroll/payroll';
import { useGetAttendanceQuery, useUpdateAttendanceMutation, useAddAttendanceMutation } from '../../features/Attendance/AttendanceApi';

function EmployeeBord() {
  const { data: attendanceData } = useGetAttendanceQuery();
  const [updateAttendance] = useUpdateAttendanceMutation();
  const [addAttendance] = useAddAttendanceMutation();
  const [isWorkTimerVisible, setWorkTimerVisible] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [motivation, setMotivation] = useState('');

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

  const startWorking = async () => {
    const confirmation = window.confirm('Are you sure you want to start working?');
    if (confirmation) {
      setStartTime(new Date());
      setWorkTimerVisible(true);
      try {
        const currentTime = new Date();
        const response = await addAttendance({ EmployeeID: localStorage.getItem('employeeId'), TimeIn: currentTime.toISOString() });
        const attendanceId = response.data.ID;
        localStorage.setItem('attendanceId', attendanceId);
      } catch (error) {
        console.error('Error starting work session:', error);
      }
    }
  };

  const stopWorking = async () => {
    // const confirmation = window.confirm('Are you sure you want to stop working?');
    // if (confirmation) {
      const attendanceId = localStorage.getItem('attendanceId');
      if (!attendanceId) {
        console.error('Attendance ID not found in localStorage.');
        return;
      }
      console.log(typeof(attendanceId));
      // setEndTime(new Date());
      // setWorkTimerVisible(false);
      // try {
      //   console.log("attendance id is ",attendanceId);
      // const my_res =  await updateAttendance({ ID: attendanceId, TimeOut: new Date().toISOString() });
      // console.log("my stop working response ",my_res);
      // } catch (error) {
      //   console.error('Error stopping work session:', error);
      // }
    // }
  };

  const calculateTotalHours = () => {
    if (startTime && endTime) {
      const diffInMs = endTime.getTime() - startTime.getTime();
      const totalHours = diffInMs / (1000 * 60 * 60);
      return totalHours.toFixed(2);
    }
    return null;
  };

  return (
    <div className="maincontent">
      <div className="motivation">
        <div className="mtext">{motivation}</div>
      </div>
      <div className="header">
        <h2>Hello Welcome back</h2>
      </div>
      <div className="main">
        <div className="attendance">
          <div className="working">
            <div className="clock">
              <Clock />
            </div>
            {isWorkTimerVisible && <WorkTimer />}
            <div className="btn">
              {!isWorkTimerVisible && (
                <button onClick={startWorking}>Start Working</button>
              )}
              {isWorkTimerVisible && (
                <button onClick={stopWorking}>Stop Working</button>
              )}
            </div>
          </div>
        </div>
        <div className="finance">
          <div className="stats">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time In</th>
                  <th>Time Out</th>
                  <th>Total Hours Worked</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData && attendanceData.map(attendance => (
                  <tr key={attendance.ID}>
                    <td>{new Date(attendance.Date).toDateString()}</td>
                    <td>{attendance.TimeIn ? new Date(attendance.TimeIn).toLocaleTimeString() : '-'}</td>
                    <td>{attendance.TimeOut ? new Date(attendance.TimeOut).toLocaleTimeString() : '-'}</td>
                    <td>{calculateTotalHours()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="attendee">
            <div className="head">
              <h3>Attendance Statics</h3>
              <hr />
            </div>
            <div className="days">
              <div className="words">
                <p>Total worked days</p>
              </div>
              <div className="sat">
                8
              </div>
            </div>
            <div className="Days-absent">
              <div className="absent">
                <p> Days Absent</p>
              </div>
              <p><span>2</span></p>
            </div>
            <div className="leave">
              <div className="offdays">
                <p>Unused Leave days</p>
              </div>
              <div className="num">
                <p><span>12</span></p>
              </div>
            </div>        
          </div>
          <PayrollRecord />
        </div>
      </div>
    </div>
  );
}

export default EmployeeBord;
