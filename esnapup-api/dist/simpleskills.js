// Create this new file in the same directory as server.js

const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
require('dotenv').config();

// Single, simple route for getting all skills
router.get('/', async (req, res) => {
  let client;
  try {
    // Connect to MongoDB
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    console.log('Connected to MongoDB for simpleskills endpoint');
    
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
    // Always close connection
    if (client) {
      await client.close();
      console.log('MongoDB connection closed');
    }
  }
});

module.exports = router;