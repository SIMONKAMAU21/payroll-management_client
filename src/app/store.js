import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { employeeApi } from "../features/Employeemanagement/employeeApi";
import { positionApi } from "../features/Position/positionApi";
import { ScheduleApi } from "../features/Shedule/scheduleApi";
import { attendanceApi } from "../features/Attendance/AttendanceApi";
import { loginApi } from "../pages/Login/loginApi";
import { payrollApi } from "../features/Payroll/PayrollApi";



export const store =configureStore({
    reducer:{
     [employeeApi.reducerPath]:employeeApi.reducer,
     [positionApi.reducerPath]:positionApi.reducer,
     [ScheduleApi.reducerPath]:ScheduleApi.reducer,
     [attendanceApi.reducerPath]:attendanceApi.reducer,
     [loginApi.reducerPath]:loginApi.reducer,
     [payrollApi.reducerPath]:payrollApi.reducer,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(employeeApi.middleware,positionApi.middleware,ScheduleApi.middleware,attendanceApi.middleware,loginApi.middleware,payrollApi.middleware)
})
setupListeners(store.dispatch)


