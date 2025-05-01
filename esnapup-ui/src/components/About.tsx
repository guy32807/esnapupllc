import React from 'react';
import { Box, Container, Typography, Grid as MuiGrid, Paper, Avatar, Card, CardContent, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SEO from './SEO';

// Create a type-safe Grid component
const Grid = MuiGrid as any;

const About: React.FC = () => {
  // Your schema for the about page
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About ESnapup",
    "description": "Learn about our mission, values, and team."
  };

  return (
    <>
      <SEO 
        title="About Us | ESnapup"
        description="Learn more about ESnapup, our mission, values, and team."
        keywords="about esnapup, software development company, tech team, company mission"
        canonicalUrl="https://www.esnapup.com/about"
        schema={aboutSchema}
      />
      
      <Box sx={{ py: 8 }}>
        <Container>
          <Typography variant="h2" component="h1" align="center" gutterBottom>
            About ESnapup
          </Typography>
          
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph>
              At ESnapup, our mission is to empower businesses with innovative digital solutions that drive growth and success. We combine technical expertise with creative thinking to deliver software that solves real-world problems.
            </Typography>
          </Box>
          
          <Grid container spacing={4} sx={{ my: 6 }}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography variant="h4" gutterBottom>
                  Our Values
                </Typography>
                <Box component="ul" sx={{ pl: 2 }}>
                  <Typography component="li" variant="body1" paragraph>
                    <strong>Excellence:</strong> We strive for the highest quality in everything we do
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    <strong>Innovation:</strong> We constantly explore new technologies and approaches
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    <strong>Integrity:</strong> We maintain ethical standards and transparency
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    <strong>Collaboration:</strong> We work as true partners with our clients
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography variant="h4" gutterBottom>
                  Our Approach
                </Typography>
                <Typography variant="body1" paragraph>
                  We believe in a collaborative approach to software development. By working closely with our clients throughout the entire process, we ensure that the final product not only meets but exceeds expectations.
                </Typography>
                <Typography variant="body1" paragraph>
                  Our agile methodology allows us to adapt quickly to changing requirements and deliver value incrementally, giving our clients visibility and control at every stage of development.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 8 }}>
            <Typography variant="h4" align="center" gutterBottom>
              Our History
            </Typography>
            <Typography variant="body1" paragraph>
              Founded in 2020, ESnapup began with a simple idea: to make high-quality software development accessible to businesses of all sizes. What started as a small team of passionate developers has grown into a full-service development agency serving clients across industries.
            </Typography>
            <Typography variant="body1" paragraph>
              Throughout our journey, we've remained committed to our core values while continuously adapting to the ever-changing technology landscape. Our experience has taught us that successful software is not just about code—it's about understanding people, processes, and business goals.
            </Typography>
          </Box>

          <Box sx={{ mt: 8, mb: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center' }}>
              Certifications & Credentials
            </Typography>
            <Typography variant="body1" paragraph sx={{ textAlign: 'center', mb: 4 }}>
              Our team maintains industry-recognized certifications that validate our expertise and commitment to quality.
            </Typography>
            
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 3,
              my: 4 
            }}>
              {/* Card section is intentionally empty now, ready for future certifications */}
            </Box>
            
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Button 
                variant="contained" 
                color="primary"
                endIcon={<ArrowForwardIcon />}
                href="https://www.credly.com/users/auguste-dubuisson"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Our Certifications on Credly
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default About;