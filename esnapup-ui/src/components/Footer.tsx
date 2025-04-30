import React from 'react';
import { Box, Container, Typography, Link, Stack, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import CodeIcon from '@mui/icons-material/Code'; // For Stack Overflow
import NewReleasesIcon from '@mui/icons-material/NewReleases'; // For ProductHunt
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark'; // For Dev.to
import BrushIcon from '@mui/icons-material/Brush'; // For Behance/Dribbble
import BusinessIcon from '@mui/icons-material/Business'; // For Clutch/G2

const Footer: React.FC = () => {
  const socialIconStyle = { color: 'inherit' };

  return (
    <Box component="footer" sx={{ bgcolor: 'primary.main', color: 'white', py: 6, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Stack 
          direction={{ xs: 'column', md: 'row' }} 
          spacing={4} 
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="h6" gutterBottom>
              ESnapup
            </Typography>
            <Typography variant="body2">
              Professional web development solutions for businesses of all sizes.
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              <Link href="/" color="inherit" underline="hover">
                Home
              </Link>
              <Link href="/about" color="inherit" underline="hover">
                About
              </Link>
              <Link href="/portfolio" color="inherit" underline="hover">
                Portfolio
              </Link>
              <Link href="/contact" color="inherit" underline="hover">
                Contact
              </Link>
            </Stack>
          </Box>
          
          <Box>
            <Typography variant="h6" gutterBottom>
              Connect With Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
              <Typography variant="subtitle2" align="center" color="textSecondary">
                Connect With Us
              </Typography>
              
              {/* Primary social networks */}
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Link href="https://twitter.com/esnapup" color="inherit" aria-label="Twitter">
                  <TwitterIcon />
                </Link>
                <Link href="https://linkedin.com/company/esnapup" color="inherit" aria-label="LinkedIn">
                  <LinkedInIcon />
                </Link>
              </Box>
              
              {/* Developer platforms */}
              <Typography variant="caption" align="center" color="textSecondary" sx={{ mt: 2 }}>
                Developer Resources
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <IconButton 
                  href="https://stackoverflow.com/c/esnapup" 
                  target="_blank"
                  aria-label="Stack Overflow"
                  sx={socialIconStyle}
                >
                  <CodeIcon />
                </IconButton>
                <IconButton 
                  href="https://github.com/esnapup" 
                  target="_blank"
                  aria-label="GitHub"
                  sx={socialIconStyle}
                >
                  <GitHubIcon />
                </IconButton>
                <IconButton 
                  href="https://dev.to/esnapup" 
                  target="_blank"
                  aria-label="Dev.to"
                  sx={socialIconStyle}
                >
                  <CollectionsBookmarkIcon />
                </IconButton>
              </Box>
              
              {/* Business platforms */}
              <Typography variant="caption" align="center" color="textSecondary" sx={{ mt: 2 }}>
                Business Profiles
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <IconButton 
                  href="https://clutch.co/profile/esnapup" 
                  target="_blank"
                  aria-label="Clutch.co"
                  sx={socialIconStyle}
                >
                  <BusinessIcon />
                </IconButton>
                <IconButton 
                  href="https://www.behance.net/esnapup" 
                  target="_blank"
                  aria-label="Behance"
                  sx={socialIconStyle}
                >
                  <BrushIcon />
                </IconButton>
                <IconButton 
                  href="https://www.producthunt.com/@esnapup" 
                  target="_blank"
                  aria-label="Product Hunt"
                  sx={socialIconStyle}
                >
                  <NewReleasesIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Stack>
        
        <Typography variant="body2" align="center" sx={{ mt: 4 }}>
          © {new Date().getFullYear()} ESnapup. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;