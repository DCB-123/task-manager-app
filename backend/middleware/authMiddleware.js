const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure this path is correct

// Middleware to protect routes
exports.protect = async (req, res, next) => {
  let token;

  // Get token from cookies
  if (req.cookies.token) {
    token = req.cookies.token;
  }

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request object
    req.user = await User.findById(decoded.id).select('-password'); // Exclude password from user object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error('Token verification error:', err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};
