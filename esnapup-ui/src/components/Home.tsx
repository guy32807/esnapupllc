import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import SEO from './SEO';

const Home: React.FC = () => {
  // Schema for home page
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ESnapup",
    "url": "https://www.esnapup.com",
    "logo": "https://www.esnapup.com/images/logo.png",
    "description": "ESnapup provides innovative software solutions to help businesses transform their ideas into powerful digital solutions.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "",
      "addressLocality": "Chicago",
      "addressRegion": "IL",
      "postalCode": "60601",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-800-555-1234",
      "contactType": "customer service"
    }
  };

  return (
    <>
      <SEO 
        title="ESnapup - Professional Web Development & Digital Solutions"
        description="ESnapup provides cutting-edge software development services to transform your business ideas into powerful digital solutions."
        canonicalUrl="https://www.esnapup.com/"
        schema={homeSchema}
      />
      
      <Box component="section" sx={{ py: 8 }}>
        <Container>
          <Typography 
            variant="h1" 
            component="h1" 
            fontWeight="bold" 
            gutterBottom
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
              marginBottom: 3
            }}
          >
            Transform Your Business with Innovative Solutions
          </Typography>
          
          <Typography 
            variant="h2" 
            component="p" 
            gutterBottom
            sx={{
              maxWidth: '800px',
              margin: '0 auto 2rem',
              color: 'rgba(0, 0, 0, 0.7)',
              lineHeight: 1.6,
              fontWeight: 300
            }}
          >
            We help businesses leverage technology to achieve their goals with custom software development, cloud solutions, and digital transformation.
          </Typography>
          
          <Box sx={{ mt: 5, display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              component={Link}
              to="/services"
              sx={{ 
                px: 4, 
                py: 1.5, 
                backgroundColor: '#4fd1c5',
                '&:hover': {
                  backgroundColor: '#38b2ac'
                },
                fontWeight: 500,
                fontSize: '1rem'
              }}
            >
              Explore Services
            </Button>
            <Button
              variant="outlined"
              component={Link}
              to="/contact"
              sx={{ 
                px: 4, 
                py: 1.5,
                borderColor: '#4fd1c5',
                color: '#4fd1c5',
                '&:hover': {
                  borderColor: '#38b2ac',
                  backgroundColor: 'rgba(79, 209, 197, 0.1)'
                },
                fontWeight: 500,
                fontSize: '1rem'
              }}
            >
              Contact Us
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Home;