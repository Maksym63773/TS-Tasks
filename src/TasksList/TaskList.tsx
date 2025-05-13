import React, {FC, useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store';
import {deleteTask, TaskState, updateTask} from '../store/reducers/TaskSlice';
import styles from './TaskList.module.scss';
import {PayloadAction} from "@reduxjs/toolkit";
import Modal from "../components/Modal/Modal";

const TaskList: FC = () => {
    const tasks = useSelector<RootState, TaskState[]>((state) => state.root.tasks);
    const dispatch = useDispatch<AppDispatch>();
    const [updateActive, setUpdateActive] = useState<boolean>(false);

    return (
        <div>
            {tasks.map((task) => (
                <div key={task.name} className={styles.container}>
                    <h3>{task.name}</h3>
                    <div>
                        <h3>{task.dueDate?.replace('T', '  ')}</h3>
                        <button onClick={() => {dispatch(deleteTask(task))}} className={styles.btn}>Delete</button>
                        <button onClick={() => setUpdateActive(true)} className={styles.btn}>Edit</button>
                    </div>
                    <Modal active={updateActive} setActive={setUpdateActive}>

                    </Modal>
                </div>
            ))}

        </div>
    );
};

export default TaskList;
