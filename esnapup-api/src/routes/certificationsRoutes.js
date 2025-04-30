const express = require('express');
const router = express.Router();

// GET /api/v1/certifications
router.get('/', (req, res) => {
  const certifications = [
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
      id: 'coursera-1',
      title: 'Google Cloud Fundamentals: Core Infrastructure',
      issuer: 'Google Cloud (Coursera)',
      issueDate: '2022-06-15',
      description: 'Covers essential Google Cloud infrastructure concepts, services, and features.',
      imageUrl: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/images/google.cloud.cert.png',
      courseraUrl: 'https://www.coursera.org/account/accomplishments/certificate/XYZ123'
    }
  ];
  
  res.status(200).json(certifications);
});

module.exports = router;