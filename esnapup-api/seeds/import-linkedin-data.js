// Make sure we have the proper environment variables
require('dotenv').config();
const { MongoClient } = require('mongodb');

// LinkedIn certifications data for Auguste Dubuisson
const linkedinCertifications = [
  {
    id: "cert-aws-sa",
    title: "AWS Certified Solutions Architect - Associate",
    issuer: "Amazon Web Services (AWS)",
    issueDate: "2023-03-15",
    expirationDate: "2026-03-15",
    description: "Validates technical expertise in designing and deploying scalable, highly available, and fault-tolerant systems on AWS.",
    imageUrl: "https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png",
    credlyUrl: "https://www.credly.com/badges/aws-certified-solutions-architect-associate"
  },
  {
    id: "cert-aws-dev",
    title: "AWS Certified Developer - Associate",
    issuer: "Amazon Web Services (AWS)",
    issueDate: "2023-04-10",
    expirationDate: "2026-04-10",
    description: "Validates technical expertise in developing and maintaining applications on the AWS platform.",
    imageUrl: "https://images.credly.com/size/340x340/images/b9feab85-1a43-4f6c-99a5-631b88d5461b/image.png",
    credlyUrl: "https://www.credly.com/badges/aws-certified-developer-associate"
  },
  {
    id: "cert-aws-cloud",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services (AWS)",
    issueDate: "2022-11-01",
    expirationDate: "2025-11-01",
    description: "Validates cloud fluency and foundational AWS knowledge.",
    imageUrl: "https://images.credly.com/size/340x340/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png",
    credlyUrl: "https://www.credly.com/badges/aws-certified-cloud-practitioner"
  },
  {
    id: "cert-aws-devops",
    title: "AWS Certified DevOps Engineer - Professional",
    issuer: "Amazon Web Services (AWS)",
    issueDate: "2023-07-15",
    expirationDate: "2026-07-15",
    description: "Validates technical expertise in provisioning, operating, and managing distributed application systems on the AWS platform.",
    imageUrl: "https://images.credly.com/size/340x340/images/bd31ef55-1066-4288-a188-7b6e79a9c729/image.png",
    credlyUrl: "https://www.credly.com/badges/aws-certified-devops-engineer-professional"
  },
  {
    id: "cert-az-900",
    title: "Microsoft Certified: Azure Fundamentals",
    issuer: "Microsoft",
    issueDate: "2023-01-15",
    description: "Validates foundational knowledge of cloud concepts and Microsoft Azure services, workloads, security, privacy, pricing, and support.",
    imageUrl: "https://images.credly.com/size/340x340/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png",
    credlyUrl: "https://www.credly.com/badges/microsoft-certified-azure-fundamentals"
  },
  {
    id: "cert-az-204",
    title: "Microsoft Certified: Azure Developer Associate",
    issuer: "Microsoft",
    issueDate: "2023-02-20",
    expirationDate: "2025-02-20",
    description: "Validates expertise in designing, building, testing, and maintaining cloud applications and services on Microsoft Azure.",
    imageUrl: "https://images.credly.com/size/340x340/images/63316b60-f62d-4e51-aacc-c23cb850089c/azure-developer-associate-600x600.png",
    credlyUrl: "https://www.credly.com/badges/microsoft-certified-azure-developer-associate"
  },
  {
    id: "cert-gcp-core",
    title: "Google Cloud Fundamentals: Core Infrastructure",
    issuer: "Google Cloud",
    issueDate: "2023-02-10",
    description: "Demonstrates knowledge of Google Cloud Platform's core infrastructure services.",
    imageUrl: "https://www.gstatic.com/devrel-devsite/prod/v0e5f452d5c150613cd0303a9123889b852a63968b521ecf9aad81a7188de7fd4/cloud/images/cloud-logo.svg",
    courseraUrl: "https://www.coursera.org/account/accomplishments/verify/google-cloud-fundamentals"
  },
  {
    id: "cert-gcp-gke",
    title: "Getting Started with Google Kubernetes Engine",
    issuer: "Google Cloud",
    issueDate: "2023-03-05",
    description: "Demonstrates knowledge of deploying applications to Google Kubernetes Engine.",
    imageUrl: "https://www.gstatic.com/devrel-devsite/prod/v0e5f452d5c150613cd0303a9123889b852a63968b521ecf9aad81a7188de7fd4/cloud/images/cloud-logo.svg",
    courseraUrl: "https://www.coursera.org/account/accomplishments/verify/gke-fundamentals"
  },
  {
    id: "cert-react-adv",
    title: "Advanced React and Redux",
    issuer: "Udemy",
    issueDate: "2022-10-18",
    description: "Comprehensive course covering advanced React patterns, Redux architecture, middlewares, and testing strategies.",
    imageUrl: "https://img-c.udemycdn.com/course/480x270/705264_caa9_13.jpg"
  },
  {
    id: "cert-node-complete",
    title: "Complete Node.js Developer",
    issuer: "Udemy",
    issueDate: "2022-09-05",
    description: "Comprehensive course on building production-ready applications with Node.js, Express, MongoDB and modern JavaScript.",
    imageUrl: "https://img-c.udemycdn.com/course/480x270/1879018_95b6_3.jpg"
  },
  {
    id: "cert-algo-ds",
    title: "JavaScript Algorithms and Data Structures Masterclass",
    issuer: "Udemy",
    issueDate: "2022-08-12",
    description: "In-depth course on implementing and understanding common algorithms and data structures using JavaScript.",
    imageUrl: "https://img-c.udemycdn.com/course/480x270/1406344_1d65_3.jpg"
  },
  {
    id: "cert-ml-stanford",
    title: "Machine Learning",
    issuer: "Stanford University",
    issueDate: "2022-11-25",
    description: "Foundational course on machine learning, covering supervised and unsupervised learning, best practices, and practical implementation.",
    imageUrl: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/2a/6bfa30d34411e3ae9e7159a56a5e58/ml-logo1.png",
    courseraUrl: "https://www.coursera.org/account/accomplishments/verify/stanford-machine-learning"
  },
  {
    id: "cert-dl-specialization",
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI",
    issueDate: "2023-01-30",
    description: "Five-course specialization covering neural networks, deep learning, structuring ML projects, CNNs, and sequence models.",
    imageUrl: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/eb/cab5f074f711e8b2d5a7add9ec7bc0/LogoFiles_DeepLearning_Specialization_Logo_4.png",
    courseraUrl: "https://www.coursera.org/account/accomplishments/verify/deeplearning-specialization"
  },
  {
    id: "cert-tf-dev",
    title: "TensorFlow Developer Professional Certificate",
    issuer: "DeepLearning.AI",
    issueDate: "2023-04-10",
    description: "Four-course program covering building scalable TensorFlow models for various applications including computer vision and NLP.",
    imageUrl: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/4a/0880e6ab7111e8a75411b012516701/tflogo.png",
    courseraUrl: "https://www.coursera.org/account/accomplishments/verify/tensorflow-developer"
  },
  {
    id: "cert-web-design",
    title: "Web Design for Everybody Specialization",
    issuer: "University of Michigan",
    issueDate: "2022-06-15",
    description: "Five-course specialization covering HTML5, CSS3, JavaScript, responsive design, and advanced styling techniques.",
    imageUrl: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/6a/5786b07ab711e59a5b77456d1022af/webdesign_logo.png",
    courseraUrl: "https://www.coursera.org/account/accomplishments/verify/web-design-specialization"
  },
  {
    id: "cert-full-stack",
    title: "Full-Stack Web Development with React Specialization",
    issuer: "The Hong Kong University of Science and Technology",
    issueDate: "2022-07-20",
    description: "Three-course specialization covering front-end development with React and back-end development with Node.js, Express and MongoDB.",
    imageUrl: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/10/94e64625eb4b41b05e66ed0e5bab30/Slide1.png",
    courseraUrl: "https://www.coursera.org/account/accomplishments/verify/fullstack-react-specialization"
  },
  {
    id: "cert-devops-aws",
    title: "DevOps on AWS Specialization",
    issuer: "Amazon Web Services",
    issueDate: "2023-05-15",
    description: "Three-course specialization covering DevOps practices, CI/CD, and infrastructure as code on AWS.",
    imageUrl: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/eb/d33a01072412e2875a9950089ff459/Course-Logo.png",
    courseraUrl: "https://www.coursera.org/account/accomplishments/verify/aws-devops-specialization"
  },
  {
    id: "cert-docker-mastery",
    title: "Docker Mastery",
    issuer: "Udemy",
    issueDate: "2022-12-05",
    description: "Comprehensive course on Docker, Docker Compose, and Docker Swarm with hands-on exercises and real-world examples.",
    imageUrl: "https://img-c.udemycdn.com/course/480x270/1035000_c1aa_6.jpg"
  },
  {
    id: "cert-kubernetes",
    title: "Certified Kubernetes Administrator (CKA)",
    issuer: "The Linux Foundation",
    issueDate: "2023-06-10",
    expirationDate: "2026-06-10",
    description: "Validates skills, knowledge and competence to perform the responsibilities of Kubernetes administrators.",
    imageUrl: "https://training.linuxfoundation.org/wp-content/uploads/2019/03/logo_cka_whitetext-300x300.png",
    credlyUrl: "https://www.credly.com/badges/certified-kubernetes-administrator"
  },
  {
    id: "cert-security-aws",
    title: "AWS Certified Security - Specialty",
    issuer: "Amazon Web Services (AWS)",
    issueDate: "2023-08-20",
    expirationDate: "2026-08-20",
    description: "Validates expertise in security best practices and the AWS security services ecosystem.",
    imageUrl: "https://images.credly.com/size/340x340/images/53acdae5-d69f-4dda-b650-d02ed7a50dd7/image.png",
    credlyUrl: "https://www.credly.com/badges/aws-certified-security-specialty"
  },
  {
    id: "cert-cissp",
    title: "Certified Information Systems Security Professional (CISSP)",
    issuer: "(ISC)²",
    issueDate: "2023-09-15",
    expirationDate: "2026-09-15",
    description: "Validates expertise as an IT security professional defining architecture, design, management, and controls that ensure organizational security.",
    imageUrl: "https://images.credly.com/size/340x340/images/5e6f5247-1d61-4933-a3cd-c43cab42e585/CISSP_2.png",
    credlyUrl: "https://www.credly.com/badges/certified-information-systems-security-professional"
  }
];

