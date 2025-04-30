import React from 'react';
import { Box, Container, Typography, Grid as MuiGrid, Paper, Avatar } from '@mui/material';
import SEO from './SEO';

// Create a type-safe Grid component
const Grid = MuiGrid as any;

const AboutUs: React.FC = () => {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About ESnapup",
    "description": "Learn about our mission, values, and expert team.",
    "mainEntity": {
      "@type": "Organization",
      "name": "ESnapup",
      "description": "Professional web development and digital solutions company",
      "foundingDate": "2020-01-01",
      "founders": [
        {
          "@type": "Person",
          "name": "John Doe"
        }
      ]
    }
  };

  return (
    <>
      <SEO 
        title="About Us"
        description="Learn about ESnapup's journey, our mission to deliver innovative software solutions, and the passionate team behind our success."
        keywords="ESnapup about us, software company mission, tech innovation team, IT consultancy background"
        canonicalUrl="https://www.esnapup.com/about"
        schema={aboutSchema}
      />
      
      <Box sx={{ py: 8 }}>
        <Container>
          <Typography variant="h2" component="h1" gutterBottom>
            About Us
          </Typography>
          
          <Box sx={{ my: 4 }}>
            <Typography variant="body1" paragraph>
              ESnapup was founded with a clear vision: to make high-quality web development accessible to businesses of all sizes. Our team combines technical expertise with creative thinking to deliver software that exceeds expectations.
            </Typography>
          </Box>
          
          <Paper 
            elevation={0}
            sx={{ 
              p: { xs: 3, md: 5 }, 
              my: 5, 
              borderRadius: 2,
              backgroundColor: '#f8f9fa'
            }}
          >
            <Typography variant="h4" gutterBottom>
              Our Story
            </Typography>
            
            <Typography variant="body1" paragraph>
              What began as a small team of passionate developers in 2020 has grown into a comprehensive development agency serving clients across industries and continents. Throughout our journey, we've maintained our commitment to quality, innovation, and client satisfaction.
            </Typography>
            
            <Typography variant="body1" paragraph>
              Innovation, integrity, and client satisfaction are at the core of everything we do. We believe in building lasting relationships with our clients, understanding their unique challenges, and delivering solutions that exceed expectations. Our team is dedicated to staying at the forefront of technology trends and best practices to ensure we always provide the highest quality services.
            </Typography>
          </Paper>
          
          <Grid container spacing={4} sx={{ my: 6 }}>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h4" gutterBottom>
                  Our Mission
                </Typography>
                <Typography variant="body1" paragraph>
                  Our mission is to empower businesses with innovative, scalable, and secure software solutions that drive growth and create value. We're committed to delivering excellence in every project we undertake.
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h4" gutterBottom>
                  Our Vision
                </Typography>
                <Typography variant="body1" paragraph>
                  We envision a future where technology helps businesses of all sizes achieve their full potential. Our goal is to be at the forefront of this transformation, providing the expertise and solutions that make success possible.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default AboutUs;