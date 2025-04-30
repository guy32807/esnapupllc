const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const nodemailer = require('nodemailer');

// Initialize Twilio client
// You'll need to set these environment variables on your server
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Initialize Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // or whatever email service you prefer
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Your private contact details (never exposed to frontend)
const PHONE_NUMBER = process.env.NOTIFICATION_PHONE_NUMBER || '630-297-9962';
const EMAIL_ADDRESS = process.env.NOTIFICATION_EMAIL || 'adubuisson@comcast.net';

// Handle SMS notifications
router.post('/sms', async (req, res) => {
  try {
    const { message } = req.body;
    
    // Validate request
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    // Send SMS using Twilio
    await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio number
      to: PHONE_NUMBER // Your personal number
    });
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('SMS notification error:', error);
    res.status(500).json({ error: 'Failed to send SMS notification' });
  }
});

// Handle email notifications
router.post('/email', async (req, res) => {
  try {
    const { subject, text } = req.body;
    
    // Validate request
    if (!subject || !text) {
      return res.status(400).json({ error: 'Subject and text are required' });
    }
    
    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: EMAIL_ADDRESS,
      subject: subject,
      text: text
    });
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email notification error:', error);
    res.status(500).json({ error: 'Failed to send email notification' });
  }
});

module.exports = router;