const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Get MongoDB URI from environment
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.0';

// Load models
const Specialization = require('./models/Specialization');
const Project = require('./models/Project');
const Skill = require('./src/models/Skill'); // Update this path
const Certification = require('./src/models/Certification'); // Update this path

// Connect to MongoDB using the URI from .env
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected to:', mongoUri))
.catch(err => console.error('MongoDB Connection Error:', err));

// Sample data
const specializations = [
  {
    title: "Web Development",
    description: "Modern, responsive web applications built with React, Angular, or Vue.",
    icon: "web",
    sortOrder: 1
  },
  {
    title: "Mobile Development",
    description: "Native and cross-platform mobile applications for iOS and Android.",
    icon: "smartphone",
    sortOrder: 2
  },
  {
    title: "Cloud Solutions",
    description: "Scalable and reliable cloud infrastructure on AWS, Azure, or Google Cloud.",
    icon: "cloud",
    sortOrder: 3
  },
  {
    title: "DevOps",
    description: "Streamlined CI/CD pipelines and infrastructure automation.",
    icon: "settings",
    sortOrder: 4
  },
  {
    title: "AI & Machine Learning",
    description: "Smart solutions leveraging the latest in artificial intelligence and machine learning.",
    icon: "psychology",
    sortOrder: 5
  },
  {
    title: "Database Design",
    description: "Efficient and scalable database architectures for your business needs.",
    icon: "storage",
    sortOrder: 6
  }
];

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with product management, cart, checkout, and payment integration.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
    imageUrl: "ecommerce.jpg",
    projectUrl: "https://ecommerce-example.com",
    githubUrl: "https://github.com/esnapup/ecommerce",
    featured: true,
    sortOrder: 1
  },
  {
    title: "Real Estate Listing App",
    description: "A property listing application with search, filters, and map integration.",
    technologies: ["React Native", "Firebase", "Google Maps API"],
    imageUrl: "realestate.jpg",
    projectUrl: "https://realestate-example.com",
    githubUrl: "https://github.com/esnapup/realestate",
    featured: true,
    sortOrder: 2
  },
  {
    title: "HR Management System",
    description: "An enterprise HR solution for employee management, attendance tracking, and payroll.",
    technologies: ["Angular", "Spring Boot", "MySQL", "Docker"],
    imageUrl: "hrms.jpg",
    projectUrl: "https://hrms-example.com",
    githubUrl: "https://github.com/esnapup/hrms",
    featured: false,
    sortOrder: 3
  },
  {
    title: "Health & Fitness Tracker",
    description: "A mobile application to track workouts, nutrition, and health metrics.",
    technologies: ["React Native", "GraphQL", "AWS Amplify"],
    imageUrl: "fitness.jpg",
    projectUrl: "https://fitness-example.com",
    githubUrl: "https://github.com/esnapup/fitness",
    featured: true,
    sortOrder: 4
  },
  {
    title: "Social Media Dashboard",
    description: "A unified dashboard for managing multiple social media accounts and analytics.",
    technologies: ["Vue.js", "Python", "Flask", "PostgreSQL"],
    imageUrl: "socialdashboard.jpg",
    projectUrl: "https://social-dashboard-example.com",
    githubUrl: "https://github.com/esnapup/social-dashboard",
    featured: false,
    sortOrder: 5
  },
  {
    title: "AI-Powered Content Generator",
    description: "An application that uses AI to generate marketing content and social media posts.",
    technologies: ["Python", "TensorFlow", "Flask", "React"],
    imageUrl: "ai-content.jpg",
    projectUrl: "https://ai-content-example.com",
    githubUrl: "https://github.com/esnapup/ai-content",
    featured: true,
    sortOrder: 6
  }
];

