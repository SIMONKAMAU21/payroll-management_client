import React from 'react';
import '../Payroll/payroll.scss';
import { useGetPayrollByIdQuery } from '../../features/Payroll/PayrollApi';

const PayrollRecord = () => {
  const loggedInUser = localStorage.getItem('userDetails');
  const formattedLoggedInUser = JSON.parse(loggedInUser);
  const { data: payroll, error, isLoading } = useGetPayrollByIdQuery(formattedLoggedInUser);
  const handlePrint=()=>{
    window.print();
  };

  const downloadPayrollRecord = () => {
    // Convert payroll data to CSV format
    const csvData = [
      ['Employee ID', 'Gross Pay', 'Net Pay', 'Payroll Date'],
      [payroll[0].EmployeeID, payroll[0].GrossPay, payroll[0].NetPay, payroll[0].PayrollDate]
    ];

    // Create CSV content
    const csvContent = csvData.map(row => row.join(',')).join('\n');

    // Create a blob from CSV content
    const blob = new Blob([csvContent], { type: 'text/csv' });

    // Create a temporary anchor element to trigger the download
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'payroll_record.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className='error'> error...</div>;
  }

  if (!payroll || payroll.length === 0) {
    return <div>no payments done.</div>;
  }

  return (
    
<>
<div className="payrollholder">
<div className="payroll-record">
      <div className="record-item">
        <span className="record-label">Employee ID:</span>
        <span className="record-value">{payroll.EmployeeID}</span>
      </div>
      <div className="record-item">
        <span className="record-label">Gross Pay:</span>
        <span className="record-value">{payroll.GrossPay}</span>
      </div>
      <div className="record-item">
        <span className="record-label">Net Pay:</span>
        <span className="record-value">{payroll.NetPay}</span>
      </div>
      <div className="record-item">
        <span className="record-label">Payroll Date:</span>
        <span className="record-value">{payroll.PayrollDate}</span>
      </div>
    
    </div>
    <div className="btn">
<div className="btn1">   
   <button onClick={downloadPayrollRecord}>Download Payroll Record</button>
</div>
<div className="btn2">   
      <button onClick={handlePrint}>Print Payroll Record</button>
</div>  </div> 
</div>
</>
       
  );
};

export default PayrollRecord;
