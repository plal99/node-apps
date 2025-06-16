const mongoose = require("mongoose");

const todoConnection = mongoose.createConnection(process.env.MONGO_URI_TODO);

todoConnection.on('connected', () => {
  console.log('Todo DB connected successfully');
});

todoConnection.on('error', (err) => {
  console.error('Todo DB connection error:', err);
});


const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

module.exports = todoConnection.model("Task", taskSchema);
