const express = require('express');
const router = express.Router();
const { getSkills, getSkill, createSkill, updateSkill, deleteSkill } = require('../controllers/skills');

// Main routes
router.get('/', async (req, res) => {
  try {
    console.log('Direct route handler - bypassing controller');
    
    // Connect directly to MongoDB
    const MongoClient = require('mongodb').MongoClient;
    const client = new MongoClient(process.env.MONGODB_URI);
    
    await client.connect();
    console.log('Connected to MongoDB directly');
    
    const db = client.db('esnapup');
    const collection = db.collection('skills');
    
    // Get count
    const count = await collection.countDocuments();
    console.log(`Skills collection has ${count} documents`);
    
    // Get all documents
    const skills = await collection.find({}).toArray();
    console.log(`Retrieved ${skills.length} skills directly from MongoDB`);
    
    // Close connection
    await client.close();
    
    // Send all skills
    res.json(skills);
  } catch (error) {
    console.error('Error retrieving skills:', error);
    res.status(500).json({
      error: error.message,
      stack: error.stack
    });
  }
});

// Replace the original POST route with direct implementation
router.post('/', async (req, res) => {
  try {
    console.log('Create skill endpoint called');
    res.status(201).json({ message: 'Skill creation endpoint - implementation pending' });
  } catch (error) {
    console.error('Error creating skill:', error);
  }
});

// Specialized routes should come BEFORE parameterized routes
router.get('/debug', async (req, res) => {
  try {
    console.log('DEBUG ENDPOINT: Fetching all skills directly from MongoDB');
    
    // Connect directly to MongoDB
    const MongoClient = require('mongodb').MongoClient;
    const client = new MongoClient(process.env.MONGODB_URI);
    
    await client.connect();
    console.log('Connected to MongoDB directly');
    
    const db = client.db('esnapup'); // Make sure this is your database name
    const collection = db.collection('skills');
    
    // Get count
    const count = await collection.countDocuments();
    console.log(`Skills collection has ${count} documents`);
    
    // Get all documents
    const skills = await collection.find({}).toArray();
    console.log(`Retrieved ${skills.length} skills directly from MongoDB`);
    
    // Close connection
    await client.close();
    
    // Send all skills
    res.json(skills);
  } catch (error) {
    console.error('Error in debug endpoint:', error);
    res.status(500).json({
      error: error.message,
      stack: error.stack
    });
  }
});

router.get('/test', (req, res) => {
  // Create a test array with 50 items
  const testArray = Array.from({ length: 50 }, (_, i) => ({
    id: `test-${i}`,
    name: `Test Skill ${i}`,
    category: i % 4 === 0 ? 'technical' : 
             i % 4 === 1 ? 'tool' : 
             i % 4 === 2 ? 'soft' : 'language'
  }));
  
  console.log(`Created test array with ${testArray.length} items`);
  res.json(testArray);
});

// Add this route to get just the count
router.get('/count', async (req, res) => {
  try {
    const MongoClient = require('mongodb').MongoClient;
    const client = new MongoClient(process.env.MONGODB_URI);
    
    await client.connect();
    const db = client.db('esnapup');
    const collection = db.collection('skills');
    
    const count = await collection.countDocuments();
    await client.close();
    
    res.json({ count });
  } catch (error) {
    console.error('Error getting count:', error);
    res.status(500).json({ error: error.message });
  }
});

// Add this route to get skills in batches
router.get('/batch', async (req, res) => {
  try {
    const MongoClient = require('mongodb').MongoClient;
    const client = new MongoClient(process.env.MONGODB_URI);
    
    await client.connect();
    const db = client.db('esnapup');
    const collection = db.collection('skills');
    
    const batchSize = parseInt(req.query.size) || 10;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * batchSize;
    
    const total = await collection.countDocuments();
    const skills = await collection.find({})
      .skip(skip)
      .limit(batchSize)
      .toArray();
    
    await client.close();
    
    res.json({
      total,
      page,
      batchSize,
      skills
    });
  } catch (error) {
    console.error('Error getting batch:', error);
    res.status(500).json({ error: error.message });
  }
});

// Parameterized route should be LAST
router.route('/:id').get(getSkill).put(updateSkill).delete(deleteSkill);

module.exports = router;