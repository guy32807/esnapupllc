const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });
console.log('.env file path:', path.resolve(__dirname, '../.env'));
console.log('Environment variables loaded:', {
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV
});

// Create Express app
const app = express();

// MongoDB connection
const connectDB = async () => {
  try {
    // Add the database name to the connection string if needed
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/esnapup?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.0';
    
    if (!mongoUri) {
      console.error('MongoDB URI is not defined. Check your .env file.');
      return;
    }
    
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'], // Add any frontend origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // Log HTTP requests

// Define routes
// Use try-catch to handle missing files gracefully
try {
  app.use('/api/v1/skills', require('./routes/skillsRoutes'));
  console.log('Skills routes loaded');
} catch (err) {
  console.error('Failed to load skills routes:', err.message);
  // Create a default route if the file is missing
  app.use('/api/v1/skills', (req, res) => {
    res.status(200).json([
      { id: 'net-1', name: '.NET', category: 'technical' },
      { id: 'net-2', name: 'C#', category: 'technical' },
      { id: 'net-3', name: 'Entity Framework', category: 'technical' },
      { id: 'angular', name: 'Angular', category: 'technical' },
      { id: '1', name: 'JavaScript', category: 'technical' }
    ]);
  });
}

try {
  app.use('/api/v1/certifications', require('./routes/certificationsRoutes'));
  console.log('Certification routes loaded');
} catch (err) {
  console.error('Failed to load certification routes:', err.message);
  // Create a default route if the file is missing
  app.use('/api/v1/certifications', (req, res) => {
    res.status(200).json([
      {
        id: '1',
        title: 'AWS Certified Solutions Architect - Associate',
        issuer: 'Amazon Web Services (AWS)',
        issueDate: '2023-04-01',
        expirationDate: '2026-04-01',
        description: 'Validates the ability to design and implement distributed systems on AWS.',
        imageUrl: 'https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png',
        credlyUrl: 'https://www.credly.com/badges/18e3c5a3-881c-435a-b9d2-55caf5c1c8a8'
      }
    ]);
  });
}

try {
  app.use('/api/v1/contact', require('./routes/contactRoutes'));
  console.log('Contact routes loaded');
} catch (err) {
  console.error('Failed to load contact routes:', err.message);
  // Create a default route if the file is missing
  app.use('/api/v1/contact', (req, res) => {
    res.status(200).json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon!'
    });
  });
}

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    message: 'Route not found',
    url: req.originalUrl 
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

module.exports = app;