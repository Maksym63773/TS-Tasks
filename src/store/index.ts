import {configureStore} from "@reduxjs/toolkit";
import { combineReducers } from '@reduxjs/toolkit'
import TaskReducer from "./reducers/TaskSlice";
import EditableTaskReducer from "./reducers/EditableTaskSlice";
const rootReducer = combineReducers({
    tasks: TaskReducer,
    editTask: EditableTaskReducer,
})

export const store =  configureStore({
    reducer: {
        root: rootReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
