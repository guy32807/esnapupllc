// Add similar logging to the certifications controller

exports.getCertifications = async (req, res, next) => {
  try {
    console.log('Retrieving certifications from database...');
    
    // Count total records
    const count = await Certification.countDocuments();
    console.log(`Total certifications in collection: ${count}`);
    
    // Get all certifications with no filtering
    const certifications = await Certification.find({}).lean();
    
    console.log(`Retrieved ${certifications.length} certifications from database`);
    
    // Log some sample data
    if (certifications.length > 0) {
      console.log('First few certifications:', certifications.slice(0, 2));
    }
    
    // Return all certifications
    res.status(200).json(certifications);
  } catch (err) {
    console.error('Error retrieving certifications:', err);
    res.status(500).json({ error: 'Server error' });
  }
};