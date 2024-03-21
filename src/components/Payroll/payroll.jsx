import React from 'react';
import '../Payroll/payroll.scss';

const PayrollRecord = ({ employeeId, grossPay, deductions, netPay, payrollDate }) => {
  return (
    <div className="payroll-record">
      <div className="record-item">
        <span className="record-label">Employee ID:</span>
        <span className="record-value">{employeeId}</span>
      </div>
      <div className="record-item">
        <span className="record-label">Gross Pay:</span>
        <span className="record-value">{grossPay}</span>
      </div>
      <div className="record-item">
        <span className="record-label">Deductions:</span>
        <span className="record-value">{deductions}</span>
      </div>
      <div className="record-item">
        <span className="record-label">Net Pay:</span>
        <span className="record-value">{netPay}</span>
      </div>
      <div className="record-item">
        <span className="record-label">Payroll Date:</span>
        <span className="record-value">{payrollDate}</span>
      </div>
    </div>
  );
};

export default PayrollRecord;
