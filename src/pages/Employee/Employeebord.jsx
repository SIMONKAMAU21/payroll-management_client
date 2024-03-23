import React, { useState, useEffect } from 'react';
import { useGetAttendanceQuery, useUpdateAttendanceMutation } from '../../features/Attendance/AttendanceApi';
import { SuccessToast, ErrorToast } from '../../components/toaster/Toaster';
import '../Employee/Employeebord.scss';
import WorkTimer from '../../components/Worktime/worktime';
import Clock from '../../components/clock/clock';
import PayrollRecord from '../../components/Payroll/payroll';

function EmployeeBord() {
  const { data: attendanceData, error: attendanceError, isLoading: attendanceLoading } = useGetAttendanceQuery();

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
    <div className="maincontent">
      <div className="header">
        <h2>Hello Welcome back</h2>
      </div>
      <div className="main">
        <div className="attendance">
          <div className="working">
            <div className="clock">
              <Clock />
            </div>
            <WorkTimer />
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
                {attendanceLoading ? (
                  <tr>
                    <td>Loading...</td>
                  </tr>
                ) : attendanceError ? (
                  <tr>
                    <td>Error fetching attendance data</td>
                  </tr>
                ) : (
                  attendanceData.map(attendance => (
                    <tr key={attendance.ID}>
                      <td>{new Date(attendance.Date).toDateString()}</td>
                      <td>{attendance.TimeIn ? new Date(attendance.TimeIn).toLocaleTimeString() : '-'}</td>
                      <td>{attendance.TimeOut ? new Date(attendance.TimeOut).toLocaleTimeString() : '-'}</td>
                      {/* <td>{calculateTotalTime(attendance.TimeIn, attendance.TimeOut)}</td> */}
                      {/* <td><button onClick={() => handleUpdateAttendance(attendance.ID)}>Update Time Out</button></td> */}
                    </tr>
                  ))
                )}
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
