import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { employeeApi } from "../features/Employeemanagement/employeeApi";
import { positionApi } from "../features/Position/positionApi";
import { ScheduleApi } from "../features/Shedule/scheduleApi";
import { attendanceApi } from "../features/Attendance/AttendanceApi";
import { loginApi } from "../pages/Login/loginApi";
import { payrollApi } from "../features/Payroll/PayrollApi";
import { DeductionApi } from "../components/Deduction/DeductionApi";
import { AdvanceApi } from "../components/Advance/AdvanceApi";
import { messageApi } from "../features/messages/messageApi";
import { conversationApi } from "../features/conversation/conversationApi";



export const store =configureStore({
    reducer:{
     [employeeApi.reducerPath]:employeeApi.reducer,
     [positionApi.reducerPath]:positionApi.reducer,
     [ScheduleApi.reducerPath]:ScheduleApi.reducer,
     [attendanceApi.reducerPath]:attendanceApi.reducer,
     [loginApi.reducerPath]:loginApi.reducer,
     [payrollApi.reducerPath]:payrollApi.reducer,
     [DeductionApi.reducerPath]:DeductionApi.reducer,
     [AdvanceApi.reducerPath]:AdvanceApi.reducer,
     [messageApi.reducerPath]:messageApi.reducer,
     [conversationApi.reducerPath]:conversationApi.reducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(employeeApi.middleware,positionApi.middleware,ScheduleApi.middleware,attendanceApi.middleware,loginApi.middleware,payrollApi.middleware,DeductionApi.middleware,AdvanceApi.middleware,messageApi.middleware,conversationApi.middleware)
})
setupListeners(store.dispatch)


