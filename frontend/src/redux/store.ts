import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "@/redux/slices/employeeSlice";
import taskReducer from "@/redux/slices/taskSlice";

export const store = configureStore({
    reducer: {
        employees: employeeReducer,
        tasks: taskReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
