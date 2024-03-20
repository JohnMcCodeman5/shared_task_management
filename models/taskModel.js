const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  task_id: Number,
  description: String,
  day: String,
  date: String,
  startTime: String,
  endTime: String,
  status: String
});


const Task = mongoose.model('Task', taskSchema, 'tasks');

module.exports = Task;