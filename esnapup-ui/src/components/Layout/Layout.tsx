import React from 'react';
import { Box } from '@mui/material';
import Navbar from '../Navbar';
import Footer from './Footer'; // This points to your existing Footer component with social media icons
import ChatbotWidget from '../Chatbot/ChatbotWidget';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: '100vh' 
      }}
    >
      <Navbar />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {children}
      </Box>
      <Footer />
      <ChatbotWidget />
    </Box>
  );
};

export default Layout;