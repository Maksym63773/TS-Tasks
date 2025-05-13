import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import styles from "./TaskForm.module.scss";
import {setNewTask, TaskState, taskStatus} from "../../store/reducers/TaskSlice"



const TaskForm = () => {

    const dispatch = useDispatch<AppDispatch>();
    const tasks = useSelector<RootState, TaskState[]>(state => state.root.tasks);

    const [task, setTask] = useState({
        id: '',
        name: '',
        description: '',
        priority: 0,
        status: "todo" as taskStatus,
        createdAt: new Date().toISOString(),
        dueDate: new Date().toISOString(),
        completed: false,
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
            setTaskError('')
            dispatch(setNewTask(task))
            console.log(tasks)
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
             <input className={styles.input} placeholder='Name' value={task.name} onChange={(e) => setTask({...task, name: e.target.value})}/>
             <input className={styles.input} placeholder='Description' value={task.description}
                   onChange={(e) => setTask({...task, description: e.target.value})}/>

            <div className={styles.priorityContainer} style={{display: 'flex', justifyContent: 'space-between'}}>
                <h4 className={styles.formTittle}>Priority </h4>
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
             <input className={styles.input} type='datetime-local' value={task.dueDate}
                   onChange={(e) => setTask({...task, dueDate: e.target.value})}/>
            {taskError?<h4 style={{color:'red'}} className={styles.formTittle}>{taskError}</h4>:''}
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <button className={styles.btn}  onClick={clear}>Clear</button>
                <button className={styles.btn}  onClick={add}>Add Task</button>
            </div>
        </div>
    );
};

export default TaskForm;