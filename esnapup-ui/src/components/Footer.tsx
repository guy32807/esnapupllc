import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Link as MuiLink, 
  IconButton,
  Divider,
  Paper,
  Stack
} from '@mui/material';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <Paper component="footer" square elevation={3} sx={{ mt: 'auto', py: 4, backgroundColor: '#1976d2', color: 'white' }}>
      <Container maxWidth="lg">
        {/* Replace Grid with Box/flexbox layout */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          flexWrap: 'wrap',
          gap: 4
        }}>
          {/* Company Info */}
          <Box sx={{ flex: { md: '1 1 25%' }, minWidth: { md: '25%' } }}>
            <Typography variant="h6" gutterBottom>
              ESnapup
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Innovative software solutions for businesses of all sizes. We create custom applications, websites, and digital experiences that help your organization thrive.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton color="inherit" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn">
                <LinkedInIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
            </Box>
          </Box>
          
          {/* Links */}
          <Box sx={{ flex: { md: '1 1 16.66%' }, minWidth: { md: '16.66%' } }}>
            <Typography variant="h6" gutterBottom>
              Links
            </Typography>
            <Stack spacing={1}>
              <MuiLink component={Link} to="/" color="inherit" underline="hover">
                Home
              </MuiLink>
              <MuiLink component={Link} to="/about" color="inherit" underline="hover">
                About
              </MuiLink>
              <MuiLink component={Link} to="/services" color="inherit" underline="hover">
                Services
              </MuiLink>
              <MuiLink component={Link} to="/portfolio" color="inherit" underline="hover">
                Portfolio
              </MuiLink>
              <MuiLink component={Link} to="/contact" color="inherit" underline="hover">
                Contact
              </MuiLink>
            </Stack>
          </Box>
          
          {/* Services */}
          <Box sx={{ flex: { md: '1 1 25%' }, minWidth: { md: '25%' } }}>
            <Typography variant="h6" gutterBottom>
              Services
            </Typography>
            <Stack spacing={1}>
              <MuiLink component={Link} to="/services#web-development" color="inherit" underline="hover">
                Web Development
              </MuiLink>
              <MuiLink component={Link} to="/services#mobile-apps" color="inherit" underline="hover">
                Mobile Applications
              </MuiLink>
              <MuiLink component={Link} to="/services#custom-software" color="inherit" underline="hover">
                Custom Software
              </MuiLink>
              <MuiLink component={Link} to="/services#digital-marketing" color="inherit" underline="hover">
                Digital Marketing
              </MuiLink>
              <MuiLink component={Link} to="/services#seo" color="inherit" underline="hover">
                SEO Services
              </MuiLink>
            </Stack>
          </Box>
          
          {/* Contact */}
          <Box sx={{ flex: { md: '1 1 25%' }, minWidth: { md: '25%' } }}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              San Francisco, CA 94105
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Email: info@esnapup.com
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Phone: (555) 123-4567
            </Typography>
          </Box>
        </Box>
        
        <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.2)' }} />
        
        <Typography variant="body2" align="center">
          © {currentYear} ESnapup. All rights reserved.
        </Typography>
      </Container>
    </Paper>
  );
};

export default Footer;