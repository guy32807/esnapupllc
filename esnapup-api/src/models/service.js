const mongoose = require('mongoose');

const SpecializationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true }, // Store the icon as a string (e.g., SVG or URL)
});

module.exports = mongoose.model('specialization', SpecializationSchema);