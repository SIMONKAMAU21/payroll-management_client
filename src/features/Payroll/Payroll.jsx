import React, { useState } from 'react';
import './Payroll.scss';
import { useGetPayrollQuery } from './PayrollApi';
import { ErrorToast, LoadingToast, SuccessToast } from '../../components/toaster/Toaster';


const PayrollManagement = () => {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const { data: payrollData, isLoading, isError } = useGetPayrollQuery();
  const handleGeneratePayroll = () => {
  };
  if (isLoading) {
    return <LoadingToast/>;
  }

  if (isError) {
    return <ErrorToast message="Error fetching data" />;
  }

  return (
    <div className="payroll-management">
      <h2>Payroll Management</h2>
      <div className="input-fields">
        <input
          type="text"
          placeholder="Month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
        <input
          type="text"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <button onClick={handleGeneratePayroll}>Generate Payroll</button>
      </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee ID</th>
              <th>Gross Pay</th>
              <th>Deduction ID</th>
              <th>Net Pay</th>
              <th>Payroll Date</th>
            </tr>
          </thead>
          {payrollData && Array.isArray(payrollData) && (
  <tbody>
    {payrollData.map(payrollRecord => (
      <tr key={payrollRecord.ID}>
        <td>{payrollRecord.ID}</td>
        <td>{payrollRecord.EmployeeID}</td>
        <td>{payrollRecord.GrossPay}</td>
        <td>{payrollRecord.DeductionID || 'N/A'}</td>
        <td>{payrollRecord.NetPay}</td>
        <td>{payrollRecord.PayrollDate}</td>
      </tr>
    ))}
  </tbody>
)}

        </table>
      
    
    </div>
  );
};

export default PayrollManagement;
