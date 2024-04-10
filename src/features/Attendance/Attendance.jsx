import React, { useState, useEffect } from 'react';
import './Attendance.scss';
import { useGetAttendanceQuery } from './AttendanceApi';
import { LoadingToast, ErrorToast, SuccessToast } from '../../components/toaster/Toaster';

const AttendanceReportList = () => {
  SuccessToast("attendance reports")
  const { data: attendance, isLoading, isError } = useGetAttendanceQuery();
  const [attendanceList, setAttendanceList] = useState([]);

  useEffect(() => {
    if (attendance) {
      setAttendanceList(attendance);
    }
  }, [attendance]);

  if (isLoading) return <p>loading....</p>;
  if (isError) return  <div className='error'>Error fetching data....</div>;

  return (
    <div className='Attendance'>
      <h2 className='heading'>Attendance Reports</h2>
      <div className="search-bar">
      </div>
      <div className="attendance-table-container">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Time in</th>
              <th>Time out</th>
              <th>Date</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {attendanceList.map(data => (
              <tr key={data.ID || '-'}>
                <td>{data.Firstname || '-'} {data.Lastname || '-'}</td>
                <td>{data.TimeIn ? new Date(data.TimeIn).toLocaleTimeString() : '-'}</td>
                <td>{data.TimeOut ? new Date(data.TimeOut).toLocaleTimeString() : '-'}</td>
                <td>{data.Date ? new Date (data.Date).toLocaleDateString():'-'}</td>
                <td>{data.PositionID || '-'}</td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceReportList;

function calculateHoursWorked(startTime, endTime) {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const diff = end - start;
  const hours = Math.floor(diff / 1000 / 60 / 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  return `${hours} hours ${minutes} minutes`;
}