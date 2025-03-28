/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axios";
import { iTaskDetails } from "@/type";

interface TaskState {
    tasks: iTaskDetails[];
    loading: boolean;
    error: string | null;
}

const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: null,
};

// Fetch all tasks
export const fetchTasks = createAsyncThunk<iTaskDetails[], void>(
    "tasks/fetchTasks",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("/tasklists");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to fetch tasks");
        }
    }
);

// Add a new task
export const addTask = createAsyncThunk<iTaskDetails, Partial<iTaskDetails>>(
    "tasks/addTask",
    async (taskData, { rejectWithValue }) => {
        try {
            const response = await axios.post("/tasklists", taskData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to add task");
        }
    }
);

// Edit an existing task
export const editTask = createAsyncThunk<
    iTaskDetails,
    { id: number; taskData: Partial<iTaskDetails> },
    { rejectValue: string }
>(
    "tasks/editTask",
    async ({ id, taskData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`/tasklists/${id}`, taskData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to edit task");
        }
    }
);


// Delete a task
export const deleteTask = createAsyncThunk<number, number>(
    "tasks/deleteTask",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`/tasklists/${id}`);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to delete task");
        }
    }
);

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload; 
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; 
            })
            .addCase(addTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks.push(action.payload);
            })
            .addCase(addTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(editTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(editTask.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.tasks.findIndex((task) => task.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            .addCase(editTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
            
    },
});

export default taskSlice.reducer;
