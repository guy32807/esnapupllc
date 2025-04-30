const express = require('express');
const router = express.Router();

// You might want to save contacts to a database
// Here's a simple implementation
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Validate the request
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Here you would typically save the contact to a database
    // For example:
    // await Contact.create({ name, email, message });
    
    // For now, just log it (you'll implement database saving later)
    console.log('New contact form submission:', { name, email, message });
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to process contact form submission' });
  }
});

module.exports = router;