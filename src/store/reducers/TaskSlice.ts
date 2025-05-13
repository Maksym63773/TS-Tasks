import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type taskStatus = 'todo' | 'in_progress' | 'done';
export interface TaskState {
    id: string;
    name: string;
    description: string;
    priority: number;
    status: taskStatus ;
    createdAt: string;
    dueDate?: string;
    completed: boolean;
}

const initialState: TaskState[] = [];

const TaskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        setNewTask: (state, action: PayloadAction<TaskState>) => {
            state.push(action.payload);
        },
        deleteTask: (state, action: PayloadAction<TaskState>) => {
            state.splice(state.indexOf(action.payload)-1, 1);
            return state;
        },
        updateTask: (state, action: PayloadAction<TaskState>) => {
            state[state.findIndex(task => task.id === action.payload.id)-1] = action.payload;
        }
    }
})

export const {setNewTask, deleteTask, updateTask} = TaskSlice.actions;
export default TaskSlice.reducer;