const skillsData = [
  // Technical skills
  { id: 'net-1', name: '.NET', category: 'technical' },
  { id: 'net-2', name: 'C#', category: 'technical' },
  { id: 'net-3', name: 'Entity Framework', category: 'technical' },
  { id: 'angular', name: 'Angular', category: 'technical' },
  { id: '1', name: 'JavaScript', category: 'technical' },
  { id: '2', name: 'TypeScript', category: 'technical' },
  { id: '3', name: 'Python', category: 'technical' },
  { id: '4', name: 'Java', category: 'technical' },
  { id: '5', name: 'React.js', category: 'technical' },
  { id: '6', name: 'Node.js', category: 'technical' },
  { id: '7', name: 'Express.js', category: 'technical' },
  { id: '8', name: 'AWS', category: 'technical' },
  { id: '9', name: 'Google Cloud Platform (GCP)', category: 'technical' },
  { id: '10', name: 'Azure', category: 'technical' },
  { id: '11', name: 'SQL', category: 'technical' },
  { id: '12', name: 'NoSQL', category: 'technical' },
  { id: '13', name: 'MongoDB', category: 'technical' },
  { id: '14', name: 'DynamoDB', category: 'technical' },
  { id: '15', name: 'REST APIs', category: 'technical' },
  { id: '16', name: 'GraphQL', category: 'technical' },
  { id: '17', name: 'CI/CD', category: 'technical' },
  { id: '18', name: 'Docker', category: 'technical' },
  { id: '19', name: 'Kubernetes', category: 'technical' },
  { id: '20', name: 'Serverless Architecture', category: 'technical' },
  { id: '21', name: 'Microservices', category: 'technical' },
  { id: '22', name: 'HTML5', category: 'technical' },
  { id: '23', name: 'CSS3', category: 'technical' },
  { id: '24', name: 'Sass/SCSS', category: 'technical' },
  { id: '25', name: 'Material UI', category: 'technical' },
  
  // Tools
  { id: '26', name: 'Git', category: 'tool' },
  { id: '27', name: 'GitHub', category: 'tool' },
  { id: '28', name: 'JIRA', category: 'tool' },
  { id: '29', name: 'Confluence', category: 'tool' },
  { id: '30', name: 'Jenkins', category: 'tool' },
  { id: '31', name: 'GitHub Actions', category: 'tool' },
  { id: '32', name: 'VS Code', category: 'tool' },
  { id: '33', name: 'Postman', category: 'tool' },
  { id: '34', name: 'Figma', category: 'tool' },
  { id: '35', name: 'Slack', category: 'tool' },
  
  // Soft skills
  { id: '36', name: 'Agile Methodologies', category: 'soft' },
  { id: '37', name: 'Scrum', category: 'soft' },
  { id: '38', name: 'Project Management', category: 'soft' },
  { id: '39', name: 'Technical Leadership', category: 'soft' },
  { id: '40', name: 'Problem Solving', category: 'soft' },
  { id: '41', name: 'Team Collaboration', category: 'soft' },
  { id: '42', name: 'Communication', category: 'soft' },
  
  // Languages
  { id: '43', name: 'English (Fluent)', category: 'language' },
  { id: '44', name: 'French (Native)', category: 'language' },
  { id: '45', name: 'Spanish (Basic)', category: 'language' }
];

