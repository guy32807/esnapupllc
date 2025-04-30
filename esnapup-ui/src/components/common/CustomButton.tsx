import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

interface CustomButtonProps {
  to: string;
  variant: 'contained' | 'outlined';
  children: React.ReactNode;
  sx?: object;
}

const CustomButton: React.FC<CustomButtonProps> = ({ to, variant, children, sx }) => {
  return (
    <Button
      component={Link}
      to={to}
      variant={variant}
      sx={{
        ...(variant === 'contained' && {
          backgroundColor: 'white',
          color: '#2563eb',
          '&:hover': { backgroundColor: '#f3f4f6' },
        }),
        ...(variant === 'outlined' && {
          color: 'white',
          borderColor: 'white',
          '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
        }),
        ...sx,
      }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;