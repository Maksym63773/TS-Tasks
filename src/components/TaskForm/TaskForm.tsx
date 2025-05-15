import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import styles from "./TaskForm.module.scss";
import {setNewTask, TaskState, taskStatus, updateTask} from "../../store/reducers/TaskSlice"
import TaskList from "../../TasksList/TaskList";

type Form = {
    editable?: TaskState,
    close?: () => void,
}

const TaskForm = ({editable,close}:Form) => {

    const dispatch = useDispatch<AppDispatch>();
    const tasks = useSelector<RootState, TaskState[]>(state => state.root.tasks);
    const [isTrue, setIsTrue] = useState(false);
    const [task, setTask] = useState({
        id: editable?editable.id: Date.now().toString(),
        name: editable?editable.name:'',
        description: editable?editable.description:'',
        priority: editable?editable.priority:0,
        status: editable?editable.status:"todo",
        createdAt: editable?editable.createdAt: new Date().toISOString(),
        dueDate: editable?editable.dueDate: new Date().toISOString(),
        completed: editable?editable.completed:false,
    });

    const [taskError, setTaskError] = useState('');

    const clear = () =>{
        setTask(
            {
                id: String(new Date()),
                name: '',
                description: '',
                priority: 0,
                status: 'todo',
                createdAt: new Date().toISOString(),
                dueDate: new Date().toISOString(),
                completed: false,
            }
        )
    }
    const add = () =>{
        if(task.name === "" || task.description === "" || task.dueDate <= new Date().toISOString() ){
            setTaskError('Fill in all Fields!')
            if(task.dueDate <= new Date().toISOString() ){
                setTaskError("Deadline Date cannot be in the past." )
            }
        }else {
            if(!editable) {
                setTaskError('')
                dispatch(setNewTask(task))
            }else{
                updateTask(task)
            }

            setTask(
                {
                    id: '',
                    name: '',
                    description: '',
                    priority: 0,
                    status: 'todo',
                    createdAt: new Date().toISOString(),
                    dueDate: new Date().toISOString(),
                    completed: false,
                }
            )
        }
    }
    return (
        <div className={styles.form}>
             <input
                 className={styles.input}
                 placeholder='Name' value={task.name}
                 onChange={(e) => setTask({...task, name: e.target.value})}
             />
             <input
                    className={styles.input}
                    placeholder='Description'
                    value={task.description}
                    onChange={(e) => setTask({...task, description: e.target.value})}
             />

            <div
                className={styles.priorityContainer}
                style={{display: 'flex', justifyContent: 'space-between'}}
            >
                <h4 className={styles.formTittle}>Priority</h4>
                 <input
                    style={{width: '92%'}}
                    type='range'
                    min={0}
                    max={9}
                    value={task.priority}
                    onChange={(e) => setTask({...task, priority: Number(e.target.value)})}
                />
                <div className={styles.priority}>
                    {task.priority}
                </div>
            </div>
             <input
                 className={styles.input}
                 type='datetime-local'
                 value={task.dueDate}
                 onChange={(e) => setTask({...task, dueDate: e.target.value})}
             />
            {taskError? <h4 style={{color:'red'}} className={styles.formTittle}>{taskError}</h4> :''}

            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <button className={styles.btn}  onClick={clear}>Clear</button>
                <button className={styles.btn}  onClick={add}>Add Task</button>
            </div>
        </div>
    );
};

export default TaskForm;