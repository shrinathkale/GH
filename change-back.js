const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const configPath = path.resolve(__dirname, 'config.json');

// POST /api/auth/change
router.post('/change', (req, res) => {
  const { oldUsername, oldPassword, newPassword, key } = req.body;

  // Load current credentials
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  // Validate old credentials
  if (oldUsername === config.username && oldPassword === config.password && key === config.key) {
    // Update password
    config.password = newPassword;

    // Save updated credentials
    fs.writeFile(configPath, JSON.stringify(config, null, 2), 'utf8', (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to update credentials' });
      }

      return res.json({ message: 'Password updated successfully' });
    });
  } else {
    return res.status(401).json({ error: 'Invalid credentials or key' });
  }
});

module.exports = router;
