import React from 'react';
import { Box, Typography, Button, Container, Grid as MuiGrid } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SEO from './SEO';
import { Link } from 'react-router-dom';

// Create a type-safe Grid component
const Grid = MuiGrid as any;

const About: React.FC = () => {
  return (
    <>
      <SEO
        title="About ESnapup - Our Expert Web Development Team"
        description="Learn about ESnapup's mission, our team of expert developers, and our approach to creating high-quality web and mobile applications that drive business success."
        keywords={[
          'about ESnapup', 
          'web development team', 
          'software engineers',
          'tech company values',
          'digital solutions team'
        ]}
        canonicalUrl="/about"
      />
      
      <Container>
        <Box sx={{ py: 8 }}>
          <Typography 
            variant="h1"
            sx={{ 
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              textAlign: 'center',
              mb: 4
            }}
          >
            About ESnapup
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography 
                  variant="h2" 
                  sx={{ 
                    fontSize: { xs: '1.75rem', md: '2.25rem' },
                    fontWeight: 600,
                    mb: 2
                  }}
                >
                  Our Mission
                </Typography>
                <Typography paragraph>
                  At ESnapup, we believe that technology should be accessible, intuitive, and transformative. Our mission is to create digital solutions that not only meet our clients' immediate needs but also position them for long-term success in an increasingly digital world.
                </Typography>
                <Typography paragraph>
                  Founded in 2023, our team brings together expertise in development, design, and business strategy to deliver results that exceed expectations.
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box>
                <Typography 
                  variant="h2" 
                  sx={{ 
                    fontSize: { xs: '1.75rem', md: '2.25rem' },
                    fontWeight: 600,
                    mb: 2
                  }}
                >
                  Our Approach
                </Typography>
                <Typography paragraph>
                  We take a collaborative, client-centered approach to every project. By deeply understanding your business goals, target audience, and competitive landscape, we create customized solutions that deliver measurable results.
                </Typography>
                <Typography paragraph>
                  Our development process is transparent, agile, and focused on continuous improvement. We don't just build websites and applications – we build partnerships.
                </Typography>
              </Box>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 8 }}>
            <Typography 
              variant="h2" 
              sx={{ 
                fontSize: { xs: '1.75rem', md: '2.25rem' },
                fontWeight: 600,
                mb: 4,
                textAlign: 'center'
              }}
            >
              Our Services
            </Typography>
            
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Box sx={{ p: 3, height: '100%', border: '1px solid #e0e0e0', borderRadius: 2 }}>
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      fontSize: { xs: '1.5rem', md: '1.75rem' },
                      fontWeight: 600,
                      mb: 2
                    }}
                  >
                    Web Development
                  </Typography>
                  <Typography paragraph>
                    From responsive websites to complex web applications, we build solutions that look great and perform even better across all devices.
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box sx={{ p: 3, height: '100%', border: '1px solid #e0e0e0', borderRadius: 2 }}>
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      fontSize: { xs: '1.5rem', md: '1.75rem' },
                      fontWeight: 600,
                      mb: 2
                    }}
                  >
                    Mobile Apps
                  </Typography>
                  <Typography paragraph>
                    We create intuitive, feature-rich mobile applications for iOS and Android that help businesses engage with their customers on the go.
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box sx={{ p: 3, height: '100%', border: '1px solid #e0e0e0', borderRadius: 2 }}>
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      fontSize: { xs: '1.5rem', md: '1.75rem' },
                      fontWeight: 600,
                      mb: 2
                    }}
                  >
                    Digital Strategy
                  </Typography>
                  <Typography paragraph>
                    We help businesses develop comprehensive digital strategies that align technology investments with business goals for maximum ROI.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Button 
                component={Link} 
                to="/services" 
                variant="contained" 
                color="primary" 
                endIcon={<ArrowForwardIcon />}
                sx={{ mt: 2 }}
              >
                View All Services
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default About;