const express = require('express');
const router = express.Router();
const Message = require('../models/message');

// Get all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Send a new message
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const newMessage = new Message({ name, email, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;