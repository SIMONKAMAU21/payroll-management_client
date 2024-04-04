import React, { useState } from 'react';
import './Positionmanagement.scss';
import { useGetPositionsQuery, useAddPositionsMutation, useDeletePositionsMutation } from './positionApi';
import { ErrorToast, SuccessToast ,LoadingToast} from '../../components/toaster/Toaster';
import Positionsdetailes from '../../components/PositionsDetailes/positionsdetailes';

const PositionManagement = () => {
  const { data: positionsData, isLoading, isError } = useGetPositionsQuery();
  const [newPosition, setNewPosition] = useState('');
  const [newBasicSalary, setNewBasicSalary] = useState(''); 
  const [addPosition] = useAddPositionsMutation();
  const [deletePosition] = useDeletePositionsMutation();
  const [selectedPosition, setSelectedPosition] = useState(null);
  const[showPositionDetailes,setShowPositionDetailes]=useState(false);

  const handleAddPosition = async () => {
    try {
      if (newPosition.trim() !== '') {
       const response= await addPosition({ Position: newPosition, Basic_Salary: newBasicSalary }).unwrap();
        SuccessToast(response.message)
        setNewPosition('');
        setNewBasicSalary('');
      }else{
        ErrorToast("positon Alredy exists")
      }
    } catch (error) {
      console.error('Error adding position:', error);
      ErrorToast("positon Alredy exists")
    }
  };

  const handleRemovePosition = async (id) => {
    try {
    const response =  await deletePosition(id).unwrap();
      SuccessToast(response.message)
    } catch (error) {
      console.error('Error removing position:', error);
    }
  };
  const handleSeeMore=async(ID)=>{
    setSelectedPosition(ID)
    setShowPositionDetailes(true)
  }

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
        <input
          type="text"
          placeholder="Enter basic_salary"
          value={newBasicSalary}
          onChange={(e) => setNewBasicSalary(e.target.value)} 
        />
        <button onClick={handleAddPosition}>Add Position</button>
      </div>
      {isLoading && <p>loading....</p>}
      {isError && <p><ErrorToast /></p>}
      <ul className="position-list">
        {positionsData &&
          positionsData.map((position) => (
            <li key={position.ID}>
              <table>
                <tbody>
                  <tr> 
                    <th>Position</th>
                    <th>Basic Salary</th>
                    <th>P.ID E.ID</th>
                    <th>Options</th>
                  </tr>
                  <tr>
                    <td>{position.Position}</td>
                    <td>ksh {position.Basic_Salary}</td>
                    <td>{position.PositionID}{position.ID}</td>
                    <td>
                      <button onClick={() => handleRemovePosition(position.PositionID)}>Remove</button>
                      <button onClick={()=>handleSeeMore(position.PositionID)}>see More</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </li>
          ))}
      </ul>
      {showPositionDetailes && <Positionsdetailes positionId={selectedPosition} onClose={()=>setShowPositionDetailes(false)}/>}
    </div>
  );
};

export default PositionManagement;
