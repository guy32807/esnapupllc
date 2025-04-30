import React from 'react';
import { Box, Typography } from '@mui/material';

interface FeatureCardProps {
  icon: string; // The raw SVG string
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: 'white',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      {/* Render the raw SVG string */}
      <Box
        sx={{ mb: 2 }}
        dangerouslySetInnerHTML={{ __html: icon }} // Render the SVG string as HTML
      />
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Box>
  );
};

export default FeatureCard;