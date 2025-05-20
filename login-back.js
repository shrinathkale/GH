// routes/incharge-login.js
const express = require('express');
const router = express.Router();
require("dotenv").config();
const fs = require('fs');
const path = require('path');

const configPath = path.resolve(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// Fixed credentials
const fixedIncharge = {
  username: config.username,
  password: config.password
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