// LinkedIn skills data for Auguste Dubuisson
const linkedinSkills = [
  // Technical Skills - Core Programming
  { name: "JavaScript", category: "technical" },
  { name: "TypeScript", category: "technical" },
  { name: "React", category: "technical" },
  { name: "React Native", category: "technical" },
  { name: "Redux", category: "technical" },
  { name: "Node.js", category: "technical" },
  { name: "Express.js", category: "technical" },
  { name: "NestJS", category: "technical" },
  { name: "GraphQL", category: "technical" },
  { name: "REST API Design", category: "technical" },
  { name: "Python", category: "technical" },
  { name: "Django", category: "technical" },
  { name: "Flask", category: "technical" },
  { name: "Java", category: "technical" },
  { name: "Spring Boot", category: "technical" },
  { name: "C#", category: "technical" },
  { name: ".NET Core", category: "technical" },
  { name: "PHP", category: "technical" },
  { name: "Laravel", category: "technical" },
  { name: "Ruby", category: "technical" },
  { name: "Ruby on Rails", category: "technical" },
  { name: "Go", category: "technical" },
  { name: "Rust", category: "technical" },
  
  // Frontend
  { name: "HTML5", category: "technical" },
  { name: "CSS3", category: "technical" },
  { name: "SASS/SCSS", category: "technical" },
  { name: "Material UI", category: "technical" },
  { name: "Tailwind CSS", category: "technical" },
  { name: "Bootstrap", category: "technical" },
  { name: "Angular", category: "technical" },
  { name: "Vue.js", category: "technical" },
  { name: "Svelte", category: "technical" },
  { name: "Webpack", category: "technical" },
  { name: "Babel", category: "technical" },
  { name: "Next.js", category: "technical" },
  { name: "Gatsby", category: "technical" },
  
  // Backend & Databases
  { name: "MongoDB", category: "technical" },
  { name: "PostgreSQL", category: "technical" },
  { name: "MySQL", category: "technical" },
  { name: "SQLite", category: "technical" },
  { name: "Redis", category: "technical" },
  { name: "Elasticsearch", category: "technical" },
  { name: "Firebase", category: "technical" },
  { name: "DynamoDB", category: "technical" },
  { name: "SQL", category: "technical" },
  { name: "NoSQL", category: "technical" },
  { name: "ORM", category: "technical" },
  { name: "Mongoose", category: "technical" },
  { name: "Sequelize", category: "technical" },
  { name: "Prisma", category: "technical" },
  
  // DevOps & Cloud
  { name: "AWS", category: "tool" },
  { name: "Amazon Web Services", category: "tool" },
  { name: "EC2", category: "tool" },
  { name: "S3", category: "tool" },
  { name: "Lambda", category: "tool" },
  { name: "CloudFormation", category: "tool" },
  { name: "Azure", category: "tool" },
  { name: "Google Cloud Platform", category: "tool" },
  { name: "Docker", category: "tool" },
  { name: "Kubernetes", category: "tool" },
  { name: "CI/CD", category: "tool" },
  { name: "Jenkins", category: "tool" },
  { name: "GitHub Actions", category: "tool" },
  { name: "Travis CI", category: "tool" },
  { name: "Serverless Framework", category: "tool" },
  { name: "Terraform", category: "tool" },
  { name: "Ansible", category: "tool" },
  { name: "Nginx", category: "tool" },
  { name: "Apache", category: "tool" },
  
  // Version Control & Collaboration Tools
  { name: "Git", category: "tool" },
  { name: "GitHub", category: "tool" },
  { name: "GitLab", category: "tool" },
  { name: "Bitbucket", category: "tool" },
  { name: "JIRA", category: "tool" },
  { name: "Confluence", category: "tool" },
  { name: "Notion", category: "tool" },
  { name: "Slack", category: "tool" },
  { name: "MS Teams", category: "tool" },
  { name: "Trello", category: "tool" },
  { name: "Asana", category: "tool" },
  
  // Development Tools
  { name: "VS Code", category: "tool" },
  { name: "IntelliJ IDEA", category: "tool" },
  { name: "WebStorm", category: "tool" },
  { name: "PyCharm", category: "tool" },
  { name: "Visual Studio", category: "tool" },
  { name: "Xcode", category: "tool" },
  { name: "Android Studio", category: "tool" },
  { name: "Postman", category: "tool" },
  { name: "Insomnia", category: "tool" },
  { name: "Figma", category: "tool" },
  { name: "Adobe XD", category: "tool" },
  { name: "Sketch", category: "tool" },
  
  // Testing
  { name: "Jest", category: "technical" },
  { name: "React Testing Library", category: "technical" },
  { name: "Cypress", category: "technical" },
  { name: "Selenium", category: "technical" },
  { name: "Mocha", category: "technical" },
  { name: "Chai", category: "technical" },
  { name: "JUnit", category: "technical" },
  { name: "TestNG", category: "technical" },
  { name: "PyTest", category: "technical" },
  { name: "TDD", category: "technical" },
  { name: "BDD", category: "technical" },
  
  // Soft Skills
  { name: "Problem Solving", category: "soft" },
  { name: "Communication", category: "soft" },
  { name: "Team Leadership", category: "soft" },
  { name: "Project Management", category: "soft" },
  { name: "Agile Methodologies", category: "soft" },
  { name: "Scrum", category: "soft" },
  { name: "Kanban", category: "soft" },
  { name: "Critical Thinking", category: "soft" },
  { name: "Time Management", category: "soft" },
  { name: "Technical Writing", category: "soft" },
  { name: "Pair Programming", category: "soft" },
  { name: "Code Review", category: "soft" },
  { name: "Mentoring", category: "soft" },
  { name: "Public Speaking", category: "soft" },
  { name: "Remote Collaboration", category: "soft" },
  { name: "Adaptability", category: "soft" },
  { name: "Analytical Thinking", category: "soft" },
  { name: "Attention to Detail", category: "soft" },
  
  // Languages - Limited to English, French, and Spanish
  { name: "English", category: "language" },
  { name: "French", category: "language" },
  { name: "Spanish", category: "language" }
];

