const express = require('express');
const router = express.Router();
const Specialization = require('../models/service'); // Ensure the model path is correct

// Get all specializations
router.get('/', async (req, res) => {
  try {
    const specializations = await Specialization.find();
    res.json(specializations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single specialization by ID
router.get('/:id', async (req, res) => {
  try {
    const specialization = await Specialization.findById(req.params.id);
    if (!specialization) {
      return res.status(404).json({ message: 'Specialization not found' });
    }
    res.json(specialization);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new specialization
router.post('/', async (req, res) => {
  console.log('POST /api/specializations hit');
  console.log('Request body:', req.body);

  const { title, description, icon } = req.body;
  try {
    const newSpecialization = new Specialization({ title, description, icon });
    await newSpecialization.save();
    console.log('New specialization created:', newSpecialization);
    res.status(201).json(newSpecialization);
  } catch (err) {
    console.error('Error creating specialization:', err.message);
    res.status(400).json({ error: err.message });
  }
});

// Update a specialization by ID
router.put('/:id', async (req, res) => {
  const { title, description, icon } = req.body;
  try {
    const updatedSpecialization = await Specialization.findByIdAndUpdate(
      req.params.id,
      { title, description, icon },
      { new: true, runValidators: true }
    );
    if (!updatedSpecialization) {
      return res.status(404).json({ message: 'Specialization not found' });
    }
    res.json(updatedSpecialization);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a specialization by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedSpecialization = await Specialization.findByIdAndDelete(req.params.id);
    if (!deletedSpecialization) {
      return res.status(404).json({ message: 'Specialization not found' });
    }
    res.json({ message: 'Specialization deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;