const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const nodemailer = require('nodemailer');

// Initialize Twilio client - you'll need to add these environment variables
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// Get recipient information from environment variables (for security)
const recipientPhoneNumber = process.env.RECIPIENT_PHONE_NUMBER || '630-297-9962';
const recipientEmail = process.env.RECIPIENT_EMAIL || 'adubuisson@comcast.net';

// Initialize email transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// SMS notification endpoint
router.post('/sms', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    // Only attempt to send SMS if Twilio credentials are configured
    if (twilioAccountSid && twilioAuthToken && twilioPhoneNumber) {
      const client = twilio(twilioAccountSid, twilioAuthToken);
      
      await client.messages.create({
        body: message,
        from: twilioPhoneNumber,
        to: recipientPhoneNumber
      });
      
      res.status(200).json({ success: true, message: 'SMS notification sent successfully' });
    } else {
      console.log('Twilio credentials not configured. SMS would have sent this message:', message);
      console.log('To recipient:', recipientPhoneNumber);
      
      // Still return success to not disrupt user experience, but log it
      res.status(200).json({ 
        success: true, 
        message: 'SMS notification would have been sent (Twilio not configured)',
        dev_note: 'Configure TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE_NUMBER environment variables'
      });
    }
  } catch (error) {
    console.error('Error sending SMS notification:', error);
    res.status(500).json({ error: 'Failed to send SMS notification', details: error.message });
  }
});

// Email notification endpoint
router.post('/email', async (req, res) => {
  try {
    const { subject, text } = req.body;
    
    if (!subject || !text) {
      return res.status(400).json({ error: 'Subject and text are required' });
    }
    
    // Only attempt to send email if credentials are configured
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: recipientEmail,
        subject: subject,
        text: text
      });
      
      res.status(200).json({ success: true, message: 'Email notification sent successfully' });
    } else {
      console.log('Email credentials not configured. Email would have sent this message:');
      console.log('Subject:', subject);
      console.log('Text:', text);
      console.log('To recipient:', recipientEmail);
      
      // Still return success to not disrupt user experience, but log it
      res.status(200).json({ 
        success: true, 
        message: 'Email notification would have been sent (email not configured)',
        dev_note: 'Configure EMAIL_USER and EMAIL_PASS environment variables'
      });
    }
  } catch (error) {
    console.error('Error sending email notification:', error);
    res.status(500).json({ error: 'Failed to send email notification', details: error.message });
  }
});

module.exports = router;