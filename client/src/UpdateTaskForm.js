import React, { useState, useEffect } from 'react';
import TaskPopup from './TaskPopup';
import './UpdateTaskForm.css';
import axios from 'axios';

function UpdateTaskForm({task, fetch, setShowUpdateForm, hideTaskPopup }) { 
    const [newDate, setDate] = useState(task.date);
    const [newDay, setDay] = useState(task.day);
    const [newStartTime, setStartTime] = useState(task.startTime);
    const [newEndTime, setEndTime] = useState(task.endTime);
    const [newDescription, setDescription] = useState(task.description);
    const [newStatus, setStatus] = useState(task.status);

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
    
        if (newDate.trim() === '' || newStartTime.trim() === '' || newEndTime.trim() === '' || newDescription.trim() === '') {
          alert('Please fill in all fields');
          return;
        }
    
        if(newStartTime >= newEndTime){
          alert('A task cannot end before it begins');
          return;
        }

        const updatedTask = {
            ...task, // Maintain existing properties
            date: newDate,
            startTime: newStartTime,
            endTime: newEndTime,
            description: newDescription,
            status: newStatus
          };
      
          try {
            const resp = await axios.put('http://localhost:4000/api/updateTask', updatedTask);
            console.log(resp)
            fetch();
            setShowUpdateForm();
            hideTaskPopup();
            
          } catch (error) {
            console.error('Error updating task:', task.description, error);
          }
      };

    return (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
            <h2>Update Task 
                <span style={{ color: task.status === 'todo' ? 'red' : 'blue' }}> {task.description}</span>
            </h2>
            <button className="close-btn" onClick={() => setShowUpdateForm(false)}>Close</button>
            <div className = 'modal-body'>
            <form onSubmit={handleUpdateSubmit}>
                <div className="form-group">
                <label>Date:</label>
                <input type="date" value={newDate} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className="form-group">
                <label>Start Time:</label>
                <input type="time" value={newStartTime} onChange={(e) => setStartTime(e.target.value)} />
                </div>
                <div className="form-group">
                <label>End Time:</label>
                <input type="time" value={newEndTime} onChange={(e) => setEndTime(e.target.value)} />
                </div>
                <div className="form-group">
                <label>Description:</label>
                <input type="text" value={newDescription} onChange={(e) => setDescription(e.target.value)} />
                </div>
            <div className="form-group">
            <label style={{ marginBottom: '30px' }}>Status:</label>
            <div className='modal-header radio-buttons'>
                <label>
                <input
                    type="radio"
                    name="status"
                    value="todo"
                    checked={newStatus === 'todo'}
                    onChange={(e) => setStatus(e.target.value)}
                />
                Not Completed
                </label>
                <label>
                <input
                    type="radio"
                    name="status"
                    value="done"
                    checked={newStatus === 'done'}
                    onChange={(e) => setStatus(e.target.value)}
                />
                Completed
                </label>
            </div>
            </div>
                <button type="submit">Update Task</button>
            </form>
            </div>
            </div>
        </div>
    </div>    
    );
}

export default UpdateTaskForm;