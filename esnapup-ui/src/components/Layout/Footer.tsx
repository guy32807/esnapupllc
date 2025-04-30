import React, { useState } from 'react';
import { Box, Container, Typography, Link, IconButton, Menu, MenuItem, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import PinterestIcon from '@mui/icons-material/Pinterest';
import YouTubeIcon from '@mui/icons-material/YouTube';
import RedditIcon from '@mui/icons-material/Reddit';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import ShareIcon from '@mui/icons-material/Share';
import Logo from '../Logo';

const Footer: React.FC = () => {
  const [shareAnchorEl, setShareAnchorEl] = useState<null | HTMLElement>(null);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [shareMessage, setShareMessage] = useState('Check out this amazing website: ESnapup!');
  
  const websiteUrl = window.location.href;
  const encodedUrl = encodeURIComponent(websiteUrl);
  const encodedMessage = encodeURIComponent(shareMessage);
  
  const handleShareClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setShareAnchorEl(event.currentTarget);
  };
  
  const handleShareClose = () => {
    setShareAnchorEl(null);
  };
  
  const openShareDialog = (platform: string) => {
    setSelectedPlatform(platform);
    setShareDialogOpen(true);
    handleShareClose();
  };
  
  const handleDialogClose = () => {
    setShareDialogOpen(false);
  };
  
  const handleShare = () => {
    let shareUrl = '';
    
    switch (selectedPlatform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedMessage}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedMessage}&url=${encodedUrl}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodeURIComponent('ESnapup')}&summary=${encodedMessage}`;
        break;
      case 'reddit':
        shareUrl = `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedMessage}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodedMessage} ${encodedUrl}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedMessage}`;
        break;
      case 'pinterest':
        shareUrl = `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedMessage}`;
        break;
      default:
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    }
    
    // Open share URL in a new window
    window.open(shareUrl, '_blank', 'width=600,height=400');
    handleDialogClose();
  };
  
  // Function to copy the current URL to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
    handleShareClose();
  };

  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 3, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Logo />
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
          <Link component={RouterLink} to="/" color="inherit" underline="hover">
            Home
          </Link>
          <Link component={RouterLink} to="/services" color="inherit" underline="hover">
            Services
          </Link>
          <Link component={RouterLink} to="/portfolio" color="inherit" underline="hover">
            Portfolio
          </Link>
          <Link component={RouterLink} to="/about" color="inherit" underline="hover">
            About
          </Link>
          <Link component={RouterLink} to="/contact" color="inherit" underline="hover">
            Contact
          </Link>
        </Box>
        
        {/* Social Media Icons */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <IconButton color="inherit" aria-label="Facebook" onClick={() => openShareDialog('facebook')}>
            <FacebookIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="Twitter" onClick={() => openShareDialog('twitter')}>
            <TwitterIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="LinkedIn" onClick={() => openShareDialog('linkedin')}>
            <LinkedInIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="Instagram" component="a" href="https://instagram.com" target="_blank">
            <InstagramIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="Pinterest" onClick={() => openShareDialog('pinterest')}>
            <PinterestIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="YouTube" component="a" href="https://youtube.com" target="_blank">
            <YouTubeIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="Reddit" onClick={() => openShareDialog('reddit')}>
            <RedditIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="WhatsApp" onClick={() => openShareDialog('whatsapp')}>
            <WhatsAppIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="Telegram" onClick={() => openShareDialog('telegram')}>
            <TelegramIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="GitHub" component="a" href="https://github.com" target="_blank">
            <GitHubIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="Share" onClick={handleShareClick}>
            <ShareIcon />
          </IconButton>
        </Box>
        
        {/* Share Menu */}
        <Menu
          anchorEl={shareAnchorEl}
          open={Boolean(shareAnchorEl)}
          onClose={handleShareClose}
        >
          <MenuItem onClick={copyToClipboard}>Copy link</MenuItem>
          <MenuItem onClick={() => openShareDialog('facebook')}>Share on Facebook</MenuItem>
          <MenuItem onClick={() => openShareDialog('twitter')}>Share on Twitter</MenuItem>
          <MenuItem onClick={() => openShareDialog('linkedin')}>Share on LinkedIn</MenuItem>
          <MenuItem onClick={() => openShareDialog('whatsapp')}>Share on WhatsApp</MenuItem>
          <MenuItem onClick={() => openShareDialog('telegram')}>Share on Telegram</MenuItem>
        </Menu>
        
        {/* Share Dialog */}
        <Dialog open={shareDialogOpen} onClose={handleDialogClose}>
          <DialogTitle>
            Share to {selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="message"
              label="Your message"
              type="text"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={shareMessage}
              onChange={(e) => setShareMessage(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleShare} color="primary" variant="contained">
              Share
            </Button>
          </DialogActions>
        </Dialog>
        
        <Typography variant="body2" align="center">
          We build digital solutions that transform businesses.
        </Typography>
        
        <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid rgba(255,255,255,0.2)' }}>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} ESnapup. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;