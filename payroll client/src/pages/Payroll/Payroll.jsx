import React, { useState } from 'react';
import '../Payroll/Payroll.scss'
const PayrollManagement = () => {

  const [payrollData, setPayrollData] = useState([]);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');


  const generatePayroll = () => {
   
    const newPayrollData = [
      { employee: 'John Doe', salary: 3000, deductions: 200, netPay: 2800 },
      { employee: 'Jane Smith', salary: 3500, deductions: 250, netPay: 3250 },
      { employee: 'John Doe', salary: 3000, deductions: 200, netPay: 2800 },
      { employee: 'Jane Smith', salary: 3500, deductions: 250, netPay: 3250 },
      { employee: 'John Doe', salary: 3000, deductions: 200, netPay: 2800 },
      { employee: 'Jane Smith', salary: 3500, deductions: 250, netPay: 3250 },
      { employee: 'John Doe', salary: 3000, deductions: 200, netPay: 2800 },
      { employee: 'Jane Smith', salary: 3500, deductions: 250, netPay: 3250 },
      { employee: 'John Doe', salary: 3000, deductions: 200, netPay: 2800 },
      { employee: 'Jane Smith', salary: 3500, deductions: 250, netPay: 3250 },
    
    ];
    setPayrollData(newPayrollData);
  };

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
        <button onClick={generatePayroll}>Generate Payroll</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Salary</th>
            <th>Deductions</th>
            <th>Net Pay</th>
          </tr>
        </thead>
        <tbody>
          {payrollData.map((record, index) => (
            <tr key={index}>
              <td>{record.employee}</td>
              <td>{record.salary}</td>
              <td>{record.deductions}</td>
              <td>{record.netPay}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PayrollManagement;
