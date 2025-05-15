import TaskSlice, {TaskState, taskStatus} from "./TaskSlice";
import {createSlice} from "@reduxjs/toolkit";

const initialState: TaskState = {
    id: '',
    name: '',
    description: '',
    priority: 0,
    status: "todo" as taskStatus,
    createdAt: new Date().toISOString(),
    dueDate: new Date().toISOString(),
    completed: false,
}
const EditableTaskSlice = createSlice({
    name: "EditableTask",
    initialState,
    reducers: {
        setEditableTask: (state, action) => {
            state = {...action.payload};
        },
        clearEditableTask: (state, action) => {
            state = {id: '',
                name: '',
                description: '',
                priority: 0,
                status: "todo" as taskStatus,
                createdAt: new Date().toISOString(),
                dueDate: new Date().toISOString(),
                completed: false,}
        }
    }
})

export const {setEditableTask, clearEditableTask} = EditableTaskSlice.actions;

export default EditableTaskSlice.reducer;