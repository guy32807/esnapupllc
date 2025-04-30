import React, { useState } from 'react';
import axios from 'axios'; // Add this import
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  TextField, 
  Button, 
  Paper, 
  Stack,
  Alert,
  Snackbar,
  CircularProgress 
} from '@mui/material';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import SEO from './SEO';
import SocialShare from './SocialShare';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post('http://localhost:3001/api/contact', formData);
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSuccess(false);
  };

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact ESnapup",
    "description": "Get in touch with our team of experts.",
    "mainEntity": {
      "@type": "Organization",
      "name": "ESnapup",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Chicago",
        "addressRegion": "IL",
        "postalCode": "60601",
        "addressCountry": "US"
      },
      "telephone": "+1-800-555-1234",
      "email": "info@esnapup.com"
    }
  };

  return (
    <>
      <SEO 
        title="Contact Us"
        description="Get in touch with ESnapup today. Our team of experts is ready to discuss your software development needs and help turn your vision into reality."
        keywords="contact ESnapup, software development inquiry, IT consulting contact, tech services quote"
        canonicalUrl="https://www.esnapup.com/contact"
        schema={contactSchema}
      />
      
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            component="h1" 
            fontWeight="bold" 
            gutterBottom
            sx={{ 
              color: '#1f2937', 
              mb: 4, 
              textAlign: 'center' 
            }}
          >
            Contact Us
          </Typography>
          
          <Typography 
            variant="h5" 
            component="p" 
            sx={{ 
              color: '#4b5563', 
              mb: 6, 
              textAlign: 'center',
              maxWidth: '800px',
              mx: 'auto',
              fontWeight: 300
            }}
          >
            We'd love to hear from you! Use the form below to get in touch with our team.
          </Typography>
          
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 4
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 3,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
              }}
            >
              <Typography 
                variant="h5" 
                component="h2" 
                fontWeight="bold" 
                gutterBottom
                sx={{ color: '#1f2937', mb: 4 }}
              >
                Get In Touch
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <LocationOnIcon sx={{ color: '#4fd1c5', mr: 2 }} />
                <Typography variant="body1" sx={{ color: '#4b5563' }}>
                  123 Business Street, San Francisco, CA 94103
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <EmailIcon sx={{ color: '#4fd1c5', mr: 2 }} />
                <Typography variant="body1" sx={{ color: '#4b5563' }}>
                  info@esnapup.com
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <LocalPhoneIcon sx={{ color: '#4fd1c5', mr: 2 }} />
                <Typography variant="body1" sx={{ color: '#4b5563' }}>
                  +1 (555) 123-4567
                </Typography>
              </Box>

              <Box sx={{ mt: 5, pt: 4, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1f2937' }}>
                  Connect With Us
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                  <SocialShare 
                    size="medium" 
                    iconColor="#4b5563"
                    hoverColor="#4fd1c5"
                  />
                </Box>
              </Box>
              
              <Typography 
                variant="body1" 
                sx={{ 
                  mt: 3, 
                  color: '#4b5563',
                  fontStyle: 'italic'
                }}
              >
                Our team is available Monday through Friday, 9:00 AM to 6:00 PM PST.
              </Typography>
            </Paper>
            
            <Paper
              elevation={0}
              sx={{
                p: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 3,
                flex: 2,
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
              }}
            >
              <Typography 
                variant="h5" 
                component="h2" 
                fontWeight="bold" 
                gutterBottom
                sx={{ color: '#1f2937', mb: 4 }}
              >
                Send Us a Message
              </Typography>
              
              <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                  <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)' } }}>
                    <TextField
                      fullWidth
                      required
                      label="Name"
                      name="name"
                      variant="outlined"
                      value={formData.name}
                      onChange={handleChange}
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': {
                            borderColor: '#4fd1c5',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#4fd1c5',
                          },
                        }
                      }}
                    />
                  </Box>
                  
                  <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)' } }}>
                    <TextField
                      fullWidth
                      required
                      label="Email"
                      name="email"
                      type="email"
                      variant="outlined"
                      value={formData.email}
                      onChange={handleChange}
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': {
                            borderColor: '#4fd1c5',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#4fd1c5',
                          },
                        }
                      }}
                    />
                  </Box>
                  
                  <Box sx={{ width: '100%' }}>
                    <TextField
                      fullWidth
                      required
                      label="Message"
                      name="message"
                      multiline
                      rows={4}
                      variant="outlined"
                      value={formData.message}
                      onChange={handleChange}
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': {
                            borderColor: '#4fd1c5',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#4fd1c5',
                          },
                        }
                      }}
                    />
                  </Box>
                </Box>
                
                {error && (
                  <Typography color="error" sx={{ mt: 2 }}>
                    {error}
                  </Typography>
                )}
                
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  endIcon={<SendIcon />}
                  sx={{
                    mt: 4,
                    py: 1.5,
                    px: 4,
                    backgroundColor: '#4fd1c5',
                    '&:hover': {
                      backgroundColor: '#38b2ac'
                    },
                    fontWeight: 500
                  }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Send Message'}
                </Button>
              </form>
            </Paper>
          </Box>
          
          <Snackbar open={success} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
              Your message has been sent successfully! We'll get back to you soon.
            </Alert>
          </Snackbar>
        </Container>
      </Box>
    </>
  );
};

export default ContactUs;