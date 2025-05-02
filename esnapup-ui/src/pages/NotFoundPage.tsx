import React from 'react';
import SEO from '../components/SEO';
import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Page Not Found | ESnapup"
        description="The page you're looking for doesn't exist. Return to our homepage to explore our web development and digital solution services."
        keywords={[
          '404 page',
          'page not found',
          'ESnapup',
          'return to homepage'
        ]}
        canonicalUrl="https://esnapup.com/404"
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
          <Typography variant="h1" component="h1" gutterBottom>
            404
          </Typography>
          <Typography variant="h4" component="h2" gutterBottom>
            Page Not Found
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            The page you are looking for doesn't exist or has been moved.
          </Typography>
          <Button variant="contained" component={Link} to="/" color="primary" size="large">
            Go to Home Page
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default NotFoundPage;