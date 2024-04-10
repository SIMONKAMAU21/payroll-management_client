import React from 'react';
import { useGetAllDeductionsQuery } from './DeductionApi';
import '../Deduction/Deductionlist.scss'

const DeductionTable = () => {
    const { data: deductions, isLoading, isError } = useGetAllDeductionsQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div className='error'>Error fetching data</div>;
    }

    return (
        <div className="deduction-table-container">
            <h2>Deduction Table</h2>
            <table className="deduction-table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Employee</th>
                        <th>Employee ID</th>
                    </tr>
                </thead>
                <tbody>
                    {deductions.map((deduction, index) => (
                        <tr key={index}>
                            <td>{deduction.Description|| "-"}</td>
                            <td>{deduction.Amount|| "-"}</td>
                            <td>{deduction.Firstname} {deduction.Lastname} </td>
                            <td>{deduction.EmployeeID}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DeductionTable;
