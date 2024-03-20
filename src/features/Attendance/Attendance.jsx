import React from 'react';
import './Attendance.scss';
import { useGetAttendanceQuery } from './AttendanceApi';
import LowerDashbord from '../../components/DashbordC omponent/lowerDashbord';
import { LoadingToast, SuccessToast } from '../../components/toaster/Toaster';

const AttendanceReportList = () => {
  const { data: attendance, isLoading, isError } = useGetAttendanceQuery();
  const userdata = {
    labels: attendance ? attendance.map(data => data.Firstnameame) : [],
    datasets: [{
      label: 'Attendance',
      data: attendance ? attendance.map(data => data.TimeIn) : [],
    }],
  };

  if (isLoading) return <div></div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className='Attendance'>
      <h2 className='heading'>Attendance Reports</h2>
      <div className="common-holder">
        <div className="items-holder">
          <ul>
            {attendance && attendance.map(data => (
              <div className="attendances" key={data.ID}>
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
          <LowerDashbord chartData={userdata} />
        </div>
      </div>
    </div>
  );
};

export default AttendanceReportList;
