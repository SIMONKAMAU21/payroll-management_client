import '../Payroll/payroll.scss';
import { useGetPayrollByIdQuery } from '../../features/Payroll/PayrollApi';

const PayrollRecord = () => {
  const loggedInUser = localStorage.getItem('userDetails');
  const formattedLoggedInUser = JSON.parse(loggedInUser);
  const { data: payroll, error, isLoading } = useGetPayrollByIdQuery(formattedLoggedInUser);
console.log('payroll', payroll)

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!payroll) {
    return <div>No payroll data found.</div>;
  }

  return (
    <div className="payroll-record">
      <div className="record-item">
        <span className="record-label">Employee ID:</span>
        <span className="record-value">{payroll[0].EmployeeID}</span>
      </div>
      <div className="record-item">
        <span className="record-label">Gross Pay:</span>
        <span className="record-value">{payroll[0].GrossPay}</span>
      </div>
     
      <div className="record-item">
        <span className="record-label">Net Pay:</span>
        <span className="record-value">{payroll[0].NetPay}</span>
      </div>
      <div className="record-item">
        <span className="record-label">Payroll Date:</span>
        <span className="record-value">{payroll[0].PayrollDate}</span>
      </div>
    </div>
  );
};

export default PayrollRecord;
