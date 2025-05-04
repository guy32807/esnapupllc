import React, { useState } from 'react';
import { 
  Container, Typography, Box, Grid as MuiGrid, Card, 
  CardContent, CardMedia, List, ListItem, ListItemIcon, 
  ListItemText, Divider, Button, Tabs, Tab
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SEO from './SEO';

// Create a custom Grid component that accepts 'item' prop for TypeScript compatibility
const Grid = MuiGrid as any;

// Define specialization interface
interface Specialization {
  id: string;
  title: string;
  description: string;
  image: string;
  benefits: string[];
  technologies: string[];
}

// Define static specializations data with additional technologies
const specializations: Specialization[] = [
  {
    id: 'fullstack',
    title: 'Full Stack Development',
    description: 'End-to-end web and mobile application development with modern frameworks and best practices for scalable, maintainable code.',
    image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    benefits: [
      'Seamless integration between frontend and backend',
      'Consistent user experience across platforms',
      'Clean, maintainable, and well-documented code',
      'Performance optimization for fast load times',
      'Responsive design for all device sizes'
    ],
    technologies: [
      'Frontend: React, Angular, Vue.js, TypeScript',
      'Backend: Node.js, Express, Python, Django, Flask, Java Spring, C#, .NET Core',
      'Mobile: React Native, Flutter, Swift (iOS), Kotlin (Android)',
      'Database: MongoDB, PostgreSQL, SQL Server, Azure Cosmos DB', // Added Azure Cosmos DB
      'ORM: Mongoose, Sequelize, SQLAlchemy, Django ORM, Entity Framework, Hibernate'
    ]
  },
  {
    id: 'mobile',
    title: 'Mobile Development',
    description: 'Creation of native and cross-platform mobile applications for iOS and Android with a focus on performance, user experience and platform-specific design guidelines.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    benefits: [
      'Native performance and platform-specific features',
      'Intuitive user interfaces following platform guidelines',
      'Offline capabilities and data synchronization',
      'Integration with device features (camera, GPS, etc.)',
      'App store optimization and deployment'
    ],
    technologies: [
      'Native iOS: Swift, SwiftUI, UIKit',
      'Native Android: Kotlin, Jetpack Compose',
      'Cross-platform: React Native, Flutter',
      'State Management: Redux, MobX, Provider',
      'Backend Integration: RESTful APIs, GraphQL'
    ]
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    description: 'Creation of intuitive, responsive user interfaces with modern JavaScript frameworks and UI/UX best practices.',
    image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    benefits: [
      'Intuitive and engaging user interfaces',
      'Responsive designs that work on all devices',
      'Optimized performance and loading speeds',
      'Accessibility compliance (WCAG)',
      'Clean, maintainable component architecture'
    ],
    technologies: [
      'React, Redux, Context API',
      'Angular, RxJS, NgRx',
      'TypeScript, JavaScript (ES6+)',
      'HTML5, CSS3, Sass/SCSS',
      'Material UI, Bootstrap, Tailwind CSS'
    ]
  },
  {
    id: 'backend',
    title: 'Backend Development',
    description: 'Development of robust, scalable server-side applications and APIs that power your business logic and data processing needs.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    benefits: [
      'Secure and efficient API design',
      'Robust data validation and error handling',
      'Optimized database queries and performance',
      'Scalable architecture for growing applications',
      'Comprehensive testing and documentation'
    ],
    technologies: [
      'Node.js, Express, NestJS',
      'Python, Django, Flask, FastAPI',
      'Java, Spring Boot, Spring MVC, Spring Cloud',
      'C#, .NET Core, ASP.NET',
      'MongoDB, PostgreSQL, MySQL, SQL Server, Azure Cosmos DB', // Added Azure Cosmos DB
      'ORM: Sequelize, Mongoose, SQLAlchemy, Django ORM, Entity Framework, Hibernate/JPA'
    ]
  },
  {
    id: 'cloud',
    title: 'Cloud Architecture & DevOps',
    description: 'Design and implementation of scalable, secure, and cost-effective cloud infrastructure with automated CI/CD pipelines.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    benefits: [
      'Scalable infrastructure that grows with your business',
      'Automated deployment pipelines for faster releases',
      'Cost optimization and resource management',
      'Improved system reliability and uptime',
      'Security best practices implementation'
    ],
    technologies: [
      'AWS (EC2, S3, Lambda, CloudFormation)',
      'Azure (App Service, Functions, DevOps, Cosmos DB)', // Added Azure Cosmos DB
      'Google Cloud (GCE, GKE, Cloud Functions)',
      'Docker, Kubernetes, Terraform',
      'Jenkins, GitHub Actions, GitLab CI/CD'
    ]
  },
  {
    id: 'database',
    title: 'Database Design & Optimization',
    description: 'Design, implementation, and optimization of database systems for efficient data storage, retrieval, and management.',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    benefits: [
      'Efficient data models tailored to your needs',
      'Optimized query performance',
      'Data integrity and security',
      'Scalable database architecture',
      'Migration and upgrade paths'
    ],
    technologies: [
      'Relational: PostgreSQL, MySQL, SQL Server',
      'NoSQL: MongoDB, DynamoDB, Azure Cosmos DB, Cassandra', // Added Azure Cosmos DB
      'Cloud Databases: Azure Cosmos DB, Amazon Aurora, Google Cloud Spanner', // Added dedicated cloud DB section
      'Caching: Redis, Memcached',
      'ORM: Sequelize, Mongoose, SQLAlchemy, Django ORM, Entity Framework'
    ]
  }
];

