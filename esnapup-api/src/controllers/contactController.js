const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');

// Submit contact form
exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Save contact form submission to database
    const contact = new Contact({
      name,
      email,
      subject,
      message,
      submittedAt: new Date()
    });
    
    await contact.save();
    
    // Send email notification
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL_RECIPIENT,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h3>New contact form submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };
    
    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ 
      success: true, 
      message: 'Your message has been sent successfully!' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'There was an error sending your message. Please try again later.'
    });
  }
};