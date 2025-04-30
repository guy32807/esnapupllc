import React from 'react';
import { 
  Container, Box, Typography, Button, Grid as MuiGrid, Card, CardContent, 
  CardMedia, Avatar, Divider, useTheme, useMediaQuery, Paper, 
  Chip, Stack, Link
} from '@mui/material';
import { motion } from 'framer-motion';
import CodeIcon from '@mui/icons-material/Code';
import DevicesIcon from '@mui/icons-material/Devices';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router-dom';
import SEO from '../components/SEO';
import SocialShare from '../components/SocialShare';

// Create a custom Grid component that accepts 'item' prop for TypeScript compatibility
const Grid = MuiGrid as any;

// Custom components
const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionCard = motion(Card);

// Animate on scroll variant
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

// Staggered children animation
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const HomePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  // Schema.org structured data
  const getOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ESnapup",
    "url": "https://www.esnapup.com",
    "logo": "https://www.esnapup.com/logo.png",
    "sameAs": [
      "https://www.facebook.com/esnapup",
      "https://www.twitter.com/esnapup",
      "https://www.linkedin.com/company/esnapup",
      "https://www.instagram.com/esnapup"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-800-555-1234",
      "contactType": "customer service",
      "availableLanguage": ["English"]
    }
  });

  const getWebsiteSchema = () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ESnapup - Professional Web Development Solutions",
    "url": "https://www.esnapup.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.esnapup.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  });

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc.",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      content: "ESnapup transformed our business with a custom web application that streamlined our processes and increased customer engagement by over 200%. Their expertise and dedication to our project exceeded all expectations."
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "CTO, InnovateNow",
      avatar: "https://randomuser.me/api/portraits/men/44.jpg",
      content: "Working with ESnapup was a game-changer for our startup. Their development team delivered a robust mobile app on time and under budget, which helped us secure our next round of funding."
    },
    {
      id: 3,
      name: "Jennifer Roberts",
      role: "Marketing Director, GrowthMasters",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      content: "The website ESnapup built for us is not only beautiful but delivers results. Our conversion rates have increased by 45% since launch, and their ongoing support ensures everything runs smoothly."
    }
  ];

  // Featured technologies
  const technologies = [
    "React", "Angular", "Vue.js", "Next.js", "Node.js", "Express",
    "TypeScript", "Python", "Django", "Ruby on Rails", "AWS", "Azure",
    "MongoDB", "PostgreSQL", "GraphQL", "Docker", "Kubernetes", "CI/CD"
  ];

  return (
    <>
      <SEO 
        title="ESnapup - Professional Web Development & Digital Solutions"
        description="ESnapup provides cutting-edge web development services to transform your business ideas into powerful digital solutions. We specialize in full-stack, mobile, and enterprise applications."
        keywords={[
          "web development", 
          "software development", 
          "mobile apps",
          "full stack development",
          "frontend development",
          "backend services",
          "enterprise applications"
        ]}
        canonicalUrl="/"
        structuredData={[
          getOrganizationSchema(),
          getWebsiteSchema()
        ]}
      />

      {/* Hero Section */}
      <Box 
        sx={{
          background: 'linear-gradient(135deg, #051937 0%, #004d7a 100%)',
          color: 'white',
          pt: { xs: 10, md: 16 },
          pb: { xs: 12, md: 20 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Abstract Background Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '-5%',
            right: '-10%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
            zIndex: 1
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '-20%',
            left: '-10%',
            width: '800px',
            height: '800px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)',
            zIndex: 1
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography 
                  variant="h1" 
                  component="h1" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 'bold',
                    fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem', lg: '4rem' },
                    lineHeight: 1.2,
                    mb: 3
                  }}
                >
                  Transforming Ideas Into
                  <Box component="span" sx={{ 
                    display: 'block',
                    color: theme.palette.primary.main,
                    textShadow: '0 0 15px rgba(79, 209, 197, 0.5)'
                  }}>
                    Powerful Digital Solutions
                  </Box>
                </Typography>
                
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 4, 
                    fontWeight: 'normal',
                    opacity: 0.9,
                    maxWidth: '600px', 
                    lineHeight: 1.6
                  }}
                >
                  We design and develop custom software solutions that drive business growth, enhance user experience, and solve complex challenges.
                </Typography>
                
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={2}
                  sx={{ mb: 4 }}
                >
                  <Button 
                    variant="contained" 
                    component={RouterLink}
                    to="/contact"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    sx={{ 
                      py: 1.5, 
                      px: 4,
                      borderRadius: 2,
                      fontSize: '1.1rem',
                      fontWeight: 500,
                      boxShadow: '0 8px 20px rgba(79, 209, 197, 0.3)'
                    }}
                  >
                    Get Started
                  </Button>
                  <Button 
                    variant="outlined" 
                    component={RouterLink}
                    to="/services"
                    size="large"
                    sx={{ 
                      py: 1.5, 
                      px: 4,
                      borderRadius: 2,
                      fontSize: '1.1rem',
                      fontWeight: 500,
                      color: 'white',
                      borderColor: 'rgba(255,255,255,0.5)',
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255,255,255,0.05)'
                      }
                    }}
                  >
                    Our Services
                  </Button>
                </Stack>
                
                {/* <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 3 }}>
                  <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    Trusted by leading companies:
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', opacity: 0.9 }}>
                    {['company1.svg', 'company2.svg', 'company3.svg'].map((logo, index) => (
                      <Box 
                        key={index}
                        component="img"
                        src={`/logos/${logo}`}
                        alt="Client Logo"
                        sx={{ 
                          height: '24px',
                          filter: 'brightness(0) invert(1)'
                        }}
                      />
                    ))}
                  </Box>
                </Box> */}
              </MotionBox>
            </Grid>
            
            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
              <MotionBox
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                sx={{
                  position: 'relative',
                  height: '500px',
                  width: '100%'
                }}
              >
                <Box
                  component="img"
                  src="/images/hero-illustration.svg"
                  alt="Web Development Illustration"
                  sx={{
                    width: '120%',
                    position: 'absolute',
                    right: '-40px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    filter: 'drop-shadow(0px 10px 30px rgba(0, 0, 0, 0.15))'
                  }}
                />
              </MotionBox>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default HomePage;