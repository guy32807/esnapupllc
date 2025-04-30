import React, { useState, useEffect } from 'react';
import { 
  Box, Paper, Typography, TextField, Button, IconButton, 
  Dialog, Slide, FormControlLabel, Checkbox, Divider,
  useTheme, useMediaQuery
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { TransitionProps } from '@mui/material/transitions';

// Slide up transition for dialog
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Store popup state in local storage
const hasSeenPopup = () => {
  return localStorage.getItem('esnapup_popup_seen') === 'true';
};

const setPopupSeen = () => {
  localStorage.setItem('esnapup_popup_seen', 'true');
  // Set expiry for 7 days
  localStorage.setItem('esnapup_popup_expiry', (Date.now() + 7 * 24 * 60 * 60 * 1000).toString());
};

const isPopupExpired = () => {
  const expiry = localStorage.getItem('esnapup_popup_expiry');
  return expiry && parseInt(expiry) < Date.now();
};

// Reset popup if expired
if (isPopupExpired()) {
  localStorage.removeItem('esnapup_popup_seen');
  localStorage.removeItem('esnapup_popup_expiry');
}

const LeadGenPopup: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [projectType, setProjectType] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    // Show popup after 15 seconds if not seen before
    const timer = setTimeout(() => {
      if (!hasSeenPopup()) {
        setOpen(true);
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setOpen(false);
    setPopupSeen();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would send the data to your backend or email service
    console.log({ name, email, company, projectType, consent });
    
    setSubmitted(true);
    // Close after 3 seconds
    setTimeout(() => {
      setOpen(false);
      setPopupSeen();
    }, 3000);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="free-consultation-popup"
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)'
        }
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'white',
            bgcolor: 'rgba(0,0,0,0.2)',
            '&:hover': {
              bgcolor: 'rgba(0,0,0,0.3)',
            }
          }}
        >
          <CloseIcon />
        </IconButton>
        
        {!submitted ? (
          <Box>
            <Box 
              sx={{ 
                backgroundImage: 'linear-gradient(135deg, #051937 0%, #004d7a 100%)',
                p: 4,
                color: 'white',
                textAlign: 'center'
              }}
            >
              <Typography 
                variant="h4" 
                component="h2" 
                sx={{ 
                  fontWeight: 'bold',
                  mb: 1
                }}
              >
                Free Strategy Consultation
              </Typography>
              <Typography 
                variant="subtitle1"
                sx={{ opacity: 0.9 }}
              >
                Skip the guesswork. Get expert advice on your software project.
              </Typography>
            </Box>
            
            <Box component="form" onSubmit={handleSubmit} sx={{ p: 4 }}>
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 3, 
                  color: 'text.secondary',
                  textAlign: 'center'
                }}
              >
                Schedule a free 30-minute consultation with our development experts to discuss your project needs.
              </Typography>
              
              <TextField
                fullWidth
                label="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                margin="normal"
                variant="outlined"
                InputProps={{
                  sx: { borderRadius: 2 }
                }}
              />
              
              <TextField
                fullWidth
                label="Business Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                margin="normal"
                variant="outlined"
                InputProps={{
                  sx: { borderRadius: 2 }
                }}
              />
              
              <TextField
                fullWidth
                label="Company Name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                margin="normal"
                variant="outlined"
                InputProps={{
                  sx: { borderRadius: 2 }
                }}
              />
              
              <TextField
                fullWidth
                label="Project Type"
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                margin="normal"
                variant="outlined"
                placeholder="Web, Mobile, Custom Software, etc."
                InputProps={{
                  sx: { borderRadius: 2 }
                }}
              />
              
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={consent} 
                    onChange={(e) => setConsent(e.target.checked)} 
                    name="consent" 
                    required 
                  />
                }
                label={
                  <Typography variant="body2" color="text.secondary">
                    I agree to receive communications from ESnapup. View our <a href="/privacy-policy" style={{ color: theme.palette.primary.main }}>Privacy Policy</a>.
                  </Typography>
                }
                sx={{ mt: 2, mb: 3 }}
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                startIcon={<CalendarTodayIcon />}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  background: 'linear-gradient(90deg, #1976d2 0%, #2196f3 100%)',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #1565c0 0%, #1976d2 100%)'
                  }
                }}
              >
                Schedule My Free Consultation
              </Button>
              
              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Typography variant="caption" color="text.secondary">
                  No credit card required. No obligation to purchase.
                </Typography>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box 
            sx={{ 
              p: 6, 
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: 'success.light',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3
              }}
            >
              <Box
                component="svg"
                sx={{ width: 40, height: 40, color: 'success.dark' }}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M9,16.17L4.83,12l-1.42,1.41L9,19 21,7l-1.41-1.41z"
                />
              </Box>
            </Box>
            <Typography variant="h4" gutterBottom fontWeight="bold">
              Thank You!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              We've received your request and will contact you within 24 hours to schedule your free consultation.
            </Typography>
          </Box>
        )}
      </Box>
    </Dialog>
  );
};

export default LeadGenPopup;