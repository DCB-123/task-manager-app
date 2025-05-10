const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware Setup
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies
app.use(cors({
  origin: 'http://localhost:3001', // Frontend URL
  credentials: true, // Allow credentials (cookies)
}));

// Routes Setup
app.use('/api/auth', authRoutes); // User Authentication Routes
app.use('/api/tasks', taskRoutes); // Task Routes

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));

// Default route
app.get('/', (req, res) => res.send('API is running...'));
console.log('JWT_SECRET:', process.env.JWT_SECRET);
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
