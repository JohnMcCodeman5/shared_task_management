const express = require('express');

const app = express();

const cors = require('cors');

app.use(cors());

const mongoose = require('mongoose');

const fs = require('fs');

//const data_import = require('./data_import.js')

const Task = require('./models/taskModel');

const mongoURI = 'mongodb://localhost:27017/local';

app.use(express.json());

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });


app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    console.log(tasks);
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/api/saveTasks', async (req, res) => {
  try {
    const data = req.body;
    //console.log("data: " + JSON.stringify(data))
    const task = new Task(data);
    await task.save();
    res.json(task);
  } catch (error) {
    console.error('Error saving task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.put('/api/updateTask', async (req, res) => {
  try {
    const updatedTask = req.body;
    console.log('updatedTask: ' + updatedTask);
    const taskId = updatedTask.task_id;
    const existingTask = await Task.findOneAndUpdate({ task_id: taskId }, updatedTask, { new: true }); 

    if (!existingTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(existingTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});


app.delete('/api/deleteTask/:taskid', async (req, res) => {
  try {
    const desc = req.params.taskid;
    console.log("taskID: " + desc);
    await Task.deleteOne({ task_id: desc }); 
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }  
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
