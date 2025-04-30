const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { MongoClient } = require('mongodb');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Basic middleware - these should come BEFORE route definitions
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// CORS headers - should come before routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    return res.status(200).json({});
  }
  next();
});

// Logging middleware - should come before routes
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// res.json override - should come before routes
app.use((req, res, next) => {
  const originalJson = res.json;
  res.json = function(data) {
    if (Array.isArray(data)) {
      console.log(`Response is an array with ${data.length} items`);
    } else if (data && typeof data === 'object') {
      console.log(`Response is an object with keys: ${Object.keys(data)}`);
    }
    res.json = originalJson;
    return res.json(data);
  };
  next();
});

// Direct route for skills - define BEFORE other route handlers
app.get('/api/v1/directskills', async (req, res) => {
  let client;
  try {
    console.log('Direct skills endpoint called');
    
    // Connect to MongoDB
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    console.log('Connected to MongoDB for direct skills endpoint');
    
    // Get all skills
    const db = client.db('esnapup');
    const collection = db.collection('skills');
    const count = await collection.countDocuments();
    const skills = await collection.find({}).toArray();
    
    console.log(`Found ${count} skills in database`);
    console.log(`Returning ${skills.length} skills in response`);
    
    // Return skills directly
    return res.json(skills);
  } catch (error) {
    console.error('Error getting skills:', error);
    return res.status(500).json({ error: error.message });
  } finally {
    if (client) {
      await client.close();
      console.log('MongoDB connection closed');
    }
  }
});

// Simplified skills endpoint - define inline for simplicity
app.get('/api/v1/simpleskills', async (req, res) => {
  let client;
  try {
    console.log('Simple skills endpoint called');
    
    // Connect to MongoDB
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    
    const db = client.db('esnapup');
    const collection = db.collection('skills');
    const skills = await collection.find({}).toArray();
    
    console.log(`Returning ${skills.length} skills from simpleskills endpoint`);
    return res.json(skills);
  } catch (error) {
    console.error('Error in simpleskills endpoint:', error);
    return res.status(500).json({ error: error.message });
  } finally {
    if (client) await client.close();
  }
});

// API routes - these come after direct routes but before 404 handler
app.use('/api/v1/skills', require('./routes/skills'));

// Add other routes here
// app.use('/api/v1/certifications', require('./routes/certifications'));
// etc.

// 404 handler - should be AFTER all routes
app.use((req, res) => {
  console.log(`Route not found: ${req.method} ${req.url}`);
  res.status(404).json({
    message: 'Route not found',
    url: req.originalUrl
  });
});

// Error handler - should be the LAST middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    message: 'Server error',
    error: process.env.NODE_ENV === 'production' ? 'An error occurred' : err.message
  });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;