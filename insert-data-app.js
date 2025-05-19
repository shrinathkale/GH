const express = require('express');
const router = express.Router();
const Guest = require('./app');

// Route to handle form submission
router.post('/submit-guest', async (req, res) => {
  try {
    const guest = new Guest(req.body);
    await guest.save();
    res.json({ message: 'Guest information saved successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving data' });
  }
});

module.exports = router;