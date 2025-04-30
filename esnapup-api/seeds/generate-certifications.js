require('dotenv').config();
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// Generate 179 certifications for demonstration purposes
function generateCertifications() {
  const certifications = [];
  
  // AWS Certifications (credlyUrl)
  const awsCerts = [
    { title: "AWS Certified Solutions Architect - Associate", image: "0e284c3f-5164-4b21-8660-0d84737941bc/image.png" },
    { title: "AWS Certified Developer - Associate", image: "b9feab85-1a43-4f6c-99a5-631b88d5461b/image.png" },
    { title: "AWS Certified Cloud Practitioner", image: "00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png" },
    { title: "AWS Certified Security - Specialty", image: "53acdae5-d69f-4dda-b650-d02ed7a50dd7/image.png" },
    { title: "AWS Certified DevOps Engineer - Professional", image: "bd31ef55-1066-4288-a188-7b6e79a9c729/image.png" },
    { title: "AWS Certified Data Analytics - Specialty", image: "7b050b62-9d67-4006-a9ce-36b19e2acaac/image.png" }
  ];
  
  // Coursera Courses (courseraUrl)
  const courseraCourses = [
    { title: "Google Cloud Fundamentals: Core Infrastructure", issuer: "Google Cloud" },
    { title: "Getting Started with Google Kubernetes Engine", issuer: "Google Cloud" },
    { title: "Introduction to TensorFlow", issuer: "DeepLearning.AI" },
    { title: "Machine Learning with Python", issuer: "IBM" },
    { title: "Deep Learning Specialization", issuer: "DeepLearning.AI" },
    { title: "Python for Data Science and AI", issuer: "IBM" }
  ];
  
  // Other Certifications (no URLs)
  const otherCerts = [
    { title: "Azure Fundamentals (AZ-900)", issuer: "Microsoft" },
    { title: "Microsoft Certified: Azure Developer Associate", issuer: "Microsoft" },
    { title: "Certified Kubernetes Administrator (CKA)", issuer: "Cloud Native Computing Foundation" },
    { title: "Certified Information Systems Security Professional (CISSP)", issuer: "ISC²" },
    { title: "Certified Ethical Hacker (CEH)", issuer: "EC-Council" },
    { title: "CompTIA Security+", issuer: "CompTIA" }
  ];
  
  // Programming course templates for bulk generation
  const programmingCourses = [
    { prefix: "Introduction to ", issuer: "Coursera" },
    { prefix: "Advanced ", issuer: "Coursera" },
    { prefix: "Mastering ", issuer: "Udemy" },
    { prefix: "Professional ", issuer: "edX" },
    { prefix: "Fundamentals of ", issuer: "Pluralsight" },
    { prefix: "Complete Guide to ", issuer: "Udemy" }
  ];
  
  // Languages and technologies for bulk generation
  const technologies = [
    "JavaScript", "Python", "Java", "C#", "Go", "Rust", "React", "Vue.js", "Angular",
    "Node.js", "Django", "Flask", "Spring Boot", "ASP.NET Core", "GraphQL", "RESTful APIs",
    "Docker", "Kubernetes", "CI/CD", "Jenkins", "GitHub Actions", "AWS Lambda", "Azure Functions",
    "Serverless Architecture", "Microservices", "System Design", "Database Design", "MongoDB",
    "PostgreSQL", "MySQL", "Redis", "Elasticsearch", "Machine Learning", "AI", "Data Science",
    "Big Data", "Apache Spark", "Hadoop", "Blockchain", "Cybersecurity", "Network Security"
  ];
  
  // Cloud certification templates
  const cloudCertTemplates = [
    { prefix: "Certified ", suffix: " Administrator", issuer: "Cloud Provider" },
    { prefix: "Certified ", suffix: " Developer", issuer: "Cloud Provider" },
    { prefix: "Certified ", suffix: " Architect", issuer: "Cloud Provider" },
    { prefix: "", suffix: " Essentials", issuer: "Cloud Provider" },
    { prefix: "", suffix: " Fundamentals", issuer: "Cloud Provider" },
    { prefix: "Professional ", suffix: " Engineer", issuer: "Cloud Provider" }
  ];
  
  // Cloud providers
  const cloudProviders = ["AWS", "Google Cloud", "Microsoft Azure", "Oracle Cloud", "IBM Cloud", "Alibaba Cloud"];
  
  // Add AWS Certifications
  awsCerts.forEach((cert, index) => {
    certifications.push({
      id: `aws-cert-${index}`,
      title: cert.title,
      issuer: "Amazon Web Services (AWS)",
      issueDate: new Date(2022, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      expirationDate: new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      description: `Validates technical expertise in ${cert.title.replace('AWS Certified ', '')}.`,
      imageUrl: `https://images.credly.com/size/340x340/images/${cert.image}`,
      credlyUrl: `https://www.credly.com/badges/example-${index}`
    });
  });
  
  // Add Coursera Courses
  courseraCourses.forEach((course, index) => {
    certifications.push({
      id: `coursera-${index}`,
      title: course.title,
      issuer: course.issuer,
      issueDate: new Date(2022, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      description: `Comprehensive course covering ${course.title.toLowerCase()}.`,
      imageUrl: `https://example.com/${course.title.replace(/\s+/g, '-').toLowerCase()}.png`,
      courseraUrl: `https://www.coursera.org/account/accomplishments/example-${index}`
    });
  });
  
  // Add Other Certifications
  otherCerts.forEach((cert, index) => {
    certifications.push({
      id: `other-cert-${index}`,
      title: cert.title,
      issuer: cert.issuer,
      issueDate: new Date(2022, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      description: `Professional certification for ${cert.title}.`,
      imageUrl: `https://example.com/${cert.title.replace(/\s+/g, '-').toLowerCase()}.png`
    });
  });
  
  // Generate Coursera programming courses
  programmingCourses.forEach((courseTemplate, templateIndex) => {
    technologies.forEach((tech, techIndex) => {
      // Only add some combinations to avoid too many
      if ((templateIndex + techIndex) % 4 === 0) {
        certifications.push({
          id: `tech-course-${templateIndex}-${techIndex}`,
          title: `${courseTemplate.prefix}${tech}`,
          issuer: courseTemplate.issuer,
          issueDate: new Date(2021, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
          description: `Learn everything about ${tech} from basics to advanced topics.`,
          imageUrl: `https://example.com/${tech.replace(/\s+/g, '-').toLowerCase()}.png`,
          courseraUrl: (courseTemplate.issuer === 'Coursera') ? 
            `https://www.coursera.org/account/accomplishments/verify/SAMPLE${templateIndex}${techIndex}` : null
        });
      }
    });
  });
  
  // Generate Cloud Provider Certifications
  cloudCertTemplates.forEach((certTemplate, templateIndex) => {
    cloudProviders.forEach((provider, providerIndex) => {
      // Only add some combinations to avoid too many
      if ((templateIndex + providerIndex) % 3 === 0) {
        certifications.push({
          id: `cloud-cert-${templateIndex}-${providerIndex}`,
          title: `${certTemplate.prefix}${provider}${certTemplate.suffix}`,
          issuer: provider,
          issueDate: new Date(2021, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
          expirationDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
          description: `Official certification for ${provider} ${certTemplate.suffix.toLowerCase()} skills.`,
          imageUrl: `https://example.com/${provider.replace(/\s+/g, '-').toLowerCase()}-cert.png`,
          credlyUrl: provider === 'AWS' ? `https://www.credly.com/badges/example-cloud-${templateIndex}-${providerIndex}` : null
        });
      }
    });
  });
  
  // Generate additional random certifications to reach 179
  const neededExtra = 179 - certifications.length;
  for (let i = 0; i < neededExtra; i++) {
    const useCredly = Math.random() > 0.6;
    const useCoursera = !useCredly && Math.random() > 0.5;
    
    certifications.push({
      id: `extra-cert-${i}`,
      title: `Additional Certification ${i+1}`,
      issuer: `Training Provider ${Math.floor(i/10) + 1}`,
      issueDate: new Date(2020, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      description: `This is an additional certification to demonstrate pagination and filtering.`,
      imageUrl: `https://example.com/additional-cert-${i}.png`,
      credlyUrl: useCredly ? `https://www.credly.com/badges/extra-${i}` : null,
      courseraUrl: useCoursera ? `https://www.coursera.org/account/accomplishments/verify/EXTRA${i}` : null
    });
  }
  
  return certifications;
}

async function seed() {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('esnapup');
    const collection = db.collection('certifications');
    
    // Check if we already have certifications
    const existingCount = await collection.countDocuments();
    console.log(`Found ${existingCount} existing certifications`);
    
    if (existingCount < 170) {
      // Generate the certifications
      const certifications = generateCertifications();
      console.log(`Generated ${certifications.length} certifications`);
      
      // Clear existing certifications
      await collection.deleteMany({});
      console.log('Cleared existing certifications');
      
      // Insert new certifications
      const result = await collection.insertMany(certifications);
      console.log(`Inserted ${result.insertedCount} certifications`);
    } else {
      console.log('Already have enough certifications, skipping seed');
    }
    
    // Count certifications by type for verification
    const totalCount = await collection.countDocuments();
    const credlyCount = await collection.countDocuments({ credlyUrl: { $exists: true, $ne: null, $ne: "" } });
    const courseraCount = await collection.countDocuments({ courseraUrl: { $exists: true, $ne: null, $ne: "" } });
    
    console.log(`Total certifications: ${totalCount}`);
    console.log(`With Credly URL: ${credlyCount}`);
    console.log(`With Coursera URL: ${courseraCount}`);
    console.log(`Without either URL: ${totalCount - credlyCount - courseraCount}`);
    
  } catch (error) {
    console.error('Error seeding certifications:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

// Generate skills
function generateSkills() {
  const skills = [];
  
  // Technical skills
  const technicalSkills = [
    "JavaScript", "TypeScript", "Python", "Java", "C#", "Go", "Rust", "PHP", "Ruby", "Swift",
    "Kotlin", "C++", "Scala", "Perl", "Shell Scripting", "Bash", "PowerShell", "R", "MATLAB",
    "GraphQL", "REST API", "SOAP", "WebSockets", "OAuth", "JWT", "SQL", "NoSQL", "Database Design",
    "Data Modeling", "Big Data", "Data Analysis", "Machine Learning", "Deep Learning", "AI",
    "Natural Language Processing", "Computer Vision", "Reinforcement Learning", "Neural Networks", 
    "Statistical Analysis", "Data Mining", "ETL", "Data Warehousing", "Blockchain", "IoT",
    "Embedded Systems", "Low-Level Programming", "Microservices", "Serverless Architecture",
    "Cloud Computing", "Distributed Systems", "Parallel Computing", "High Performance Computing"
  ];
  
  // Tool skills
  const toolSkills = [
    "Git", "GitHub", "GitLab", "Bitbucket", "JIRA", "Confluence", "Asana", "Trello",
    "Jenkins", "Travis CI", "CircleCI", "GitHub Actions", "TeamCity", "Bamboo", "Azure DevOps",
    "Docker", "Kubernetes", "Helm", "Terraform", "Ansible", "Puppet", "Chef", "Vagrant",
    "AWS", "Azure", "Google Cloud Platform", "DigitalOcean", "Heroku", "Netlify", "Vercel",
    "Firebase", "Supabase", "MongoDB Atlas", "Elasticsearch", "Redis", "RabbitMQ", "Kafka",
    "Prometheus", "Grafana", "ELK Stack", "Datadog", "New Relic", "Splunk", "Sentry",
    "VS Code", "IntelliJ IDEA", "WebStorm", "PyCharm", "Eclipse", "Visual Studio", "Xcode",
    "Postman", "Insomnia", "Swagger", "pgAdmin", "MongoDB Compass", "DBeaver", "Redis Desktop Manager"
  ];
  
  // Soft skills
  const softSkills = [
    "Communication", "Teamwork", "Problem Solving", "Critical Thinking", "Creativity",
    "Leadership", "Time Management", "Emotional Intelligence", "Adaptability", "Flexibility",
    "Accountability", "Conflict Resolution", "Decision Making", "Negotiation", "Persuasion",
    "Presentation Skills", "Public Speaking", "Technical Writing", "Documentation", "Mentoring",
    "Coaching", "Customer Service", "Client Relationship", "Project Management", "Agile Methodologies",
    "Scrum", "Kanban", "Lean", "Six Sigma", "Strategic Planning", "Business Analysis",
    "Requirements Gathering", "User Story Mapping", "UX Research", "Design Thinking"
  ];
  
  // Language skills
  const languageSkills = [
    "English", "Spanish", "French", "German", "Mandarin Chinese", "Japanese", "Russian",
    "Arabic", "Hindi", "Portuguese", "Italian", "Dutch", "Korean", "Swedish", "Danish",
    "Norwegian", "Finnish", "Polish", "Czech", "Hungarian", "Romanian", "Turkish", "Hebrew"
  ];
  
  // Add technical skills
  technicalSkills.forEach((name, index) => {
    skills.push({
      id: `tech-${index}`,
      name,
      category: 'technical'
    });
  });
  
  // Add tool skills
  toolSkills.forEach((name, index) => {
    skills.push({
      id: `tool-${index}`,
      name,
      category: 'tool'
    });
  });
  
  // Add soft skills
  softSkills.forEach((name, index) => {
    skills.push({
      id: `soft-${index}`,
      name,
      category: 'soft'
    });
  });
  
  // Add language skills
  languageSkills.forEach((name, index) => {
    skills.push({
      id: `lang-${index}`,
      name,
      category: 'language'
    });
  });
  
  return skills;
}

async function seedSkills() {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB for skills');
    
    const db = client.db('esnapup');
    const collection = db.collection('skills');
    
    // Check if we already have skills
    const existingCount = await collection.countDocuments();
    console.log(`Found ${existingCount} existing skills`);
    
    if (existingCount < 150) {
      // Generate the skills
      const skills = generateSkills();
      console.log(`Generated ${skills.length} skills`);
      
      // Clear existing skills
      await collection.deleteMany({});
      console.log('Cleared existing skills');
      
      // Insert new skills
      const result = await collection.insertMany(skills);
      console.log(`Inserted ${result.insertedCount} skills`);
    } else {
      console.log('Already have enough skills, skipping seed');
    }
    
    // Count skills by category for verification
    const totalCount = await collection.countDocuments();
    const technicalCount = await collection.countDocuments({ category: 'technical' });
    const toolCount = await collection.countDocuments({ category: 'tool' });
    const softCount = await collection.countDocuments({ category: 'soft' });
    const languageCount = await collection.countDocuments({ category: 'language' });
    
    console.log(`Total skills: ${totalCount}`);
    console.log(`Technical skills: ${technicalCount}`);
    console.log(`Tool skills: ${toolCount}`);
    console.log(`Soft skills: ${softCount}`);
    console.log(`Language skills: ${languageCount}`);
    
  } catch (error) {
    console.error('Error seeding skills:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB for skills');
  }
}

// Seed both collections
async function seedAll() {
  await seed();
  await seedSkills();
  console.log('Seeding complete!');
}

seedAll().catch(console.error);