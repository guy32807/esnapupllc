import React from 'react';
import { Typography, Box } from '@mui/material';

interface LogoProps {
  color?: string;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ color = "primary.main", height = 50 }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography 
        variant="h5" 
        noWrap 
        component="div"
        sx={{ 
          fontWeight: 700, 
          letterSpacing: '.1rem',
          color: color,
          textDecoration: 'none',
          fontSize: `${height * 0.5}px`,
          lineHeight: 1
        }}
      >
        ESnapup
      </Typography>
    </Box>
  );
};

export default Logo;