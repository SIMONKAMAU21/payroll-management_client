import React, { useState } from 'react';
import '../Overtime/OvertimeManagement.scss';
import AddOvertimeRecord from '../../components/overtime/AddOvertimeRecord'

const dummyOvertimeRecords = [
  { id: 1,name:'simon kamau',position:'IT', date: '2024-03-05', hours: 2.5 },
  { id: 2,name:'Kelvin k', date: '2024-03-12', hours: 3 },
  { id: 3,name:'Sthephen os', date: '2024-03-19', hours: 1.5 },
  { id: 4,name:'Isaac kilimo', date: '2024-03-26', hours: 2 },
  { id: 5,name:'Titus Munyoki', date: '2024-04-02', hours: 4 },
];

const OvertimeManagement = () => {
  const [overtimeRecords, setOvertimeRecords] = useState(dummyOvertimeRecords);
  const [showForm, setShowForm] = useState(false); 

  const handleToggleForm = () => {
    setShowForm(!showForm); 
  };

  const handleAddOvertimeRecord = (newRecord) => {
    setOvertimeRecords([...overtimeRecords, newRecord]);
  };

  return (
    <div className="overtime-management-container">
      <div className="heading">
        <button onClick={handleToggleForm}>Add New Record</button> 
      </div>
      {showForm && <AddOvertimeRecord onAdd={handleAddOvertimeRecord} />} 
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
