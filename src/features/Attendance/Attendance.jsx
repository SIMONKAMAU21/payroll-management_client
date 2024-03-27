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
  if (isError) return <ErrorToast message="Error fetching data" />;

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
              <th>Start Date</th>
              <th>End Date</th>
              <th>Date</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {attendanceList.map(data => (
              <tr key={data.ID || '-'}>
                <td>{data.Firstname || '-'} {data.Lastname || '-'}</td>
                <td>{data.TimeIn || '-'}</td>
                <td>{data.TimeOut || "-"}</td>
                <td>{data.Date || '-'}</td>
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
