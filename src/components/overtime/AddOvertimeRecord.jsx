import React, { useState } from 'react';
import '../overtime/AddOvertimeRecord.scss'

const AddOvertimeRecord = ({ onAdd }) => {
  const [date, setDate] = useState('');
  const [hours, setHours] = useState('');
  const[position,setPosition]=useState('');
  const[name,setName]=useState('');
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !hours) {
      alert('Please provide both date and hours.');
      return;
    }

    onAdd({ date,position,name, hours: parseFloat(hours) });

    setDate('');
    setHours('');
    setPosition('');
    setName('')
  };

  return (
    <div className="form-containers">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="hours">Hours:</label>
          <input
            type="number"
            id="hours"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            step="0.5" 
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder='name..'
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Position:</label>
          <input
            type="text"
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
            placeholder='position...'
          />
        </div>
        <button type="submit">Add Overtime Record</button>
      </form>
    </div>
  );
};

export default AddOvertimeRecord;
