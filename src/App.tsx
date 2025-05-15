import React, {FC, useEffect, useState} from 'react';
import FloatingButton from "./components/FloatingButton/FloatingButton";
import Modal from "./components/Modal/Modal";
import TaskForm from "./components/TaskForm/TaskForm";
import {useSelector} from "react-redux";
import {RootState} from "./store";
import TaskList from "./TasksList/TaskList";
import {TaskState} from "./store/reducers/TaskSlice";
import {useAppSelector} from "./hooks/redux";




const App:FC = () => {

    const [modalActive, setModalActive] = useState<boolean>(false);
    const tasks = useAppSelector(state => state.root.tasks);

    return (
        <div>
          <h1 style={{textAlign:'center', fontSize:'60px'}}>Todo-list</h1>
          <div>
              <h4>Sort By</h4>
              <select>
                  <option>By add time</option>
                  <option>By name</option>
                  <option>By priority</option>
                  <option>Own sort</option>
              </select>
          </div>
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