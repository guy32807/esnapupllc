const Skill = require('../models/Skill');
const Certification = require('../models/Certification');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Connect to MongoDB with database name specified separately
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'esnapup' // Specify database name here
});

// Get all skills
exports.getAllSkills = async (req, res) => {
  try {
    const { category } = req.query;
    
    let query = {};
    if (category) {
      query.category = category;
    }
    
    const skills = await Skill.find(query).sort({ order: 1, name: 1 });
    
    // Transform to client format
    const formattedSkills = skills.map(skill => ({
      id: skill._id,
      name: skill.name,
      category: skill.category
    }));
    
    res.status(200).json(formattedSkills);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching skills', error: error.message });
  }
};

// Get skill by id
exports.getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.status(200).json(skill);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching skill', error: error.message });
  }
};

// Create a new skill
exports.createSkill = async (req, res) => {
  try {
    const { name, category } = req.body;
    
    // Validate required fields
    if (!name || !category) {
      return res.status(400).json({ message: 'Name and category are required' });
    }
    
    // Check if skill already exists
    const existingSkill = await Skill.findOne({ name });
    if (existingSkill) {
      return res.status(400).json({ message: 'Skill already exists' });
    }
    
    const skill = new Skill({
      name,
      category
    });
    
    await skill.save();
    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ message: 'Error creating skill', error: error.message });
  }
};

// Update skill
exports.updateSkill = async (req, res) => {
  try {
    const { name, category } = req.body;
    
    // Validate required fields
    if (!name && !category) {
      return res.status(400).json({ message: 'At least one field to update is required' });
    }
    
    const updatedSkill = await Skill.findByIdAndUpdate(
      req.params.id,
      { name, category },
      { new: true, runValidators: true }
    );
    
    if (!updatedSkill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    
    res.status(200).json(updatedSkill);
  } catch (error) {
    res.status(500).json({ message: 'Error updating skill', error: error.message });
  }
};

// Delete skill
exports.deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    
    res.status(200).json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting skill', error: error.message });
  }
};

// Check this in your backend code (Node.js/Express server)
// Typically in a route handler or controller for /api/v1/skills
router.get('/skills', async (req, res) => {
  try {
    const allSkills = await Skill.find({});
    console.log(`Found ${allSkills.length} skills in database`);
    res.json(allSkills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
});

// Similarly for certifications
router.get('/certifications', async (req, res) => {
  try {
    const allCertifications = await Certification.find({});
    console.log(`Found ${allCertifications.length} certifications in database`);
    res.json(allCertifications);
  } catch (error) {
    console.error('Error fetching certifications:', error);
    res.status(500).json({ error: 'Failed to fetch certifications' });
  }
});

module.exports = router;