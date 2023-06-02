const authService = require('../services/authService');
const jwt = require('jsonwebtoken');

// Login handler
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (email === 'testUser@tftus.com' && password === 'test@123') {
    authService.createSession(req, email);
    const accessToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ message: 'Login successful', accessToken });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

// Logout handler
exports.logout = (req, res) => {
  authService.destroySession(req);
  res.status(200).json({ message: 'Logout successful' });
};
