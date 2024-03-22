import React, {useState} from 'react';
import UpdateTaskForm from './UpdateTaskForm.js'
import './TaskPopup.css'
import axios from 'axios';

function TaskPopup({ task, position, onClose, fetch }) {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [style, setStyle] = useState();
  const { x, y } = position;

  const deleteTask = async (taskid) => {
    try {
      console.log('taskid is: ' + taskid);
      const resp = await axios.delete(`http://localhost:4000/api/deleteTask/${taskid}`);
      console.log(resp);
      fetch();
      onClose();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const revealUpdateForm = () =>{
    setShowUpdateForm(!showUpdateForm);
  }

  return (
    <div>
      <div>{showUpdateForm && <UpdateTaskForm className = 'update-form' task={task} fetch = {fetch} setShowUpdateForm = {setShowUpdateForm} hideTaskPopup = {onClose}/>}</div>
      <div className="popup" style={{ position: 'absolute', left: x, top: y }}>
        <div className="popup-content">
          <h2>{task.description}</h2>
          <h3>{task.startTime} - {task.endTime}</h3>
          <h3>Task status:
          <span style={{ color: task.status === 'todo' ? 'red' : 'blue' }}> {task.status}</span>
          </h3>
          <button onClick={() => { revealUpdateForm()}}>Update</button>
          <button onClick={() => deleteTask(task.task_id)}>Delete</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default TaskPopup;