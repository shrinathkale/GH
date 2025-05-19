const express = require('express');
const router = express.Router();
const Guest = require("./app")

router.get("/get-guests", async (req, res) => {
  try {
    const now = new Date();
    const guests = await Guest.find({
      $or: [
        { to: { $exists: false } },
        { to: null },
        { to: { $gt: now } } // Guests whose 'to' date is in the future
      ]
    }).sort({ roomNo: 1 });

    res.json(guests);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching available guests' });
  }
});

router.get("/get-guestsAll", async (req,res) => {
    try {
    const guests = await Guest.find().sort({ from: -1 });
    res.json(guests);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching guests' });
  }
});

module.exports = router;