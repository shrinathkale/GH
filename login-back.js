// routes/incharge-login.js
const express = require('express');
const router = express.Router();
require("dotenv").config();

// Fixed credentials
const fixedIncharge = {
  username: process.env.USERNAME,
  password: process.env.PASSWORD
};

// POST /api/auth/login-incharge
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === fixedIncharge.username && password === fixedIncharge.password) {
    return res.json({ message: 'Login successful' });
  } else {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
});

module.exports = router;