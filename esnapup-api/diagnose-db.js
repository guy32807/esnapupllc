// Create this new script to check what's in your database

require('dotenv').config();
const mongoose = require('mongoose');
const Skill = require('./src/models/Skill');
const Certification = require('./src/models/Certification');

async function diagnoseDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    console.log('MongoDB URI:', process.env.MONGODB_URI);
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'esnapup' // Ensure correct database name
    });
    
    console.log('Connection successful!');
    console.log(`Connected to database: ${mongoose.connection.name}`);
    
    // Check skills collection
    const skillCount = await Skill.countDocuments();
    console.log(`Total skills in database: ${skillCount}`);
    
    if (skillCount > 0) {
      // Get all skills
      const allSkills = await Skill.find({}).lean();
      
      console.log(`Retrieved ${allSkills.length} skills from Skill model`);
      
      // Count by category
      const categories = {};
      allSkills.forEach(skill => {
        if (!categories[skill.category]) {
          categories[skill.category] = 0;
        }
        categories[skill.category]++;
      });
      
      console.log('Skills by category:');
      Object.keys(categories).forEach(category => {
        console.log(`- ${category}: ${categories[category]}`);
      });
      
      // Show first 5 skills
      console.log('First 5 skills:');
      console.log(allSkills.slice(0, 5));
    }
    
    // Check certifications collection 
    const certCount = await Certification.countDocuments();
    console.log(`Total certifications in database: ${certCount}`);
    
    if (certCount > 0) {
      const allCerts = await Certification.find({}).lean();
      console.log(`Retrieved ${allCerts.length} certifications from Certification model`);
      
      // Show first 2 certifications
      console.log('First 2 certifications:');
      console.log(allCerts.slice(0, 2));
    }
    
    // Try raw MongoDB query to check all documents
    const db = mongoose.connection.db;
    const skillsCollection = db.collection('skills');
    const rawSkills = await skillsCollection.find({}).toArray();
    
    console.log(`Raw MongoDB query returned ${rawSkills.length} skills`);
    
    // Exit
    mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error diagnosing database:', error);
    process.exit(1);
  }
}

// Run the diagnosis
diagnoseDatabase();