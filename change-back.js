const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
require("dotenv").config();

const envPath = path.resolve(__dirname, '.env');

// POST /api/auth/change
router.post('/change', (req, res) => {
  const { oldUsername, oldPassword, newPassword, key } = req.body;

  // Validate old credentials
  if (oldUsername === process.env.USERNAME && oldPassword === process.env.PASSWORD && key === process.env.KEY) {
    // Read current .env file
    fs.readFile(envPath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to read environment file' });
      }

      // Replace old username and password
      let updatedEnv = data
        .replace(/PASSWORD=.*/g, `PASSWORD=${newPassword}`);

      // Write updated content back to .env file
      fs.writeFile(envPath, updatedEnv, 'utf8', (err) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to write environment file' });
        }

        return res.json({ message: 'Credentials updated successfully. Please restart the server for changes to take effect.' });
      });
    });
  } else {
    return res.status(401).json({ error: 'Invalid old username or password or key' });
  }
});

module.exports = router;