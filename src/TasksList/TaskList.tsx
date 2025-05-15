import React, {FC,  useState} from 'react';

import {deleteTask, TaskState, updateTask} from '../store/reducers/TaskSlice';
import styles from './TaskList.module.scss';
import {PayloadAction} from "@reduxjs/toolkit";
import Modal from "../components/Modal/Modal";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import TaskForm from "../components/TaskForm/TaskForm";
import {setEditableTask} from "../store/reducers/EditableTaskSlice";

type TaskStateProps = {
    task: TaskState;
}

const TaskList: FC = () => {
    const tasks = useSelector<RootState, TaskState[]>((state) => state.root.tasks);
    const editTask = useSelector<RootState, TaskState>(state => state.root.editTask);
    const dispatch = useAppDispatch();
    const [updateActive, setUpdateActive] = useState<boolean>(false);

    const update = ({task}:TaskStateProps) =>{
        setUpdateActive(true);
        dispatch(setEditableTask(task));
        console.log(tasks);
    }
    return (
        <div>
            {tasks.map((task) => (
                <div key={task.id} className={styles.container}>
                    <h3>{task.name}</h3>
                    <div>
                        <h3
                            style={{
                                color:
                                    task.dueDate && new Date(task.dueDate).getTime() - Date.now() <= 86400000
                                        ? 'red'
                                        : 'black',
                            }}
                        >
                            {task.dueDate?.replace('T', '  ')}
                        </h3>


                        <button onClick={() => {
                            dispatch(deleteTask(task))
                        }} className={styles.btn}>Delete
                        </button>
                        <button onClick={() => update({task})} className={styles.btn}>Edit</button>
                    </div>
                    <Modal active={updateActive} setActive={setUpdateActive}>
                        <TaskForm editable={editTask}/>
                    </Modal>
                </div>
            ))}

        </div>
    );
};

export default TaskList;
