const Certification = require('../models/Certification');

// Get all certifications
exports.getAllCertifications = async (req, res) => {
  try {
    const { type } = req.query;
    
    let query = {};
    if (type) {
      query.type = type;
    }
    
    const certifications = await Certification.find(query).sort({ order: 1, issueDate: -1 });
    
    // Transform to client format
    const formattedCertifications = certifications.map(cert => ({
      id: cert._id,
      title: cert.title,
      issuer: cert.issuer,
      issueDate: cert.issueDate.toISOString(),
      expirationDate: cert.expirationDate ? cert.expirationDate.toISOString() : undefined,
      description: cert.description,
      imageUrl: cert.imageUrl,
      credlyUrl: cert.credlyUrl,
      courseraUrl: cert.courseraUrl
    }));
    
    res.status(200).json(formattedCertifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching certifications', error: error.message });
  }
};

// Get certification by id
exports.getCertificationById = async (req, res) => {
  try {
    const certification = await Certification.findById(req.params.id);
    if (!certification) {
      return res.status(404).json({ message: 'Certification not found' });
    }
    res.status(200).json(certification);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching certification', error: error.message });
  }
};

// Create a new certification
exports.createCertification = async (req, res) => {
  try {
    const { title, issuer, issueDate, expirationDate, description, imageUrl, credlyUrl, courseraUrl } = req.body;
    
    // Validate required fields
    if (!title || !issuer || !issueDate || !description || !imageUrl) {
      return res.status(400).json({ message: 'Title, issuer, issueDate, description, and imageUrl are required' });
    }
    
    const certification = new Certification({
      title,
      issuer,
      issueDate,
      expirationDate,
      description,
      imageUrl,
      credlyUrl,
      courseraUrl
    });
    
    await certification.save();
    res.status(201).json(certification);
  } catch (error) {
    res.status(500).json({ message: 'Error creating certification', error: error.message });
  }
};

// Update certification
exports.updateCertification = async (req, res) => {
  try {
    const updatedCertification = await Certification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedCertification) {
      return res.status(404).json({ message: 'Certification not found' });
    }
    
    res.status(200).json(updatedCertification);
  } catch (error) {
    res.status(500).json({ message: 'Error updating certification', error: error.message });
  }
};

// Delete certification
exports.deleteCertification = async (req, res) => {
  try {
    const certification = await Certification.findByIdAndDelete(req.params.id);
    
    if (!certification) {
      return res.status(404).json({ message: 'Certification not found' });
    }
    
    res.status(200).json({ message: 'Certification deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting certification', error: error.message });
  }
};