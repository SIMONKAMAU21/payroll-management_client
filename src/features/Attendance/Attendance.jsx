import React, { useState } from 'react';
import './Attendance.scss';
import { useGetAttendanceQuery } from './AttendanceApi';
import { LoadingToast, ErrorToast } from '../../components/toaster/Toaster';

const AttendanceReportList = () => {
  const { data: attendance, isLoading, isError } = useGetAttendanceQuery();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAttendance, setFilteredAttendance] = useState([]);

  // Update filteredAttendance when attendance data or search query changes
  useState(() => {
    if (attendance) {
      const filteredData = attendance.filter(item =>
        item.Firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ID[0].toString().includes(searchQuery)
      );
      setFilteredAttendance(filteredData);
    }
  }, [attendance, searchQuery]);

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  if (isLoading) return <LoadingToast />;
  if (isError) return <ErrorToast message="Error fetching data" />;

  return (
    <div className='Attendance'>
      <h2 className='heading'>Attendance Reports</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name or ID"
          value={searchQuery}
          onChange={handleSearchChange}
        />
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
            {filteredAttendance.map(data => (
              <tr key={data.ID[0]}>
                <td>{data.Firstname} {data.Lastname}</td>
                <td>{data.TimeIn}</td>
                <td>{data.TimeOut}</td>
                <td>{data.Date}</td>
                <td>{data.Position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceReportList;
