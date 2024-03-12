import React, { useState } from 'react';
import '../Position/Positionmanagement.scss'
const PositionManagement = () => {
  
  const [positions, setPositions] = useState([]);
  const [newPosition, setNewPosition] = useState('');

  const addPosition = () => {
    if (newPosition.trim() !== '') {
      const newPositions = [...positions, newPosition];
      setPositions(newPositions);
      setNewPosition('');
    }
  };


  const removePosition = (index) => {
    const updatedPositions = [...positions];
    updatedPositions.splice(index, 1);
    setPositions(updatedPositions);
  };

  return (
    <div className="position-management">
      <h2>Position Management</h2>
      <div className="add-position">
        <input
          type="text"
          placeholder="Enter new position"
          value={newPosition}
          onChange={(e) => setNewPosition(e.target.value)}
        />
        <button onClick={addPosition}>Add Position</button>
      </div>
      <ul className="position-list">
        {positions.map((position, index) => (
          <li key={index}>
            <table>
               <th>positions</th>
               <th>Options</th>
               <tr>
                  <td>{position}</td>
                  <td>
                  <button onClick={() => removePosition(index)}>Remove</button>
                  </td>
               </tr>
            </table>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PositionManagement;