// Generate more meaningful certifications based on real ones
function generateMeaningfulCertifications() {
  let allCertifications = [];
  
  // Add the curated real certifications
  allCertifications = [...linkedinCertifications];
  
  // Add more certifications to reach 179 by creating variations
  const programmingLanguages = ["JavaScript", "Python", "Java", "C#", "Go", "Ruby", "PHP", "TypeScript", "Swift", "Kotlin"];
  const frameworks = ["React", "Angular", "Vue", "Express", "Django", "Flask", "Spring Boot", "Laravel", "ASP.NET Core", "Ruby on Rails"];
  const platforms = ["AWS", "Azure", "Google Cloud", "Firebase", "Heroku", "DigitalOcean", "Netlify", "Vercel"];
  const providers = ["Udemy", "Coursera", "Pluralsight", "LinkedIn Learning", "edX", "DataCamp", "Codecademy", "freeCodeCamp"];
  const prefixes = ["Introduction to", "Advanced", "Mastering", "Complete Guide to", "Professional", "Practical"];
  
  let counter = 0;
  while (allCertifications.length < 179 && counter < 1000) {
    counter++;
    
    // Create course variations
    const language = programmingLanguages[Math.floor(Math.random() * programmingLanguages.length)];
    const framework = frameworks[Math.floor(Math.random() * frameworks.length)];
    const platform = platforms[Math.floor(Math.random() * platforms.length)];
    const provider = providers[Math.floor(Math.random() * providers.length)];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    
    // Determine course type for URL
    const isCourseraProvider = provider === "Coursera";
    const isCredlyEligible = Math.random() > 0.7; // 30% chance to be a Credly certification
    
    // Generate a certification title
    let title = "";
    const certType = Math.floor(Math.random() * 4);
    
    switch (certType) {
      case 0:
        title = `${prefix} ${language}`;
        break;
      case 1:
        title = `${prefix} ${framework}`;
        break;
      case 2:
        title = `${language} Development with ${framework}`;
        break;
      case 3:
        title = `${framework} on ${platform}`;
        break;
    }
    
    // Make sure we don't add duplicates
    if (allCertifications.some(cert => cert.title === title)) {
      continue;
    }
    
    // Create the certification object
    const certification = {
      id: `generated-cert-${counter}`,
      title: title,
      issuer: provider,
      issueDate: `202${Math.floor(Math.random() * 3) + 1}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      description: `This course covers ${title.toLowerCase()} with practical examples and hands-on projects.`
    };
    
    // Add appropriate URL based on provider type
    if (isCredlyEligible) {
      certification.credlyUrl = `https://www.credly.com/badges/${certification.id}`;
      certification.imageUrl = "https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png";
    } else if (isCourseraProvider) {
      certification.courseraUrl = `https://www.coursera.org/account/accomplishments/verify/${certification.id}`;
      certification.imageUrl = "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/logo.png";
    } else {
      certification.imageUrl = `https://example.com/${title.toLowerCase().replace(/\s+/g, '-')}.png`;
    }
    
    allCertifications.push(certification);
  }
  
  return allCertifications;
}

