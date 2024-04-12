import React from 'react';
import { useGetAttendanceByIdQuery } from '../../features/Attendance/AttendanceApi';

const Attendance = () => {
    const loggedInUser = JSON.parse(localStorage.getItem('userDetails'));
    const EmployeeID = loggedInUser.ID;
    const { data: attendanceData, error: attendanceError, isLoading: attendanceLoading } = useGetAttendanceByIdQuery(EmployeeID);
  
    return (
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
                    {attendanceData && attendanceData.attendanceRecords.length > 0 ? (
                        attendanceData.attendanceRecords.map(record => (
                            <tr key={record.ID}>
                                <td>{new Date(record.Date).toDateString()}</td>
                                <td>{record.TimeIn ? new Date(record.TimeIn).toLocaleTimeString() : '-'}</td>
                                <td>{record.TimeOut ? new Date(record.TimeOut).toLocaleTimeString() : '-'}</td>
                                <td>{record.TimeOut ? calculateHoursWorked(record.TimeIn, record.TimeOut) : '-'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">{attendanceError ? "No attendance records found" : "START working in the next 24hrs"}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Attendance;

function calculateHoursWorked(startTime, endTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diff = end - start;
    const hours = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    return `${hours} hours ${minutes} minutes`;
}
