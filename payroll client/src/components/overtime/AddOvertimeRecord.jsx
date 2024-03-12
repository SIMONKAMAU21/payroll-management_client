import React, { useState } from 'react';
import '../overtime/AddOvertimeRecord.scss'

const AddOvertimeRecord = ({ onAdd }) => {
  const [date, setDate] = useState('');
  const [hours, setHours] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !hours) {
      alert('Please provide both date and hours.');
      return;
    }

    onAdd({ date, hours: parseFloat(hours) });

    setDate('');
    setHours('');
  };

  return (
    <div className="form-container">
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
          <label htmlFor="hours">Hours:</label>
          <input
            type="number"
            id="hours"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            step="0.5" 
            required
            placeholder='name..'
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
            placeholder='position...'
          />
        </div>
        <button type="submit">Add Overtime Record</button>
      </form>
    </div>
  );
};

export default AddOvertimeRecord;
