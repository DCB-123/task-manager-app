const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure correct User model path

// Register User
exports.registerUser  = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

   // Login User
   exports.loginUser  = async (req, res) => {
     const { email, password } = req.body;

     try {
       const user = await User.findOne({ email });
       console.log('User  found:', user); // Log the user object
       if (!user || !(await user.matchPassword(password))) {
         console.log('Invalid credentials'); // Log invalid credentials
         return res.status(401).json({ message: 'Invalid credentials' });
       }

       // Generate a token
       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
         expiresIn: '1h',
       });
       console.log('Generated token:', token); // Log the generated token

       // Respond with user data and token
       res.json({
         _id: user._id,
         name: user.name,
         email: user.email,
         token, // Include the token in the response
       });
     } catch (error) {
       console.error('Login error:', error);
       res.status(500).json({ message: 'Server error' });
     }
   };

// Logout User
exports.logoutUser  = (req, res) => {
  res.cookie('token', '', { maxAge: 0 }); // Clear the cookie
  res.json({ message: 'Logged out successfully' });
};
