const express = require('express');
const { protect } = require('../middleware/authMiddleware'); // Ensure this path is correct
const router = express.Router();

// Example protected route
router.get('/', protect, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

// Create a new task
router.post('/tasks', protect, (req, res) => {
  const { title, description, dueDate } = req.body;

  if (!title || !description || !dueDate) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newTask = {
    id: Date.now(), // Simple ID generation for demonstration
    title,
    description,
    dueDate,
    createdBy: req.user._id, // Associate the task with the logged-in user
  };

  res.status(201).json(newTask);
});

// Get all tasks for the logged-in user
router.get('/tasks', protect, (req, res) => {
  const tasks = [
    { id: 1, title: 'Task 1', description: 'Description for Task 1', user: req.user._id },
    { id: 2, title: 'Task 2', description: 'Description for Task 2', user: req.user._id },
  ];

  res.json(tasks);
});

// Delete a task
router.delete('/tasks/:id', protect, (req, res) => {
  const { id } = req.params;
  res.json({ message: `Task with ID ${id} deleted successfully` });
});

module.exports = router;
