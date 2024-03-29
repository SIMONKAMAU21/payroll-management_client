// AdvanceTable.jsx
import React from 'react';
import { useGetAllAdvancesQuery } from './AdvanceApi';
import '../Advance/Advancelist.scss'
import { LoadingToast } from '../toaster/Toaster';


const AdvanceTable = () => {
    const { data: advances, isLoading, isError } = useGetAllAdvancesQuery();

    if (isLoading) {
        return <div>loading... </div>;
    }

    if (isError) {
        return <div>Error fetching data</div>;
    }

    return (
        <div className="advance-table-container">
            <h2>Advance Table</h2>
            <table className="advance-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Employee ID</th>
                    </tr>
                </thead>
                <tbody>
                    {advances.map((advance, index) => (
                        <tr key={index}>
                            <td>{advance.Date}</td>
                            <td>{advance.Amount}</td>
                            <td>{advance.EmployeeID}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdvanceTable;
