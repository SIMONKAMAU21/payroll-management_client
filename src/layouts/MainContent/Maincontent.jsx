import React from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/sidebar'
import Dashbord from '../../pages/Dashbord/Dashbord'
import Employee from '../../pages/EmployeeManagement/Employee'
import OvertimeManagement from '../../pages/Overtime/OvertimeManagement'
import PositionManagement from '../../features/Position/Positionmanagement'
import ProfileManagement from '../../pages/Profile/ProfileManagement'
import ScheduleManagement from '../../features/Shedule/Shedulemanagement'
import AttendanceReportList from '../../features/Attendance/Attendance'
import { Navigate } from 'react-router-dom'
import PayrollManagement from '../../features/Payroll/Payroll'
import Overview from '../../pages/projectOverview/text'


const Maincontent = () => {
  return (
  <>

<Header/>
<Sidebar/>
<Routes>
  <Route path='/admin'element= {<Navigate to='/Dashboard' replace/> } />
<Route path='/Dashboard' element={<Dashbord/>} exact/>
<Route path='/Employee management' element ={<Employee/>}/>
<Route path='/Attendance reports' element={<AttendanceReportList/>}/>
<Route path='/Overtime management' element ={<OvertimeManagement/>}/>
<Route path= '/Schedule management' element = {<ScheduleManagement/>}/>
<Route path='/Position management' element ={<PositionManagement/>}/>
<Route path ='/Payroll management' element={<PayrollManagement/>}/>
<Route path='/profile management' element ={<ProfileManagement/>}/>
<Route path='/overview' element ={<Overview/>}/>
</Routes>

  
  </>
  )
}

export default Maincontent