const Services = () => {
  const [currentTab, setCurrentTab] = useState('fullstack');
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };
  
  // Find the current specialization based on the selected tab
  const currentSpecialization = specializations.find(spec => spec.id === currentTab);
  
  // If no specialization is found, show an error message
  if (!currentSpecialization) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" color="error" align="center">
          Specialization not found
        </Typography>
      </Container>
    );
  }

  return (
    <>
      <SEO 
        title="Our Services | ESnapup"
        description="Explore our specialized software development services including full stack, mobile, frontend, backend development, cloud architecture, and database design."
        keywords="full stack development, mobile app development, frontend development, backend services, cloud architecture, database design, software development services"
        canonicalUrl="https://www.esnapup.com/services"
      />
      
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Our Services
        </Typography>
        
        <Typography variant="h5" color="textSecondary" paragraph align="center" sx={{ mb: 6 }}>
          Delivering high-quality solutions tailored to your business needs
        </Typography>
        
        {/* Specialization Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs 
            value={currentTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            aria-label="specialization tabs"
          >
            {specializations.map((spec) => (
              <Tab 
                key={spec.id} 
                label={spec.title} 
                value={spec.id} 
                sx={{ fontWeight: 'medium' }}
              />
            ))}
          </Tabs>
        </Box>
        
        {/* Specialization Details */}
        <Grid container spacing={4}>
          {/* Left side - Image */}
          <Grid item xs={12} md={5}>
            <Card>
              <CardMedia
                component="img"
                height={300}
                image={currentSpecialization.image}
                alt={currentSpecialization.title}
                sx={{ objectFit: 'cover' }}
              />
            </Card>
          </Grid>
          
          {/* Right side - Content */}
          <Grid item xs={12} md={7}>
            <Typography variant="h4" component="h2" gutterBottom>
              {currentSpecialization.title}
            </Typography>
            
            <Typography variant="body1" paragraph>
              {currentSpecialization.description}
            </Typography>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Key Benefits
            </Typography>
            
            <List disablePadding>
              {currentSpecialization.benefits.map((benefit, index) => (
                <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={benefit} />
                </ListItem>
              ))}
            </List>
            
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Technologies Used
            </Typography>
            
            <List disablePadding>
              {currentSpecialization.technologies.map((tech, index) => (
                <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <CheckCircleOutlineIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText primary={tech} />
                </ListItem>
              ))}
            </List>
            
            <Box sx={{ mt: 4 }}>
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                href="/contact"
              >
                Request a Consultation
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Services;