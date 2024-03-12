import React from 'react'
import Login from './pages/Login/login'
import './App.scss'
import Dashbord from './pages/Dashbord/Dashbord'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Header from './layouts/Header/Header'
import Sidebar from './layouts/Sidebar/sidebar'
import Employee from './pages/EmployeeManagement/Employee'
import AttendanceReportList from './pages/Attendance/Attendance'
import OvertimeManagement from './pages/Overtime/OvertimeManagement'
import ScheduleManagement from './pages/Shedule/Shedulemanagement'
import PositionManagement from './pages/Position/Positionmanagement'

const App = () => {
  return (
    <div className='route'>
<BrowserRouter>
<Header/>
<Sidebar/>
<Routes>
  <Route path='/' element ={<Login/>}/>
<Route path='/Dashbord' element={<Dashbord/>}/>
<Route path='/Employee management' element ={<Employee/>}/>
<Route path='/Attendance reports' element={<AttendanceReportList/>}/>
<Route path='Overtime management' element ={<OvertimeManagement/>}/>
<Route path= 'Shedule management' element = {<ScheduleManagement/>}/>
<Route path='Position management' element ={<PositionManagement/>}/>
</Routes>
</BrowserRouter>

    </div>
  )
}

export default App