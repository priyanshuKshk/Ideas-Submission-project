// routes/ideaRoutes.js
const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');

// Get all ideas - Admin only
router.get('/all', authMiddleware, isAdmin, async (req, res) => {
  try {
    const ideas = await Idea.find().populate('user', 'firstName email');
    res.json(ideas);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
