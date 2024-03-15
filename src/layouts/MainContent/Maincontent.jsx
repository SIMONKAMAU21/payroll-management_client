import React from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/sidebar'
import Dashbord from '../../pages/Dashbord/Dashbord'
import Employee from '../../pages/EmployeeManagement/Employee'
import AttendanceReportList from '../../pages/Attendance/Attendance'
import OvertimeManagement from '../../pages/Overtime/OvertimeManagement'
import ScheduleManagement from '../../pages/Shedule/Shedulemanagement'
import PositionManagement from '../../pages/Position/Positionmanagement'
import PayrollManagement from '../../pages/Payroll/Payroll'
import ProfileManagement from '../../pages/Profile/ProfileManagement'


const Maincontent = () => {
  return (
  <>

<Header/>
<Sidebar/>
<Routes>
<Route path='/Dashbord' element={<Dashbord/>}/>
<Route path='/Employee management' element ={<Employee/>}/>
<Route path='/Attendance reports' element={<AttendanceReportList/>}/>
<Route path='/Overtime management' element ={<OvertimeManagement/>}/>
<Route path= '/Shedule management' element = {<ScheduleManagement/>}/>
<Route path='/Position management' element ={<PositionManagement/>}/>
<Route path ='/Payroll management' element={<PayrollManagement/>}/>
<Route path='/profile management' element ={<ProfileManagement/>}/>
</Routes>

  
  </>
  )
}

export default Maincontent