const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  const { title, description, dueDate } = req.body;

  // Validate input
  if (!title || !description || !dueDate) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Create a new task instance
    const newTask = new Task({
      title,
      description,
      dueDate,
      createdBy: req.user.id, // The user from the token
    });

    // Save the task to the database
    await newTask.save();

    // Respond with the created task
    res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ message: 'Failed to create task' });
  }
};
