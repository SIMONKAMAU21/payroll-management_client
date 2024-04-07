import React, { useState } from 'react';
import './Payroll.scss';
import { useGetPayrollQuery, useAddPayrollMutation } from './PayrollApi';
import { ErrorToast, LoadingToast, SuccessToast } from '../../components/toaster/Toaster';
import { useGetEmployeesQuery } from '../Employeemanagement/employeeApi';

const PayrollManagement = () => {
  const [employeeID, setEmployeeID] = useState('');
  const { data: payrollData, isLoading, isError } = useGetPayrollQuery();
  const { data: employeeData } = useGetEmployeesQuery();
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
        <select
          value={employeeID}
          onChange={(e) => setEmployeeID(e.target.value)}>
          <option value="">
            select employee id
          </option>
          {employeeData&&employeeData.map(employee => (
            <option key={employee.ID} value={employee.ID}>
              {employee.Firstname} {employee.Lastname} {employee.ID}
            </option>
          ))}
        </select>
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
            <th> Date</th>
            <th> Time</th>
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
                <td>{payrollRecord.PayrollDate ?new Date(payrollRecord.PayrollDate).toLocaleDateString():"-"}</td>
                <td>{payrollRecord.PayrollDate ?new Date(payrollRecord.PayrollDate).toLocaleTimeString():"-"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PayrollManagement;
