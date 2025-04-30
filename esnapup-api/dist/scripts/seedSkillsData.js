const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Skill = require('../models/Skill');
const Certification = require('../models/Certification');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected for seeding'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Initial skills data with order for prioritizing display
const skillsData = [
  // Priority technical skills
  { name: '.NET', category: 'technical', order: 1 },
  { name: 'C#', category: 'technical', order: 2 },
  { name: 'Entity Framework', category: 'technical', order: 3 },
  { name: 'Angular', category: 'technical', order: 4 },
  { name: 'JavaScript', category: 'technical', order: 5 },
  // Other technical skills
  { name: 'TypeScript', category: 'technical', order: 6 },
  { name: 'Python', category: 'technical', order: 7 },
  { name: 'Java', category: 'technical', order: 8 },
  { name: 'React.js', category: 'technical', order: 9 },
  { name: 'Node.js', category: 'technical', order: 10 },
  { name: 'Express.js', category: 'technical', order: 11 },
  { name: 'AWS', category: 'technical', order: 12 },
  { name: 'Google Cloud Platform (GCP)', category: 'technical', order: 13 },
  { name: 'Azure', category: 'technical', order: 14 },
  { name: 'SQL', category: 'technical', order: 15 },
  { name: 'NoSQL', category: 'technical', order: 16 },
  { name: 'MongoDB', category: 'technical', order: 17 },
  { name: 'DynamoDB', category: 'technical', order: 18 },
  { name: 'REST APIs', category: 'technical', order: 19 },
  { name: 'GraphQL', category: 'technical', order: 20 },
  { name: 'CI/CD', category: 'technical', order: 21 },
  { name: 'Docker', category: 'technical', order: 22 },
  { name: 'Kubernetes', category: 'technical', order: 23 },
  { name: 'Serverless Architecture', category: 'technical', order: 24 },
  { name: 'Microservices', category: 'technical', order: 25 },
  { name: 'HTML5', category: 'technical', order: 26 },
  { name: 'CSS3', category: 'technical', order: 27 },
  { name: 'Redux', category: 'technical', order: 28 },
  { name: 'Next.js', category: 'technical', order: 29 },
  
  // Tools
  { name: 'Git', category: 'tool', order: 1 },
  { name: 'GitHub', category: 'tool', order: 2 },
  { name: 'JIRA', category: 'tool', order: 3 },
  { name: 'Confluence', category: 'tool', order: 4 },
  { name: 'Jenkins', category: 'tool', order: 5 },
  { name: 'GitHub Actions', category: 'tool', order: 6 },
  { name: 'AWS CloudFormation', category: 'tool', order: 7 },
  { name: 'Terraform', category: 'tool', order: 8 },
  { name: 'Postman', category: 'tool', order: 9 },
  { name: 'VS Code', category: 'tool', order: 10 },
  
  // Soft skills
  { name: 'Agile Methodologies', category: 'soft', order: 1 },
  { name: 'Scrum', category: 'soft', order: 2 },
  { name: 'Project Management', category: 'soft', order: 3 },
  { name: 'Technical Leadership', category: 'soft', order: 4 },
  { name: 'Team Collaboration', category: 'soft', order: 5 },
  { name: 'Problem-solving', category: 'soft', order: 6 },
  { name: 'Critical Thinking', category: 'soft', order: 7 },
  
  // Languages
  { name: 'English (Fluent)', category: 'language', order: 1 },
  { name: 'French (Native)', category: 'language', order: 2 },
];

