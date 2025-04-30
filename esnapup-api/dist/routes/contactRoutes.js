const express = require('express');
const router = express.Router();

// POST /api/v1/contact
router.post('/', (req, res) => {
  console.log('Contact form submission:', req.body);
  
  res.status(200).json({
    success: true,
    message: 'Thank you for your message. We will get back to you soon!'
  });
});

module.exports = router;