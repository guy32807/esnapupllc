import React from 'react';
import { Box, BoxProps } from '@mui/material';

interface OptimizedImageProps extends BoxProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  lazy?: boolean;
}

/**
 * A component for rendering optimized images with proper attributes for SEO
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  lazy = true,
  sx,
  ...props
}) => {
  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={lazy ? "lazy" : undefined}
      sx={{ 
        maxWidth: '100%',
        height: 'auto',
        ...sx 
      }}
      {...props}
    />
  );
};

export default OptimizedImage;