// Initial certifications data
const certificationsData = [
  {
    title: 'AWS Certified Solutions Architect - Associate',
    issuer: 'Amazon Web Services (AWS)',
    issueDate: new Date('2023-04-01'),
    expirationDate: new Date('2026-04-01'),
    description: 'Validates the ability to design and implement distributed systems on AWS.',
    imageUrl: 'https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png',
    credlyUrl: 'https://www.credly.com/badges/18e3c5a3-881c-435a-b9d2-55caf5c1c8a8',
    type: 'cloud',
    order: 1
  },
  {
    title: 'AWS Certified Developer - Associate',
    issuer: 'Amazon Web Services (AWS)',
    issueDate: new Date('2023-01-15'),
    expirationDate: new Date('2026-01-15'),
    description: 'Demonstrates knowledge of core AWS services, uses, and best practices for developing on AWS.',
    imageUrl: 'https://images.credly.com/size/340x340/images/b9feab85-1a43-4f6c-99a5-631b88d5461b/image.png',
    credlyUrl: 'https://www.credly.com/badges/29a63d01-d8b9-4a84-abe5-a7c8bca8c8a4',
    type: 'cloud',
    order: 2
  },
  {
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services (AWS)',
    issueDate: new Date('2022-11-05'),
    expirationDate: new Date('2025-11-05'),
    description: 'Validates understanding of the AWS Cloud, services, security, architecture, pricing, and support.',
    imageUrl: 'https://images.credly.com/size/340x340/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png',
    credlyUrl: 'https://www.credly.com/badges/0b23493d-5fe6-4573-afec-b3b0d8ebdbc1',
    type: 'cloud',
    order: 3
  },
  {
    title: 'Microsoft Certified: Azure Fundamentals',
    issuer: 'Microsoft',
    issueDate: new Date('2022-09-10'),
    description: 'Validates understanding of cloud concepts, Azure services, Azure workloads, security and privacy in Azure.',
    imageUrl: 'https://images.credly.com/size/340x340/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png',
    credlyUrl: 'https://www.credly.com/badges/e7fa8c13-fd30-4742-81d8-58c1c4bd5588',
    type: 'cloud',
    order: 4
  },
  {
    title: 'Google Cloud Digital Leader',
    issuer: 'Google Cloud',
    issueDate: new Date('2022-12-15'),
    description: 'Demonstrates fundamental knowledge of cloud concepts and Google Cloud products, services, tools, features, benefits, and use cases.',
    imageUrl: 'https://images.credly.com/size/340x340/images/f6783acd-e0fb-4c65-a2f0-2f11be279e19/image.png',
    credlyUrl: 'https://www.credly.com/badges/e8f1b28a-b09c-4b85-8b15-8ecab7992325',
    type: 'cloud',
    order: 5
  },
  {
    title: 'Google Cloud Fundamentals: Core Infrastructure',
    issuer: 'Google Cloud (Coursera)',
    issueDate: new Date('2022-06-15'),
    description: 'Covers essential Google Cloud infrastructure concepts, services, and features.',
    imageUrl: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/images/google.cloud.cert.png',
    courseraUrl: 'https://www.coursera.org/account/accomplishments/certificate/XYZ123',
    type: 'online',
    order: 1
  },
  {
    title: 'Getting Started with Google Kubernetes Engine',
    issuer: 'Google Cloud (Coursera)',
    issueDate: new Date('2022-07-10'),
    description: 'Learn how to deploy, manage, and scale containerized applications on Kubernetes Engine, Google Cloud\'s hosted Kubernetes service.',
    imageUrl: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/images/gcp.kubernetes.cert.png',
    courseraUrl: 'https://www.coursera.org/account/accomplishments/certificate/XYZ124',
    type: 'online',
    order: 2
  },
  {
    title: 'Architecting with Google Compute Engine',
    issuer: 'Google Cloud (Coursera)',
    issueDate: new Date('2022-08-05'),
    description: 'Design and implement robust, scalable solutions on Google Cloud Platform using Compute Engine and related services.',
    imageUrl: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~YYVG2GW9VKJS/CERTIFICATE_LANDING_PAGE~YYVG2GW9VKJS.jpeg',
    courseraUrl: 'https://www.coursera.org/account/accomplishments/specialization/YYVG2GW9VKJS',
    type: 'online',
    order: 3
  }
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Clear existing data
    await Skill.deleteMany({});
    await Certification.deleteMany({});
    
    // Insert new data
    await Skill.insertMany(skillsData);
    await Certification.insertMany(certificationsData);
    
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();