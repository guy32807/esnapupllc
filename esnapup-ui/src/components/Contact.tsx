import React, { useState } from 'react';
import { 
  Container, Typography, Box, TextField, Button, 
  Card, CardContent, Paper, Divider, useTheme, useMediaQuery,
  Snackbar, Alert, Avatar, IconButton, Grid as MuiGrid, Link
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import SendIcon from '@mui/icons-material/Send';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SEO from './SEO';

// Use type casting for Grid component to fix TypeScript errors
const Grid = MuiGrid as any;

const Contact: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      // Simulate form submission
      setTimeout(() => {
        setSnackbar({
          open: true,
          message: 'Your message has been sent successfully! We will get back to you soon.',
          severity: 'success'
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      }, 1000);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact ESnapup - Software Development & Digital Solutions",
    "description": "Get in touch with ESnapup for all your software development and digital transformation needs. Our expert team is ready to help bring your ideas to life.",
    "mainEntity": {
      "@type": "Organization",
      "name": "ESnapup",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Orlando",
        "addressRegion": "FL",
        "addressCountry": "US"
      },
      "description": "",
      "email": "info@esnapup.com",
      "telephone": "+1 (800) 555-1234",
      "sameAs": [
        "https://www.facebook.com/esnapup",
        "https://www.twitter.com/esnapup",
        "https://www.linkedin.com/company/esnapup",
        "https://www.instagram.com/esnapup"
      ]
    }
  };
  
  return (
    <>
      <SEO 
        title="Contact ESnapup | Software Development Solutions"
        description="Contact ESnapup for professional software development services. Our team of experts is ready to help with your web, mobile, and custom software needs."
        keywords={[
          "contact ESnapup",
          "software development services",
          "custom web development",
          "mobile app developers",
          "technology consultants",
          "remote software development"
        ]}
        canonicalUrl="https://www.esnapup.com/contact"
        ogTitle="Get in Touch | ESnapup Software Solutions"
        ogDescription="Reach out to our expert development team for your next digital project. We're here to transform your ideas into powerful software solutions."
        ogImage="https://www.esnapup.com/images/contact-banner.jpg"
        twitterCard="summary_large_image"
        twitterSite="@esnapup"
        schema={contactSchema}
      />

      {/* Enhanced Hero Section */}
      <Box 
        sx={{
          background: `linear-gradient(135deg, #051937 0%, #004d7a 100%)`,
          py: { xs: 8, md: 12 },
          mb: { xs: 6, md: 10 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Decorative elements */}
        <Box sx={{
          position: 'absolute',
          top: '20%',
          right: '5%',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0) 70%)',
          zIndex: 0
        }} />
        <Box sx={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 70%)',
          zIndex: 0
        }} />
        
        <Container maxWidth="lg">
          <Box sx={{ 
            textAlign: 'center', 
            color: 'white', 
            maxWidth: '800px', 
            mx: 'auto',
            position: 'relative',
            zIndex: 1
          }}>
            <Typography 
              variant="h1" 
              component="h1" 
              sx={{ 
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 'bold',
                mb: 3,
                background: 'linear-gradient(90deg, #ffffff 0%, #e0e7ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 5px 15px rgba(0,0,0,0.2)'
              }}
            >
              Get In Touch
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                opacity: 0.9,
                mb: 4,
                fontWeight: 'normal',
                lineHeight: 1.8,
                maxWidth: '650px',
                mx: 'auto'
              }}
            >
              We'd love to hear from you. Whether you have a question about our services, pricing, or just want to say hello, our team is ready to answer all your questions.
            </Typography>
            
            {/* Optional: Add decorative dots or shapes */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 1.5,
              mt: 2,
              opacity: 0.5
            }}>
              {[...Array(5)].map((_, i) => (
                <Box 
                  key={i} 
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    opacity: i === 2 ? 1 : 0.6
                  }}
                />
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Updated Grid Layout */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        {/* Background design element */}
        <Box
          sx={{
            position: 'absolute',
            top: '40%',
            right: 0,
            width: '35%',
            height: '70%',
            background: 'radial-gradient(circle, rgba(79, 209, 197, 0.08) 0%, rgba(79, 209, 197, 0) 70%)',
            zIndex: -1,
            borderRadius: '50%'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '20%',
            left: 0,
            width: '40%',
            height: '50%',
            background: 'radial-gradient(circle, rgba(25, 118, 210, 0.05) 0%, rgba(25, 118, 210, 0) 70%)',
            zIndex: -1,
            borderRadius: '50%'
          }}
        />

        <Grid container spacing={{ xs: 4, md: 3 }} sx={{ alignItems: 'stretch', position: 'relative' }}>
          {/* Column 1: Message Form */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: { xs: 3, md: 3.5 },
                height: '100%',
                borderRadius: 3,
                boxShadow: '0 15px 50px rgba(0, 0, 0, 0.1)',
                background: 'linear-gradient(170deg, #ffffff 0%, #f5f9ff 100%)',
                border: '1px solid rgba(25, 118, 210, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Decorative elements */}
              <Box sx={{
                position: 'absolute',
                top: '-10%',
                right: '-5%',
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(25, 118, 210, 0.04) 0%, rgba(25, 118, 210, 0) 70%)',
                zIndex: 0
              }} />
              <Box sx={{
                position: 'absolute',
                bottom: '-10%',
                left: '-10%',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(25, 118, 210, 0.03) 0%, rgba(25, 118, 210, 0) 70%)',
                zIndex: 0
              }} />
              
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: 'primary.main', 
                      color: 'white',
                      width: 42,
                      height: 42,
                      mr: 2,
                      boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)'
                    }}
                  >
                    <SendIcon sx={{ fontSize: 22 }} />
                  </Avatar>
                  <Typography 
                    variant="h4" 
                    component="h2" 
                    sx={{ 
                      fontWeight: 'bold',
                      color: 'text.primary',
                      fontSize: { xs: '1.75rem', md: '1.75rem' }
                    }}
                  >
                    Send a Message
                  </Typography>
                </Box>
                
                <Typography 
                  variant="body1" 
                  color="text.secondary" 
                  sx={{ mb: 3, ml: 0.5 }}
                >
                  We'll get back to you within 24 hours.
                </Typography>
                
                <Box 
                  component="form" 
                  onSubmit={handleSubmit} 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    flexGrow: 1
                  }}
                >
                  {/* Form fields - slightly more compact */}
                  <TextField
                    fullWidth
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    variant="outlined"
                    error={!!errors.name}
                    helperText={errors.name}
                    required
                    InputProps={{
                      sx: { 
                        borderRadius: 2,
                        bgcolor: 'background.paper',
                      }
                    }}
                    sx={{ mb: 2 }}
                  />
                  
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    variant="outlined"
                    error={!!errors.email}
                    helperText={errors.email}
                    required
                    InputProps={{
                      sx: { 
                        borderRadius: 2,
                        bgcolor: 'background.paper',
                      }
                    }}
                    sx={{ mb: 2 }}
                  />
                  
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{
                      sx: { 
                        borderRadius: 2,
                        bgcolor: 'background.paper',
                      }
                    }}
                    sx={{ mb: 2 }}
                  />
                  
                  <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{
                      sx: { 
                        borderRadius: 2,
                        bgcolor: 'background.paper',
                      }
                    }}
                    sx={{ mb: 2 }}
                  />
                  
                  <TextField
                    fullWidth
                    label="Your Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    variant="outlined"
                    multiline
                    rows={3}
                    error={!!errors.message}
                    helperText={errors.message}
                    required
                    InputProps={{
                      sx: { 
                        borderRadius: 2,
                        bgcolor: 'background.paper',
                      }
                    }}
                    sx={{ mb: 3 }}
                  />
                  
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      mt: 'auto'
                    }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      endIcon={<SendIcon />}
                      sx={{
                        py: 1.2,
                        px: 3,
                        borderRadius: 6,
                        fontWeight: 600,
                        boxShadow: '0 8px 20px rgba(25, 118, 210, 0.25)',
                        background: 'linear-gradient(90deg, #1976d2 0%, #2196f3 100%)',
                      }}
                      fullWidth
                    >
                      Send Message
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Column 2: Email Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ 
              height: '100%',
              borderRadius: 3,
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.07)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              overflow: 'hidden',
              border: '1px solid rgba(0, 0, 0, 0.04)',
              background: 'linear-gradient(145deg, #ffffff 0%, #f9fafb 100%)',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)'
              }
            }}>
              <CardContent sx={{ 
                display: 'flex', 
                alignItems: 'flex-start',
                p: { xs: 3, md: 3.5 },
                height: '100%'
              }}>
                <Box sx={{ position: 'relative', mr: 3 }}>
                  <Box sx={{ 
                    position: 'absolute', 
                    width: 72, 
                    height: 72, 
                    borderRadius: '50%', 
                    background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.12) 0%, rgba(156, 39, 176, 0.05) 100%)',
                    top: -8,
                    left: -8,
                    zIndex: 0
                  }} />
                  <Avatar 
                    sx={{ 
                      bgcolor: 'secondary.main', 
                      color: 'white',
                      width: 56,
                      height: 56,
                      position: 'relative',
                      zIndex: 1,
                      boxShadow: '0 6px 16px rgba(156, 39, 176, 0.3)'
                    }}
                  >
                    <EmailIcon sx={{ fontSize: 26 }} />
                  </Avatar>
                </Box>
                <Box>
                  <Typography variant="h5" gutterBottom fontWeight="700" color="secondary.main">
                    Email Us
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    For all inquiries:
                  </Typography>
                  <Typography variant="body1" color="text.primary" sx={{ fontWeight: 'medium', mb: 1 }}>
                    <Link href="mailto:adubuisson@comcast.net" sx={{ 
                      color: 'inherit', 
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' }
                    }}>
                      adubuisson@comcast.net
                    </Link>
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    Business email:
                  </Typography>
                  <Typography variant="body1" color="text.primary" sx={{ fontWeight: 'medium' }}>
                    <Link href="mailto:info@esnapup.com" sx={{ 
                      color: 'inherit', 
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' }
                    }}>
                      info@esnapup.com
                    </Link>
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Column 3: Phone Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ 
              height: '100%',
              borderRadius: 3,
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.07)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              overflow: 'hidden',
              border: '1px solid rgba(0, 0, 0, 0.04)',
              background: 'linear-gradient(145deg, #ffffff 0%, #f9fafb 100%)',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)'
              }
            }}>
              <CardContent sx={{ 
                display: 'flex', 
                alignItems: 'flex-start',
                p: { xs: 3, md: 3.5 },
                height: '100%'
              }}>
                <Box sx={{ position: 'relative', mr: 3 }}>
                  <Box sx={{ 
                    position: 'absolute', 
                    width: 72, 
                    height: 72, 
                    borderRadius: '50%', 
                    background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.12) 0%, rgba(76, 175, 80, 0.05) 100%)',
                    top: -8,
                    left: -8,
                    zIndex: 0
                  }} />
                  <Avatar 
                    sx={{ 
                      bgcolor: 'success.main', 
                      color: 'white',
                      width: 56,
                      height: 56,
                      position: 'relative',
                      zIndex: 1,
                      boxShadow: '0 6px 16px rgba(76, 175, 80, 0.3)'
                    }}
                  >
                    <PhoneIcon sx={{ fontSize: 26 }} />
                  </Avatar>
                </Box>
                <Box>
                  <Typography variant="h5" gutterBottom fontWeight="700" color="success.main">
                    Call Us
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    Direct contact:
                  </Typography>
                  <Typography variant="body1" color="text.primary" sx={{ fontWeight: 'medium', mb: 1 }}>
                    <Link href="tel:+16302979962" sx={{ 
                      color: 'inherit', 
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' }
                    }}>
                      (630) 297-9962
                    </Link>
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, mt: 2 }}>
                    Best times to call:
                  </Typography>
                  <Typography variant="body1" color="text.primary" sx={{ fontWeight: 'medium' }}>
                    9:00 AM - 6:00 PM EST, Mon-Fri
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Column 4: Business Hours Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ 
              height: '100%',
              borderRadius: 3,
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.07)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              overflow: 'hidden',
              border: '1px solid rgba(0, 0, 0, 0.04)',
              background: 'linear-gradient(145deg, #ffffff 0%, #f9fafb 100%)',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)'
              }
            }}>
              <CardContent sx={{ 
                display: 'flex', 
                alignItems: 'flex-start',
                p: { xs: 3, md: 3.5 },
                height: '100%'
              }}>
                <Box sx={{ position: 'relative', mr: 3 }}>
                  <Box sx={{ 
                    position: 'absolute', 
                    width: 72, 
                    height: 72, 
                    borderRadius: '50%', 
                    background: 'linear-gradient(135deg, rgba(3, 169, 244, 0.12) 0%, rgba(3, 169, 244, 0.05) 100%)',
                    top: -8,
                    left: -8,
                    zIndex: 0
                  }} />
                  <Avatar 
                    sx={{ 
                      bgcolor: 'info.main', 
                      color: 'white',
                      width: 56,
                      height: 56,
                      position: 'relative',
                      zIndex: 1,
                      boxShadow: '0 6px 16px rgba(3, 169, 244, 0.3)'
                    }}
                  >
                    <AccessTimeIcon sx={{ fontSize: 26 }} />
                  </Avatar>
                </Box>
                <Box>
                  <Typography variant="h5" gutterBottom fontWeight="700" color="info.main">
                    Business Hours
                  </Typography>
                  <Typography variant="body1" color="text.primary" sx={{ fontWeight: 'medium' }}>
                    Monday - Friday:
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                    9:00 AM - 6:00 PM EST
                  </Typography>
                  <Typography variant="body1" color="text.primary" sx={{ fontWeight: 'medium' }}>
                    Saturday - Sunday:
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Closed
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Column 5: Connect With Us Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ 
              height: '100%',
              borderRadius: 3,
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.07)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              overflow: 'hidden',
              border: '1px solid rgba(0, 0, 0, 0.04)',
              background: 'linear-gradient(145deg, #ffffff 0%, #f9fafb 100%)',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)'
              }
            }}>
              <CardContent sx={{ p: { xs: 3, md: 3.5 }, height: '100%' }}>
                <Typography variant="h5" gutterBottom fontWeight="700" color="error.main" sx={{ mb: 3 }}>
                  Connect With Us
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
                  <IconButton href="https://linkedin.com/company/esnapup" target="_blank" aria-label="LinkedIn" sx={{ 
                    color: '#0077B5', 
                    bgcolor: 'rgba(0, 119, 181, 0.1)',
                    '&:hover': { bgcolor: 'rgba(0, 119, 181, 0.2)', transform: 'scale(1.1)' },
                    transition: 'all 0.2s ease'
                  }}>
                    <LinkedInIcon />
                  </IconButton>
                  
                  <IconButton href="https://twitter.com/esnapup" target="_blank" aria-label="Twitter" sx={{ 
                    color: '#1DA1F2', 
                    bgcolor: 'rgba(29, 161, 242, 0.1)',
                    '&:hover': { bgcolor: 'rgba(29, 161, 242, 0.2)', transform: 'scale(1.1)' },
                    transition: 'all 0.2s ease'
                  }}>
                    <TwitterIcon />
                  </IconButton>
                  
                  <IconButton href="https://facebook.com/esnapup" target="_blank" aria-label="Facebook" sx={{ 
                    color: '#4267B2', 
                    bgcolor: 'rgba(66, 103, 178, 0.1)',
                    '&:hover': { bgcolor: 'rgba(66, 103, 178, 0.2)', transform: 'scale(1.1)' },
                    transition: 'all 0.2s ease'
                  }}>
                    <FacebookIcon />
                  </IconButton>
                  
                  <IconButton href="https://instagram.com/esnapup" target="_blank" aria-label="Instagram" sx={{ 
                    color: '#E1306C', 
                    bgcolor: 'rgba(225, 48, 108, 0.1)',
                    '&:hover': { bgcolor: 'rgba(225, 48, 108, 0.2)', transform: 'scale(1.1)' },
                    transition: 'all 0.2s ease'
                  }}>
                    <InstagramIcon />
                  </IconButton>
                </Box>
                
                <Typography variant="body1" color="text.secondary" align="center" sx={{ mt: 3 }}>
                  Follow us on social media to stay updated with our latest projects, insights, and technology trends.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Success/Error Notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Contact;