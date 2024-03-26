import React, { useEffect } from 'react';
import { useGetAttendanceByIdQuery } from '../../features/Attendance/AttendanceApi';
import { ErrorToast, LoadingToast } from '../toaster/Toaster';

const Attendance = () => {
    const loggedInUser = localStorage.getItem('userDetails');
    const formattedLoggedInUser = JSON.parse(loggedInUser);
    const EmployeeID = formattedLoggedInUser.ID;

    // Fetch attendance data using the provided query hook
    const { data: attendanceData, error: attendanceError, isLoading: attendanceLoading } = useGetAttendanceByIdQuery(formattedLoggedInUser);

    return (
        <>
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
                                <td >
                                   LOADING....
                                </td>
                            </tr>
                        ) : attendanceError ? (
                            <tr>
                                <td colSpan="4">START working in the next 24hrs</td>
                            </tr>
                        ) : attendanceData && attendanceData.attendanceRecords.length > 0 ? (
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
                                <td colSpan="4">No attendance records found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
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
