import React from 'react';
import '../PositionsDetailes/positionsdetailes.scss'; // Import CSS file for modal styling
import { useGetPositionsByIdQuery } from '../../features/Position/positionApi';

const Positionsdetailes = ({ positionId, onClose }) => {
  const { data: positionDetails, isLoading, isError } = useGetPositionsByIdQuery(positionId);
  console.log('first', positionDetails)
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>Close</button>
        <h2>Position Details</h2>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error fetching position details</p>}
        <ul>
          {positionDetails && positionDetails.map((detailes) => (
            <li key={detailes.PositionID}>
              <table>
                <tbody>
                  <tr>
                    <th>position</th>
                    <th>Salary</th>
                    <th>names</th>
                    <th>schedule</th>
                    <th>ID</th>
                    <th>photo</th>
                  </tr>
                  <tr>
                    <td>{detailes.Position || "-"}</td>
                    <td>{detailes.Basic_Salary || "-"}</td>
                    <td>{detailes.Firstname || "-"} {detailes.Lastname} </td>
                    <td>{detailes.Schedule || "-"}</td>
                    <td>{detailes.ID || "-"}</td>
                    <td>{detailes.PhotoURL&& <img src={detailes.PhotoURL} style={{height:'50px', width:'50px', borderRadius:'50%'}}/>  || "-"}</td>
                  </tr>

                </tbody>
              </table>
            </li>
          ))}

        </ul>

      </div>
    </div>
  );
};

export default Positionsdetailes;
