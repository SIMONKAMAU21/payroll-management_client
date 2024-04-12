import React from 'react';
import { useGetPayrollByIdQuery} from '../../features/Payroll/PayrollApi';
import '../Employee/Employeebord.scss';
import WorkTimer from '../../components/Worktime/worktime';
import Clock from '../../components/clock/clock';
import PayrollRecord from '../../components/Payroll/payroll';
import Attendance from '../../components/AttendanceDetails/Attendance';
import Messages from '../../features/messages/messages';

function EmployeeBord() {
  const loggedInUser = localStorage.getItem('userDetails');
  const formattedLoggedInUser = JSON.parse(loggedInUser);
  const EmployeeID = formattedLoggedInUser.EmployeeID
  const { data: totalPayroll, error: payrollError, isLoading: payrollLoading } = useGetPayrollByIdQuery(formattedLoggedInUser);
  return (
    <div className="maincontent">
      <div className="header">
        <h3>Hello Welcome back</h3>
      </div>
      <div className="main">
        <div className="attendance">
          <div className="working">
            <div className="clock1">
              <Clock />
            </div>
            <WorkTimer />
          </div>
        </div>
        <div className="finance">
          <Attendance />
          <div className="attendee">
            <div className="head">
              <div className="h1">
                <h3>Overall pay</h3>
              </div>
              <div className="h1">
                <h3>KSH</h3>
              </div>
            </div>
            <div className="Days-absent">
              <div className="absent">
                <p>GrossPay</p>
              </div>
              {totalPayroll && totalPayroll.GrossPay ? (
                <p><span>{totalPayroll.GrossPay}</span></p>
              ) : (
                <p>-</p>
              )}
            </div>
            <div className="days">
              <div className="words">
                <p>Advance:</p>
              </div>
              <div className="sat">
                {totalPayroll && totalPayroll.AdvanceCash ? (
                  <span>{totalPayroll.AdvanceCash}</span>
                ) : (
                  <span>-</span>
                )}
              </div>
            </div>
            <div className="leave1">
              <div className="offdays">
                <p>TotalDeductions</p>
              </div>
              <div className="num">
                {totalPayroll && totalPayroll.TotalDeductions ? (
                  <span>{totalPayroll.TotalDeductions}</span>
                ) : (
                  <span>-</span>
                )}
              </div>
            </div>
            <div className="leave">
              <div className="offdays">
                <p>NetPay</p>
              </div>
              <div className="num">
                {totalPayroll && totalPayroll.NetPay ? (
                  <span>{totalPayroll.NetPay}</span>
                ) : (
                  <span>-</span>
                )}
              </div>
            </div>
          </div>

          <div>
            {payrollLoading ? (
              <p>Loading payroll data...</p>
            ) : payrollError ? (
              <p>No payments yet</p>
            ) : (
              <div>
                <p>Total Payroll: {totalPayroll?.amount}</p>
              </div>
            )}
          </div>
          <PayrollRecord />
        </div>
      </div>
    </div>
  );
}

export default EmployeeBord;
