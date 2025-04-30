console.log('********** ROOT server.js STARTING **********');

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { MongoClient } = require('mongodb');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Basic middleware
app.use(cors({
  origin: [
    'https://your-username.github.io',
    'http://localhost:3000'  // For local development
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Add a simple health check endpoint near the beginning of your routes

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    message: 'API server is running'
  });
});

// Simple test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working from ROOT server.js' });
});

// Direct skills endpoint
app.get('/api/v1/allskills', async (req, res) => {
  let client;
  try {
    console.log('All skills endpoint called');
    
    // Connect to MongoDB directly
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    console.log('Connected to MongoDB');
    
    // Get all skills with no filters
    const db = client.db('esnapup');
    const collection = db.collection('skills');
    
    // Verify collection count
    const count = await collection.countDocuments();
    console.log(`Found ${count} skills in collection`);
    
    // Get all skills
    const skills = await collection.find({}).toArray();
    console.log(`Retrieved ${skills.length} skills from database`);
    
    // Return all skills
    res.json(skills);
  } catch (error) {
    console.error('Error retrieving skills:', error);
    res.status(500).json({ error: error.message });
  } finally {
    if (client) {
      await client.close();
      console.log('MongoDB connection closed');
    }
  }
});

// Update the route imports with correct paths

try {
  app.use('/api/v1/skills', require('./src/routes/skills'));
  console.log('Successfully loaded skills routes');
} catch (err) {
  console.error('Error loading skills routes:', err.message);
  // Create a simple fallback route
  app.get('/api/v1/skills', (req, res) => {
    res.status(503).json({ message: 'Skills routes not available, please use /api/v1/allskills instead' });
  });
}

// Let's not try to load the certifications routes yet
// Instead, create a direct endpoint similar to the skills one
app.get('/api/v1/certifications', async (req, res) => {
  let client;
  try {
    console.log('Direct certifications endpoint called');
    
    // Connect to MongoDB directly
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    console.log('Connected to MongoDB for certifications');
    
    // List all collections to verify structure
    const db = client.db('esnapup');
    const collections = await db.listCollections().toArray();
    console.log('Collections in database:', collections.map(c => c.name));
    
    // Get all certifications with no filters
    const collection = db.collection('certifications');
    
    // Verify collection count
    const count = await collection.countDocuments();
    console.log(`Found ${count} certifications in collection`);
    
    // Log the first few documents to check schema
    const sampleDocs = await collection.find().limit(3).toArray();
    console.log('Sample certification documents:', JSON.stringify(sampleDocs, null, 2));
    
    // Remove any limit and get all certifications
    const certifications = await collection.find({})
      .batchSize(500)  // Process in larger batches
      .limit(200)     // Initially limit to 200 to see if it works
      .toArray();
    
    console.log(`Retrieved ${certifications.length}/${count} certifications from database`);
    console.log('Certification array size in bytes:', JSON.stringify(certifications).length);
    
    // Check if certifications is an array and has items
    if (!Array.isArray(certifications)) {
      console.error('CRITICAL ERROR: certifications is not an array!');
      return res.status(500).json({ error: 'Data format error: Not an array' });
    }
    
    // If the array is empty, check if there are certifications in the DB another way
    if (certifications.length === 0 && count > 0) {
      console.log('WARNING: Found 0 certifications despite count showing', count);
      const altCheck = await db.collection('certifications').findOne({});
      console.log('Alternative check result:', altCheck);
    }
    
    // Return all certifications and explicitly set content type
    res.setHeader('Content-Type', 'application/json');
    return res.json(certifications);
  } catch (error) {
    console.error('Error retrieving certifications:', error);
    return res.status(500).json({ error: error.message, stack: error.stack });
  } finally {
    if (client) {
      await client.close();
      console.log('MongoDB connection closed');
    }
  }
});

// Add this diagnostic endpoint

