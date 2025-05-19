const express = require("express");
const router = express.Router();
const Guest = require("./app");

// Express route: routes/guest.js
router.put('/update-guest', async (req, res) => {

  const {company, roomNo, to} = req.body;

  try {
    const result = await Guest.updateOne(
      { company: company.toLowerCase().trim(), roomNo: roomNo.trim(), to: {$in: [undefined, null]}},
      {$set: {to: to || null}}
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'No guest found with that company and room number' });
    }

    res.json({ message: 'Updated successfully'});
  } catch (error) {
    console.error('Failed to update:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;