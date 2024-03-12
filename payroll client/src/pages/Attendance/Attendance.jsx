import React from 'react';
import '../Attendance/Attendance.scss'
import LowerDashbord from '../../components/DashbordC omponent/lowerDashbord';
import { Userdata } from '../../dammydata/data';
import { useState } from 'react';

const dummyAttendanceReports = [
  { id: 1,Name:'simon kamau', startDate: '2024-03-01', endDate: '2024-03-31' },
  { id: 2,Name:'kelevin wakamba', startDate: '2024-02-01', endDate: '2024-02-29' },
  { id: 3,Name:'jeff Ndegwa', startDate: '2024-01-01', endDate: '2024-01-31' },
];

const AttendanceReportList = () => {
   const [userdata, setUserdata] = useState({
      labels: Userdata.map(data => data.mont),
      datasets: [{
        label: 'Attendance',
        data: Userdata.map(data => data.sales)
      }]
    });
   
  return (
    <div className='Attendance'>
      <h2 className='heading'>Attendance Reports</h2>
 <div className="common-holder"> <div className="items-holder">
  <ul>
        {dummyAttendanceReports.map((report) => (
              <div className="attendances">
           <li key={report.id}>
       <div className='name'> <h3>{report.Name}</h3></div>
         <div className="date-holder">
         <div className='sdate'>  <p>Start Date: {report.startDate}</p></div>
         <div className='edate'>   <p>End Date: {report.endDate}</p></div>
         </div>
          </li>
        </div>
        ))}
      </ul>
  </div>
   <div className="attendance-graph">   <LowerDashbord chartData={userdata} /></div></div>
    </div>
  );
};

export default AttendanceReportList;
