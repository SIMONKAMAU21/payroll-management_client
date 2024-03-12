import React, { useState } from 'react';
import '../Overtime/OvertimeManagement.scss'
const dummyOvertimeRecords = [
  { id: 1,name:'simon kamau',position:'IT', date: '2024-03-05', hours: 2.5 },
  { id: 2, date: '2024-03-12', hours: 3 },
  { id: 3, date: '2024-03-19', hours: 1.5 },
  { id: 4, date: '2024-03-26', hours: 2 },
  { id: 5, date: '2024-04-02', hours: 4 },
];

const OvertimeManagement = () => {
  const [overtimeRecords, setOvertimeRecords] = useState(dummyOvertimeRecords);

  return (
    <div className="overtime-management-container">
     <div className="heading"> <h2>Overtime Management</h2></div>
      <ul>
        {overtimeRecords.map((record) => (
          <li key={record.id} className="overtime-record">
           <h4>Name: <span>{record.name}</span></h4>
            <p>Position:{record.position}</p>
            <p className="date">Date: {record.date}</p>
            <p className="hours">Hours: {record.hours}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OvertimeManagement;
