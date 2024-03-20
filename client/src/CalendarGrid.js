import React, { useState, useEffect } from 'react';
import TaskPopup from './TaskPopup.js'
import './CalendarGrid.css';

function CalendarGrid({ tasks, fetch }) {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  function getdateFromDate(dateString) {
    const dates = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const date = new Date(dateString);
    const dateIndex = date.getdate();
    return dates[dateIndex];
  }

  const taskDates = Array.from(new Set(tasks.map(task => task.date)));
  const taskHours = Array.from({ length: 24 }, (_, index) => `${index.toString().padStart(2, '0')}:00`);


  const filterTasks = (day, hour) => {
    return tasks.filter(task => task.day === day && task.startTime <= hour && task.endTime >= hour);
  };


  const daysInWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const calculateDuration = (task) => {
    const start = parseInt(task.startTime.split(':')[0]);
    const end = parseInt(task.endTime.split(':')[0]);
    return end - start;
  };

  const taskCellCLick = (task, x, y) => {
    setSelectedTask(task);
    setPopupPosition({ x, y });
    setShowPopup(true);
  };

  const closeTaskPopup = () =>{
    setShowPopup(false);
  };


  var summedDuration = 0;
  return (
    <div>
      <table className="calendar-grid">
        <thead>
         <tr>
            <th></th>
            {taskHours.map(hour => (
              <th key={hour}>{hour}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {daysInWeek.map(day => {
            //console.log('end of day: ' + day + ' , duration: ' + summedDuration);
            summedDuration = 0;
            return (
              <tr key={day}>
                <td>{day}</td>
                {taskHours.map((hour, index) => {
                  const tasksForHour = filterTasks(day, hour);
                  if (tasksForHour.length === 0) { 
                    summedDuration += 1;
                    return <td key={`${day}-${hour}`} />;
                  } else {
                    const startingTask = tasksForHour.find(task => task.startTime === hour);
                    if (startingTask) {
                      const duration = calculateDuration(startingTask);
                      summedDuration += duration;
                      //console.log('day: ' + day + ' , duration: ' + summedDuration);
                      if(summedDuration < 24){
                        return <td className="task_field" key={`${day}-${hour}`} colSpan={(summedDuration === 24) ? null : duration} onClick={(event) => taskCellCLick(startingTask, event.clientX, event.clientY)}>
                         {startingTask.description}
                        </td>
                      }  
                    } else {
                      summedDuration += 1;
                      return <td key={`${day}-${hour}`} />;
                    }
                  }
               })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {showPopup && <TaskPopup task={selectedTask} position={popupPosition} onClose = {closeTaskPopup} fetch = {fetch}/>}
    </div>  
  );
}

export default CalendarGrid;