/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axios";
import { Employee } from "@/type";

interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
}

const initialState: EmployeeState = {
  employees: [],
  loading: false,
  error: null,
};

// Fetch all employees
export const fetchEmployees = createAsyncThunk<Employee[], void>(
  "employees/fetchEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/employees");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch employees"
      );
    }
  }
);

// Add a new employee
export const addEmployee = createAsyncThunk<Employee, Partial<Employee>>(
  "employees/addEmployee",
  async (employeeData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/employees", employeeData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to add employee");
    }
  }
);

// Delete an employee
export const deleteEmployee = createAsyncThunk<number, number>(
  "employees/deleteEmployee",
  async (employeeId, { rejectWithValue }) => {
    try {
      await axios.delete(`/employees/${employeeId}`);
      return employeeId;  // Kembalikan ID employee yang dihapus
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to delete employee");
    }
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees.push(action.payload);
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = state.employees.filter(
          (employee) => employee.id !== action.payload
        );
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
      
  },
});

export default employeeSlice.reducer;
