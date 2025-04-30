import React from 'react';
import Services from '../components/Services';
import SEO from '../components/SEO';
import { getOrganizationSchema, getServiceSchema } from '../utils/structuredData';

const ServicesPage: React.FC = () => {
  // Services for structured data
  const servicesList = [
    {
      name: "Full Stack Development",
      description: "End-to-end web and mobile application development with modern frameworks and best practices for scalable, maintainable code."
    },
    {
      name: "Mobile App Development",
      description: "Creation of native and cross-platform mobile applications for iOS and Android with a focus on performance and user experience."
    },
    {
      name: "Frontend Development",
      description: "Creation of intuitive, responsive user interfaces with modern JavaScript frameworks and UI/UX best practices."
    },
    {
      name: "Backend Development",
      description: "Development of robust, scalable server-side applications and APIs that power your business logic and data processing needs."
    },
    {
      name: "Cloud Architecture & DevOps",
      description: "Design and implementation of scalable, secure, and cost-effective cloud infrastructure with automated CI/CD pipelines."
    },
    {
      name: "Database Design & Optimization",
      description: "Design, implementation, and optimization of database systems including Azure Cosmos DB for efficient data storage, retrieval, and management."
    }
  ];

  // Build structured data array
  const structuredData = [
    getOrganizationSchema(),
    ...servicesList.map(service => 
      getServiceSchema(
        service.name, 
        service.description, 
        `https://esnapup.com/services#${service.name.toLowerCase().replace(/\s+/g, '-')}`
      )
    )
  ];

  return (
    <>
      <SEO 
        title="Professional Web Development Services | ESnapup"
        description="We offer comprehensive web development services including full-stack, mobile apps, frontend, backend, cloud architecture, and database design with Azure Cosmos DB."
        keywords={[
          'web development services', 
          'full stack development', 
          'mobile app development',
          'frontend development',
          'backend development',
          'cloud architecture',
          'database design',
          'React development',
          'Node.js development',
          'Python development',
          'Azure Cosmos DB'
        ]}
        canonicalUrl="/services"
        structuredData={structuredData}
      />
      <Services />
    </>
  );
};

export default ServicesPage;