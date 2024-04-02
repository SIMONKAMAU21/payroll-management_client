import React, { useState } from 'react';
import './Payroll.scss';
import { useGetPayrollQuery, useAddPayrollMutation } from './PayrollApi';
import { ErrorToast, LoadingToast, SuccessToast } from '../../components/toaster/Toaster';

const PayrollManagement = () => {
  const [employeeID, setEmployeeID] = useState('');
  const { data: payrollData, isLoading, isError } = useGetPayrollQuery();
  const [isAdding, setIsAdding] = useState(false);
  const [addError, setAddError] = useState(null);
  const [addPayrollMutation] = useAddPayrollMutation();

  const handleGeneratePayroll = async () => {
    setIsAdding(true); 
    setAddError(null); 

    try {
      const response = await addPayrollMutation({ EmployeeID: employeeID }).unwrap();
      SuccessToast(response.message);
      setEmployeeID(''); 
    } catch (error) {
      setAddError(error.message || 'Error adding payroll data');
      ErrorToast('Employee ID not found');
    } finally {
      setIsAdding(false); 
    }
  };

 
  

  return (
    <div className="payroll-management">
      <h2>Payroll Management</h2>
      <div className="input-fields">
        <input
          type="text"
          placeholder="Employee ID"
          value={employeeID}
          onChange={(e) => setEmployeeID(e.target.value)}
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
        <tbody>
          {payrollData && Array.isArray(payrollData) && (
            payrollData.map(payrollRecord => (
              <tr key={payrollRecord.ID}>
                <td>{payrollRecord.ID}</td>
                <td>{payrollRecord.EmployeeID}</td>
                <td>{payrollRecord.GrossPay}</td>
                <td>{payrollRecord.DeductionID || 'N/A'}</td>
                <td>{payrollRecord.NetPay}</td>
                <td>{payrollRecord.PayrollDate}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PayrollManagement;
