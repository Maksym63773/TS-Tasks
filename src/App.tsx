import React, {FC, useEffect, useState} from 'react';
import FloatingButton from "./components/FloatingButton/FloatingButton";
import Modal from "./components/Modal/Modal";
import TaskForm from "./components/TaskForm/TaskForm";
import {useSelector} from "react-redux";
import {RootState} from "./store";
import TaskList from "./TasksList/TaskList";
import {TaskState} from "./store/reducers/TaskSlice";




const App:FC = () => {

    const [modalActive, setModalActive] = useState<boolean>(false);
    const tasks = useSelector<RootState, TaskState[]>(state => state.root.tasks);

    return (
        <div>
          <h1 style={{textAlign:'center', fontSize:'60px'}}>Todo-list</h1>
          <FloatingButton onClick={() => setModalActive(modalActive=>!modalActive)}>
              +
          </FloatingButton>
          <Modal active={modalActive} setActive={setModalActive}>
            <TaskForm/>

          </Modal>
          <TaskList />
        </div>
    );
};

export default App;