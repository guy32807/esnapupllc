// Create this new file to seed certifications

require('dotenv').config();
const { MongoClient } = require('mongodb');

// Sample certification data
const certifications = [
  {
    title: "AWS Certified Solutions Architect - Associate",
    issuer: "Amazon Web Services (AWS)",
    issueDate: "2023-04-15",
    expirationDate: "2026-04-15",
    description: "Validates technical expertise in designing and deploying scalable, highly available, and fault-tolerant systems on AWS.",
    imageUrl: "https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png",
    credlyUrl: "https://www.credly.com/badges/your-aws-sa-credential"
  },
  {
    title: "AWS Certified Developer - Associate",
    issuer: "Amazon Web Services (AWS)",
    issueDate: "2023-05-20",
    expirationDate: "2026-05-20",
    description: "Validates technical expertise in developing and maintaining applications on the AWS platform.",
    imageUrl: "https://images.credly.com/size/340x340/images/b9feab85-1a43-4f6c-99a5-631b88d5461b/image.png",
    credlyUrl: "https://www.credly.com/badges/your-aws-dev-credential"
  },
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services (AWS)",
    issueDate: "2022-11-10",
    expirationDate: "2025-11-10",
    description: "Validates cloud fluency and foundational AWS knowledge.",
    imageUrl: "https://images.credly.com/size/340x340/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png",
    credlyUrl: "https://www.credly.com/badges/your-aws-cp-credential"
  },
  {
    title: "Google Cloud Fundamentals: Core Infrastructure",
    issuer: "Google Cloud",
    issueDate: "2023-02-15",
    description: "Demonstrates knowledge of Google Cloud Platform's core infrastructure services.",
    imageUrl: "https://www.gstatic.com/devrel-devsite/prod/v0e5f452d5c150613cd0303a9123889b852a63968b521ecf9aad81a7188de7fd4/cloud/images/cloud-logo.svg",
    courseraUrl: "https://www.coursera.org/your-gcp-course"
  },
  {
    title: "Getting Started with Google Kubernetes Engine",
    issuer: "Google Cloud",
    issueDate: "2023-03-10",
    description: "Demonstrates knowledge of deploying applications to Google Kubernetes Engine.",
    imageUrl: "https://www.gstatic.com/devrel-devsite/prod/v0e5f452d5c150613cd0303a9123889b852a63968b521ecf9aad81a7188de7fd4/cloud/images/cloud-logo.svg",
    courseraUrl: "https://www.coursera.org/your-gke-course"
  },
  {
    title: "Introduction to TensorFlow",
    issuer: "DeepLearning.AI",
    issueDate: "2022-09-05", 
    description: "Fundamentals of using TensorFlow for machine learning and neural networks.",
    imageUrl: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/83/e258e0532611e780a5a683afe6a3da/Logo_TF_Specialization.png",
    courseraUrl: "https://www.coursera.org/your-tensorflow-course"
  },
  {
    title: "Azure Fundamentals (AZ-900)",
    issuer: "Microsoft",
    issueDate: "2023-01-20",
    description: "Demonstrates foundational knowledge of cloud concepts and Azure services.",
    imageUrl: "https://learn.microsoft.com/en-us/media/learn/certification/badges/microsoft-certified-fundamentals-badge.svg",
    // No URLs to make this go into the "other" category
  }
];

async function seedCertifications() {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('esnapup');
    const collection = db.collection('certifications');
    
    // Add IDs to certifications
    const certificationsWithIds = certifications.map((cert, index) => ({
      ...cert,
      id: `cert-${Date.now()}-${index}`
    }));
    
    // Insert certifications into the database
    const result = await collection.insertMany(certificationsWithIds);
    console.log(`Added ${result.insertedCount} certifications to the database`);
    
    // Verify the count
    const count = await collection.countDocuments();
    console.log(`There are now ${count} certifications in the database`);
    
  } catch (error) {
    console.error('Error seeding certifications:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

seedCertifications().catch(console.error);