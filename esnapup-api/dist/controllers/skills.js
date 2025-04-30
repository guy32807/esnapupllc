const mongoose = require('mongoose');

// Add this at the top of the file to indicate when this controller is used
console.log('*** LOADING THE CORRECT SKILLS CONTROLLER ***');

// Make sure all exported functions are defined

exports.getSkills = async (req, res, next) => {
  try {
    console.log('*** USING THE CORRECT getSkills FUNCTION ***');
    
    // Connect directly to MongoDB to bypass any Mongoose issues
    const MongoClient = require('mongodb').MongoClient;
    const client = new MongoClient(process.env.MONGODB_URI);
    
    await client.connect();
    console.log('Connected to MongoDB successfully');
    
    const db = client.db('esnapup'); // Use the same database name as in check-collections.js
    const collection = db.collection('skills');
    
    // Count to verify
    const count = await collection.countDocuments();
    console.log(`Found ${count} skills in collection`);
    
    // Get all skills with no limits
    const skills = await collection.find({}).toArray();
    console.log(`Retrieved ${skills.length} skills from database`);
    
    // Close connection
    await client.close();
    
    // Return all skills as JSON
    res.status(200).json(skills);
    
  } catch (err) {
    console.error('Error retrieving skills:', err);
    res.status(500).json({ 
      success: false, 
      error: 'Server error', 
      message: err.message 
    });
  }
};

exports.getSkill = async (req, res, next) => {
  try {
    res.json({ message: `Get skill with ID ${req.params.id}` });
  } catch (err) {
    console.error('Error retrieving skill:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.createSkill = async (req, res, next) => {
  try {
    res.status(201).json({ message: 'Create skill endpoint - implementation pending' });
  } catch (err) {
    console.error('Error creating skill:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateSkill = async (req, res, next) => {
  try {
    res.json({ message: `Update skill with ID ${req.params.id}` });
  } catch (err) {
    console.error('Error updating skill:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteSkill = async (req, res, next) => {
  try {
    res.json({ message: `Delete skill with ID ${req.params.id}` });
  } catch (err) {
    console.error('Error deleting skill:', err);
    res.status(500).json({ error: err.message });
  }
};