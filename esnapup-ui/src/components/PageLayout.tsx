import React from 'react';
import { Box } from '@mui/material';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        maxWidth: '800px',
        mx: 'auto',
        py: 6,
        px: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Transparent background for readability
        borderRadius: 3,
        boxShadow: 3,
        textAlign: 'center',
      }}
    >
      {children}
    </Box>
  );
};

export default PageLayout;