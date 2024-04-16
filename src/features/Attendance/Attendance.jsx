import React, { useState, useEffect } from 'react';
import './Attendance.scss';
import { useGetAttendanceQuery } from './AttendanceApi';
import { LoadingToast, ErrorToast, SuccessToast } from '../../components/toaster/Toaster';

const AttendanceReportList = () => {
  const { data: attendance, isLoading, isError } = useGetAttendanceQuery();
  const [attendanceList, setAttendanceList] = useState([]);

  useEffect(() => {
    if (attendance) {
      setAttendanceList(attendance);
    }
  }, [attendance]);

  if (isLoading) return LoadingToast(true) ;
  if (isError) return ErrorToast();
  if (attendance.length === 0) {

    ErrorToast("list is creared after 12hours");
    LoadingToast(false)
  } else{
    LoadingToast(false)
  }
  
    

  return (
    <div className='Attendance'>
      <h2 className='heading'>Attendance Reports</h2>
      <div className="search-bar">
        {/* Add search functionality here if needed */}
      </div>
      <div className="attendance-table-container">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Time In</th>
              <th>Time Out</th>
              <th>Date</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {attendanceList.map(data => (
              <tr key={data.ID || '-'}>
                <td>{`${data.Firstname || '-'} ${data.Lastname || '-'}`}</td>
                <td>{data.TimeIn ? new Date(data.TimeIn).toLocaleTimeString() : '-'}</td>
                <td>{data.TimeOut ? new Date(data.TimeOut).toLocaleTimeString() : '-'}</td>
                <td>{data.Date ? new Date(data.Date).toLocaleDateString() : '-'}</td>
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
