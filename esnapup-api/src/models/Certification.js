const mongoose = require('mongoose');

const CertificationSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'Please add an ID'],
    unique: true
  },
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  issuer: {
    type: String,
    required: [true, 'Please add an issuer'],
    trim: true
  },
  issueDate: {
    type: String,
    required: [true, 'Please add an issue date']
  },
  expirationDate: {
    type: String
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  imageUrl: {
    type: String,
    required: [true, 'Please add an image URL']
  },
  credlyUrl: {
    type: String
  },
  courseraUrl: {
    type: String
  }
});

module.exports = mongoose.model('Certification', CertificationSchema);