import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SEO from './SEO';

const NotFound: React.FC = () => {
  return (
    <>
      <SEO 
        title="Page Not Found | ESnapup"
        description="The page you are looking for does not exist."
        canonicalUrl="https://www.esnapup.com/404"
      />
      
      <Container maxWidth="md">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '70vh',
            textAlign: 'center',
            py: 8
          }}
        >
          <Typography variant="h1" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            404
          </Typography>
          
          <Typography variant="h4" component="h2" gutterBottom>
            Page Not Found
          </Typography>
          
          <Typography variant="body1" color="textSecondary" paragraph sx={{ maxWidth: 600, mb: 4 }}>
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </Typography>
          
          <Button 
            component={RouterLink} 
            to="/" 
            variant="contained" 
            color="primary" 
            size="large"
          >
            Back to Home
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default NotFound;