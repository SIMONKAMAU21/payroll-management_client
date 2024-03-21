import React, { useState, useEffect } from 'react';
import WorkTimer from '../../components/Worktime/worktime';
import '../Employee/Employeebord.scss';
import Clock from '../../components/clock/clock';
import PayrollRecord from '../../components/Payroll/payroll';
import { useGetAttendanceQuery, useGetAttendanceByIdMutation } from '../../features/Attendance/AttendanceApi';

function EmployeeBord() {
  const { data: attendanceData } = useGetAttendanceQuery();
  const [updateAttendance] = useGetAttendanceByIdMutation();
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

  const handleStartWorking = () => {
    setStartTime(new Date());
    setWorkTimerVisible(true);
    updateAttendance({ variables: { timeIn: new Date() } });
  };

  const handleStopWorking = () => {
    setEndTime(new Date());
    setWorkTimerVisible(false);
    updateAttendance({ variables: { timeOut: new Date() } });
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
                <button onClick={handleStartWorking}>Start Working</button>
              )}
              {isWorkTimerVisible && (
                <button onClick={handleStopWorking}>Stop Working</button>
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
       <PayrollRecord/>
            
                  </div>
                </div>
              </div>
       
  );
}

export default EmployeeBord;
