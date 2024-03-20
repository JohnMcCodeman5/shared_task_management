import React, { useState } from 'react';
import './TaskForm.css';

function TaskForm({ onAddTask, tasks}) {
  const [day, setDay] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo')

  function getDayFromDate(dateString) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    const dayIndex = date.getDay();
    return days[dayIndex];
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (date.trim() === '' || startTime.trim() === '' || endTime.trim() === '' || description.trim() === '') {
      alert('Please fill in all fields');
      return;
    }

    if(startTime >= endTime){
      alert('A task cannot end before it begins');
      return;
    }

    // Create a new task object
    const latest = tasks.length;
    console.log('latest ' + latest);
    
    const newTask = {
      //task_id: Date.now(),
      task_id: latest + 1,
      date,
      day,
      startTime,
      endTime,
      description,
      status
    };

    newTask.day = getDayFromDate(newTask.date);
    //console.log(newTask.task_id);

    onAddTask(newTask);

    setDate('');
    setStartTime('');
    setEndTime('');
    setDescription('');
  };

  return (
    <div className="task-form">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Start Time:</label>
          <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </div>
        <div className="form-group">
          <label>End Time:</label>
          <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default TaskForm;