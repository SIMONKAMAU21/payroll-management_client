import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { employeeApi } from "../features/Employeemanagement/employeeApi";
import { positionApi } from "../features/Position/positionApi";
import { ScheduleApi } from "../features/Shedule/scheduleApi";



export const store =configureStore({
    reducer:{
     [employeeApi.reducerPath]:employeeApi.reducer,
     [positionApi.reducerPath]:positionApi.reducer,
     [ScheduleApi.reducerPath]:ScheduleApi.reducer,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(employeeApi.middleware,positionApi.middleware,ScheduleApi.middleware)
})
setupListeners(store.dispatch)