app.get('/api/v1/diagnose-certifications', async (req, res) => {
  let client;
  try {
    console.log('Certification diagnosis endpoint called');
    
    // Connect to MongoDB directly
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    
    const db = client.db('esnapup');
    const collection = db.collection('certifications');
    
    // Get statistics about the collection
    const count = await collection.countDocuments();
    
    // Sample the first few documents
    const samples = await collection.find().limit(5).toArray();
    
    // Count certifications by type
    const credlyCount = await collection.countDocuments({ 
      credlyUrl: { $exists: true, $ne: null, $ne: "" } 
    });
    
    const courseraCount = await collection.countDocuments({ 
      courseraUrl: { $exists: true, $ne: null, $ne: "" } 
    });
    
    const diagnosticInfo = {
      count,
      samples,
      categoryCounts: {
        credlyCount,
        courseraCount,
        totalWithoutUrls: count - (credlyCount + courseraCount)
      }
    };
    
    res.json(diagnosticInfo);
  } catch (error) {
    console.error('Error in certification diagnosis:', error);
    res.status(500).json({ error: error.message });
  } finally {
    if (client) await client.close();
  }
});

// Add this endpoint for certifications without URLs

app.get('/api/v1/other-certifications', async (req, res) => {
  let client;
  try {
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    
    const db = client.db('esnapup');
    const collection = db.collection('certifications');
    
    // Find certifications with neither URL
    const otherCerts = await collection.find({
      $or: [
        { $and: [{ credlyUrl: { $exists: false } }, { courseraUrl: { $exists: false } }] },
        { $and: [{ credlyUrl: "" }, { courseraUrl: "" }] },
        { $and: [{ credlyUrl: null }, { courseraUrl: null }] },
        { $and: [{ credlyUrl: { $exists: false } }, { courseraUrl: "" }] },
        { $and: [{ credlyUrl: "" }, { courseraUrl: { $exists: false } }] },
        { $and: [{ credlyUrl: null }, { courseraUrl: { $exists: false } }] },
        { $and: [{ credlyUrl: { $exists: false } }, { courseraUrl: null }] }
      ]
    }).toArray();
    
    console.log(`Found ${otherCerts.length} certifications without URLs`);
    
    res.json(otherCerts);
  } catch (error) {
    console.error('Error retrieving other certifications:', error);
    res.status(500).json({ error: error.message });
  } finally {
    if (client) await client.close();
  }
});

// Update the all-certifications endpoint

app.get('/api/v1/all-certifications', async (req, res) => {
  let client;
  try {
    console.log('All certifications endpoint called');
    
    // Connect to MongoDB directly
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    console.log('Connected to MongoDB');
    
    // Get all certifications with no filters
    const db = client.db('esnapup');
    const collection = db.collection('certifications');
    
    // Verify collection count
    const count = await collection.countDocuments();
    console.log(`Found ${count} certifications in collection`);
    
    // Set a large batch size to get all certifications at once
    const certifications = await collection.find({})
      .batchSize(500)
      .toArray();
    
    console.log(`Retrieved ${certifications.length} certifications from database`);
    
    // Count by type
    const credlyCount = certifications.filter(c => c.credlyUrl && c.credlyUrl.trim() !== '').length;
    const courseraCount = certifications.filter(c => c.courseraUrl && c.courseraUrl.trim() !== '').length;
    const otherCount = certifications.filter(c => 
      (!c.credlyUrl || c.credlyUrl.trim() === '') && 
      (!c.courseraUrl || c.courseraUrl.trim() === '')
    ).length;
    
    console.log(`Certification types: Credly: ${credlyCount}, Coursera: ${courseraCount}, Other: ${otherCount}`);
    
    // Return all certifications
    res.json(certifications);
  } catch (error) {
    console.error('Error retrieving certifications:', error);
    res.status(500).json({ error: error.message });
  } finally {
    if (client) {
      await client.close();
      console.log('MongoDB connection closed');
    }
  }
});

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler caught:', err);
  
  // Check if headers have already been sent
  if (res.headersSent) {
    return next(err);
  }
  
  // Send error response
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
    url: req.originalUrl
  });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
  console.log(`MongoDB URI: ${process.env.MONGODB_URI.substring(0, 20)}...`);
});

module.exports = app;