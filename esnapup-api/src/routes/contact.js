const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }
    
    // Here you would typically save to a database
    // For now, just log the contact form submission
    console.log('Contact form submission received:', { name, email, message });
    
    res.status(200).json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon!'
    });
  } catch (error) {
    console.error('Error handling contact form submission:', error);
    res.status(500).json({
      success: false,
      message: 'There was an error processing your request. Please try again later.'
    });
  }
});

module.exports = router;