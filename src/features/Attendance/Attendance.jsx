import React from 'react';
import './Attendance.scss';
import { useGetAttendanceQuery } from './AttendanceApi';
import { LoadingToast, ErrorToast } from '../../components/toaster/Toaster';
import LowerDashbord from '../../components/DashbordC omponent/lowerDashbord'


const AttendanceReportList = () => {
  const { data: attendance, isLoading, isError } = useGetAttendanceQuery();

  if (isLoading) return <LoadingToast />;
  if (isError) return <ErrorToast message="Error fetching data" />;

  return (
    <div className='Attendance'>
      <h2 className='heading'>Attendance Reports</h2>
      <div className="common-holder">
        <div className="items-holder">
          <ul>
            {attendance && attendance.map(data => (
              <div className="attendances" key={data.ID[0]}> 
                <li>
                  <div className='name'>
                    <h3>{data.Firstname} {data.Lastname}</h3> 
                  </div>
                  <div className="date-holder">
                    <div className='sdate'>
                      <p>Start Date: {data.TimeIn}</p> 
                    </div>
                    <div className='sdate'>
                      <p>End Date: {data.TimeOut}</p>
                    </div>
                    <div className='edate'>
                      <p>Date: {data.Date}</p>
                    </div>
                    <div className='edate'>
                      <p>Position: {data.Position}</p>
                    </div>
                  </div>
                </li>
              </div>
            ))}
          </ul>
        </div>
        <div className="attendance-graph">
          {/* Pass attendance data to LowerDashboard */}
          {/* <LowerDashbord attendance={attendance} /> */}
        </div>
      </div>
    </div>
  );
};

export default AttendanceReportList;


