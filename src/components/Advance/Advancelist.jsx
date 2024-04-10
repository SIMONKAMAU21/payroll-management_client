// AdvanceTable.jsx
import React from 'react';
import { useGetAllAdvancesQuery } from './AdvanceApi';
import '../Advance/Advancelist.scss'
import { LoadingToast,SuccessToast,ErrorToast } from '../toaster/Toaster';


const AdvanceTable = () => {
    const { data: advances, isLoading, isError } = useGetAllAdvancesQuery();

    if (isLoading) {
        return <div>loading... </div>;
    }

    if (isError) {
        return <div className='error'>Error fetching data</div>;
    }
    if(advances===null){
        return SuccessToast("deletion is aoutomated")
     }
    return (
        <div className="advance-table-container">
            <h2>Advance Table</h2>
            <table className="advance-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Employee </th>
                        <th>Employee ID</th>
                    </tr>
                </thead>
                <tbody>
                    {advances && advances.map((advance, index) => (
                        <tr key={index}>
                            <td>{advance.Date? new Date (advance.Date).toLocaleDateString():"-"} </td>
                            <td>{advance.Amount}</td>
                            <td>{advance.Firstname} {advance.Lastname} </td>
                            <td>{advance.EmployeeID}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdvanceTable;
