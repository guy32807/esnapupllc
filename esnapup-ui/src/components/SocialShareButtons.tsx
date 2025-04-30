import React from 'react';
import { Box, IconButton, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import LinkIcon from '@mui/icons-material/Link';

interface SocialShareButtonsProps {
  url?: string;
  title?: string;
  description?: string;
  vertical?: boolean;
}

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({
  url: propUrl,
  title: propTitle,
  description: propDescription,
  vertical = false
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Default to current URL if not provided
  const url = propUrl || (typeof window !== 'undefined' ? window.location.href : '');
  // Default title and description
  const title = propTitle || 'Check out ESnapup';
  const description = propDescription || 'Professional web development and digital solutions';
  
  // Encode for sharing
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied to clipboard!');
    }).catch(err => {
      console.error('Could not copy link: ', err);
    });
  };
  
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: vertical ? 'column' : 'row',
        gap: 1,
        my: 2
      }}
    >
      <Tooltip title="Share on Facebook">
        <IconButton 
          color="primary" 
          aria-label="share on facebook"
          onClick={() => window.open(shareUrls.facebook, '_blank')}
        >
          <FacebookIcon />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Share on Twitter">
        <IconButton 
          color="primary" 
          aria-label="share on twitter"
          onClick={() => window.open(shareUrls.twitter, '_blank')}
        >
          <TwitterIcon />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Share on LinkedIn">
        <IconButton 
          color="primary" 
          aria-label="share on linkedin"
          onClick={() => window.open(shareUrls.linkedin, '_blank')}
        >
          <LinkedInIcon />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Share by Email">
        <IconButton 
          color="primary" 
          aria-label="share by email"
          onClick={() => window.open(shareUrls.email, '_blank')}
        >
          <EmailIcon />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Copy Link">
        <IconButton 
          color="primary" 
          aria-label="copy link"
          onClick={copyToClipboard}
        >
          <LinkIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default SocialShareButtons;