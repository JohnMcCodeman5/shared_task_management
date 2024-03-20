import React, { useState, useEffect } from 'react';
import CalendarGrid from './CalendarGrid';
import TaskForm from './TaskForm';
import './App.css';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);

  const onAddTask = async (newTask) => {
    console.log(newTask);
    try {
      const resp = await axios.post('http://localhost:4000/api/saveTasks', newTask);
      //console.log(resp);
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
    setTasks([...tasks, newTask]);
  };

  const handleWeekChange = (event) => {
    const selectedIndex = parseInt(event.target.value);
    setSelectedWeek(options[selectedIndex]);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/tasks');
      const storedTasks = response.data.map(item => ({
        task_id: item.task_id,
        description: item.description,
        date: item.date,
        day: item.day,
        startTime: item.startTime,
        endTime: item.endTime,
        status: item.status

      }));
      //console.log(storedTasks);
      setTasks(storedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const options = [];
  const currentDate = new Date();
  const range = 5;
  for (let i = -range; i <= range; i++) {
    const startDate = new Date(currentDate);
    startDate.setDate(startDate.getDate() + i * 7);
    startDate.setHours(0, 0, 0, 0)
  
    const dayOfWeek = startDate.getDay();
    const diff = startDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    startDate.setDate(diff);

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);
    endDate.setHours(23, 59, 59, 999);
    const optionText = `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    options.push({ value: i + range, text: optionText, startDate: startDate, endDate: endDate });
  }

  const [selectedWeek, setSelectedWeek] = useState(options[0]);

  const selectedTasks = tasks.filter(task => {
    const taskDate = new Date(task.date);
    return taskDate >= selectedWeek.startDate && taskDate <= selectedWeek.endDate;
  });
  //console.log(selectedTasks);
  

  return (
    <div className="app">
      <div className="left-section">
        <h2>Choose Week:</h2>
          <select value={selectedWeek.value} onChange={handleWeekChange}>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
            {option.text}
            </option>
           ))}
         </select>
      </div>
  
      <div className="right-section">
        <TaskForm onAddTask={onAddTask} tasks={tasks} />
        <CalendarGrid tasks={selectedTasks} fetch={fetchData} />
      </div>
    </div>
  );
  

  /*return (
    <div className="app">
      <div className="left-section">
        <h2>Choose Week:</h2>
        <select value={selectedWeek.value} onChange={handleWeekChange}>
          {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.text}
          </option>
          ))}
        </select>
      </div>
      
      <div className="right-section">
        <TaskForm onAddTask={onAddTask} tasks = {tasks} />
        <br />
        <CalendarGrid tasks={selectedTasks} fetch={fetchData}/>
      </div>
    </div>
  );*/
}

export default App;


