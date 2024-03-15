import React, { useState } from 'react';
import WorkTimer from '../../components/Worktime/worktime';
import '../Employee/Employeebord.scss'
import Clock from '../../components/clock/clock';

 
function EmployeeBord() {
  const [isWorkTimerVisible, setWorkTimerVisible] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
 
  const handleStartWorking = () => {
    setStartTime(new Date());
    setWorkTimerVisible(true);
  };
 
  const handleStopWorking = () => {
    setEndTime(new Date());
    setWorkTimerVisible(false);
  };
 
  const calculateTotalHours = () => {
    if (startTime && endTime) {
      const diffInMs = endTime.getTime() - startTime.getTime();
      const totalHours = diffInMs / (1000 * 60 * 60);
      return totalHours.toFixed(2);
    }
    return null;
  };
 
  return (
    <div className="maincontent">
      <div className="header">
        <h2>Hello Welcome back</h2>
      </div>
      <div className="main">
        <div className="attendance">
          <div className="working">
            <div className="clock">
              <Clock />
            </div>
            {isWorkTimerVisible && <WorkTimer />}
            <div className="btn">
            {!isWorkTimerVisible && (
              <button onClick={handleStartWorking}>Start Working</button>
            )}
            {isWorkTimerVisible && (
              <button onClick={handleStopWorking}>Stop Working</button>
            )}
          </div>
          </div>
        
        </div>
        <div className="finance">
          <div className="stats">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time In</th>
                  <th>Time Out</th>
                  <th>Total Hours Worked</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{new Date().toDateString()}</td>
                  <td>{startTime ? startTime.toLocaleTimeString() : '-'}</td>
                  <td>{endTime ? endTime.toLocaleTimeString() : '-'}</td>
                  <td>{calculateTotalHours()}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="attendee">
            <div className="head">
            <h3>Attendance Statics</h3>
            <hr />
            </div>
            <div className="days">
              <div className="words">
                <p>Total worked days</p>
              </div>
              <div className="sat">
                8
              </div>
              </div>
              <div className="Days-absent">
                <div className="absent">
                  <p> Days Absent</p>
                </div>
                <p><span>2</span></p>
                </div>
                <div className="leave">
                 
                  <div className="offdays">
                    <p>Unused Leave days</p>
                  </div>
                  <div className="num">
                    <p><span>12</span></p>
                  </div>
                  </div>        
             </div>
          <div className="payroll">
            <div className="top">
              <h2>Payroll</h2>
              <hr />
            </div>
            <div className="body">
              <div className="gross">
               <div className="upper">
                <h3>Gross pay</h3>
                <hr />
                </div>
                <div className="overtime">
                <p>Overtime hours</p>
                <div className="value">
                  <p><span>0</span></p>
                </div>
                </div>
                <div className="rate">
                  <p>Overtime Rate</p>
                  <div className="val">
                    <p><span>0</span></p>
                  </div>
                </div>
                <div className="sum">
                  <div className="nam">
                    <h3>Total:</h3>
                  </div>
                  <div className="cost">
                    <h3>50000</h3>
                  </div>
                </div>
              </div>
              <div className="advance">
                <div className="upper">
                  <h3>Deductions</h3>
                  <hr />
                  </div>
                  <div className="overtime">
                <p>Overtime hours</p>
                <div className="value">
                  <p><span>0</span></p>
                </div>
                </div>
                <div className="rate">
                  <p>Overtime Rate</p>
                  <div className="val">
                    <p><span>0</span></p>
                  </div>
                </div>
                  <div className="sum">
                    <div className="nam">
                      <h3>Total</h3>
                    </div>
                    <div className="cost">
                      <h3>20000 </h3>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default EmployeeBord;