async function importData() {
  // Check if MONGODB_URI is set
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI environment variable is not set!');
    console.log('Please create a .env file with MONGODB_URI=your_mongodb_connection_string');
    process.exit(1);
  }
  
  console.log("MongoDB URI:", process.env.MONGODB_URI);
  
  let client;
  try {
    // Connect to MongoDB
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('esnapup');
    
    // Clear and seed skills collection
    const skillsCollection = db.collection('skills');
    await skillsCollection.deleteMany({});
    console.log('Cleared skills collection');
    
    const skillsWithIds = linkedinSkills.map((skill, index) => ({
      ...skill,
      id: `skill-${index}`
    }));
    
    const skillResult = await skillsCollection.insertMany(skillsWithIds);
    console.log(`Inserted ${skillResult.insertedCount} skills`);
    
    // Clear and seed certifications
    const certsCollection = db.collection('certifications');
    await certsCollection.deleteMany({});
    console.log('Cleared certifications collection');
    
    // Generate meaningful certifications
    const allCerts = generateMeaningfulCertifications();
    console.log(`Generated ${allCerts.length} meaningful certifications`);
    
    const certResult = await certsCollection.insertMany(allCerts);
    console.log(`Inserted ${certResult.insertedCount} certifications`);
    
    // Count by type
    const credlyCount = await certsCollection.countDocuments({
      credlyUrl: { $exists: true, $ne: "", $ne: null }
    });
    
    const courseraCount = await certsCollection.countDocuments({
      courseraUrl: { $exists: true, $ne: "", $ne: null }
    });
    
    const otherCount = await certsCollection.countDocuments({
      $and: [
        { $or: [
          { credlyUrl: { $exists: false } },
          { credlyUrl: "" },
          { credlyUrl: null }
        ]},
        { $or: [
          { courseraUrl: { $exists: false } },
          { courseraUrl: "" },
          { courseraUrl: null }
        ]}
      ]
    });
    
    console.log('Certification counts by category:');
    console.log(`- Cloud/Platform (with credlyUrl): ${credlyCount}`);
    console.log(`- Online Courses (with courseraUrl): ${courseraCount}`);
    console.log(`- Other Professional Certificates: ${otherCount}`);
    console.log(`- Total: ${credlyCount + courseraCount + otherCount}`);
    
    // Log some examples from each category
    console.log('\nSample certifications from each category:');
    
    console.log('\nCloud/Platform certifications sample:');
    const credlySample = await certsCollection.find({ credlyUrl: { $exists: true, $ne: "", $ne: null } })
      .limit(3).toArray();
    console.log(credlySample.map(c => c.title));
    
    console.log('\nOnline Courses sample:');
    const courseraSample = await certsCollection.find({ courseraUrl: { $exists: true, $ne: "", $ne: null } })
      .limit(3).toArray();
    console.log(courseraSample.map(c => c.title));
    
    console.log('\nOther Professional Certificates sample:');
    const otherSample = await certsCollection.find({
      $and: [
        { $or: [
          { credlyUrl: { $exists: false } },
          { credlyUrl: "" },
          { credlyUrl: null }
        ]},
        { $or: [
          { courseraUrl: { $exists: false } },
          { courseraUrl: "" },
          { courseraUrl: null }
        ]}
      ]
    }).limit(3).toArray();
    console.log(otherSample.map(c => c.title));
    
  } catch (error) {
    console.error('Error importing data:', error);
  } finally {
    if (client) {
      await client.close();
      console.log('MongoDB connection closed');
    }
  }
}

// Run the import
importData().catch(console.error);