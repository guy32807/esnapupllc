const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'Please add an ID'],
    unique: true
  },
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['technical', 'soft', 'language', 'tool']
  }
});

module.exports = mongoose.model('Skill', SkillSchema);