const certificationsData = [
  {
    id: '1',
    title: 'AWS Certified Solutions Architect - Associate',
    issuer: 'Amazon Web Services (AWS)',
    issueDate: '2023-04-01',
    expirationDate: '2026-04-01',
    description: 'Validates the ability to design and implement distributed systems on AWS.',
    imageUrl: 'https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png',
    credlyUrl: 'https://www.credly.com/badges/18e3c5a3-881c-435a-b9d2-55caf5c1c8a8'
  },
  {
    id: '2',
    title: 'AWS Certified Developer - Associate',
    issuer: 'Amazon Web Services (AWS)',
    issueDate: '2023-01-15',
    expirationDate: '2026-01-15',
    description: 'Demonstrates knowledge of core AWS services, uses, and best practices for developing on AWS.',
    imageUrl: 'https://images.credly.com/size/340x340/images/b9feab85-1a43-4f6c-99a5-631b88d5461b/image.png',
    credlyUrl: 'https://www.credly.com/badges/29a63d01-d8b9-4a84-abe5-a7c8bca8c8a4'
  },
  {
    id: '3',
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services (AWS)',
    issueDate: '2022-11-05',
    expirationDate: '2025-11-05',
    description: 'Validates understanding of the AWS Cloud, services, security, architecture, pricing, and support.',
    imageUrl: 'https://images.credly.com/size/340x340/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png',
    credlyUrl: 'https://www.credly.com/badges/0b23493d-5fe6-4573-afec-b3b0d8ebdbc1'
  },
  {
    id: '4',
    title: 'Microsoft Certified: Azure Fundamentals',
    issuer: 'Microsoft',
    issueDate: '2022-09-20',
    description: 'Demonstrates understanding of cloud concepts, Azure services, Azure workloads, security and privacy in Azure, as well as Azure pricing and support.',
    imageUrl: 'https://images.credly.com/size/680x680/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png',
    credlyUrl: 'https://www.credly.com/badges/example-azure'
  },
  {
    id: 'coursera-1',
    title: 'Google Cloud Fundamentals: Core Infrastructure',
    issuer: 'Google Cloud (Coursera)',
    issueDate: '2022-06-15',
    description: 'Covers essential Google Cloud infrastructure concepts, services, and features.',
    imageUrl: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~PTDXNPERRNA5/CERTIFICATE_LANDING_PAGE~PTDXNPERRNA5.jpeg',
    courseraUrl: 'https://www.coursera.org/account/accomplishments/certificate/PTDXNPERRNA5'
  },
  {
    id: 'coursera-2',
    title: 'Getting Started with Google Kubernetes Engine',
    issuer: 'Google Cloud (Coursera)',
    issueDate: '2022-07-10',
    description: 'Learn how to deploy, manage, and scale containerized applications on Kubernetes Engine, Google Cloud\'s hosted Kubernetes service.',
    imageUrl: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~WFHEV92XCUBG/CERTIFICATE_LANDING_PAGE~WFHEV92XCUBG.jpeg',
    courseraUrl: 'https://www.coursera.org/account/accomplishments/certificate/WFHEV92XCUBG'
  },
  {
    id: 'coursera-3',
    title: 'Machine Learning',
    issuer: 'Stanford University (Coursera)',
    issueDate: '2022-05-01',
    description: 'Comprehensive course covering machine learning, datamining, and statistical pattern recognition.',
    imageUrl: 'https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~example/CERTIFICATE_LANDING_PAGE~example.jpeg',
    courseraUrl: 'https://www.coursera.org/account/accomplishments/certificate/example'
  }
];

// Import into DB
const importData = async () => {
  try {
    await Specialization.deleteMany();
    await Project.deleteMany();
    await Skill.deleteMany();
    await Certification.deleteMany();
    
    console.log('Creating specializations...');
    await Specialization.create(specializations);
    
    console.log('Creating projects...');
    await Project.create(projects);

    console.log(`Attempting to import ${skillsData.length} skills and ${certificationsData.length} certifications`);
    const insertedSkills = await Skill.insertMany(skillsData);
    const insertedCerts = await Certification.insertMany(certificationsData);
    console.log(`Successfully imported ${insertedSkills.length} skills and ${insertedCerts.length} certifications`);

    console.log('Data imported successfully');
    process.exit();
  } catch (err) {
    console.error('Error importing data:', err);
    console.error(err.message);
    if (err.name === 'ValidationError') {
      Object.keys(err.errors).forEach(key => {
        console.error(`Validation error for field "${key}": ${err.errors[key].message}`);
      });
    }
    process.exit(1);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Specialization.deleteMany();
    await Project.deleteMany();
    await Skill.deleteMany();
    await Certification.deleteMany();

    console.log('Data deleted successfully');
    process.exit();
  } catch (err) {
    console.error('Error deleting data:', err);
    process.exit(1);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} else {
  console.log('Please use correct command: node seeder.js -i (to import) or node seeder.js -d (to delete)');
  process.exit();
}