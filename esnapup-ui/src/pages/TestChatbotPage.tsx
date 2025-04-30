import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const TestChatbotPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Chatbot Test Page
        </Typography>
        <Typography variant="body1" paragraph>
          This page is used to test if the chatbot component works correctly.
          You should see a chat button in the bottom right corner.
        </Typography>
      </Box>
    </Container>
  );
};

export default TestChatbotPage;