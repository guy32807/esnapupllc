import React, { useState } from 'react';
import { 
  Container, Typography, Box, Avatar, Paper, Rating,
  IconButton, useTheme, useMediaQuery, Chip, Grid as MuiGrid
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import VerifiedIcon from '@mui/icons-material/Verified';

// Type casting for Grid component to fix TypeScript errors
const Grid = MuiGrid as any;

// Replace slider with a simpler implementation since we're having dependency issues
const EnhancedTestimonials: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Simplified testimonials data
  const testimonials = [
    {
      id: "1",
      name: "John Richardson",
      position: "CTO",
      company: "TechSmart Solutions",
      testimonial: "ESnapup transformed our outdated platform into a powerful, modern web application. Their team's expertise and dedication exceeded our expectations at every stage.",
      rating: 5,
      projectType: "Web Application",
      verifiedCustomer: true,
      results: [
        { label: "Conversion Rate", value: "+42%" },
        { label: "Page Load Time", value: "-65%" },
        { label: "User Engagement", value: "+53%" }
      ]
    },
    {
      id: "2",
      name: "Sarah Mitchell",
      position: "Marketing Director",
      company: "GrowthLabs",
      testimonial: "The mobile app ESnapup developed for us has been a game-changer for our business. Our customers love the intuitive interface and powerful features.",
      rating: 5,
      projectType: "Mobile Application",
      verifiedCustomer: true,
      results: [
        { label: "App Downloads", value: "50,000+" },
        { label: "User Retention", value: "78%" },
        { label: "Revenue Growth", value: "+31%" }
      ]
    },
    {
      id: "3",
      name: "Michael Chen",
      position: "CEO",
      company: "InnovateTech",
      testimonial: "Working with ESnapup on our enterprise system integration was seamless. Their technical expertise and commitment to our success made all the difference.",
      rating: 4.5,
      projectType: "Enterprise Integration",
      verifiedCustomer: true,
      results: [
        { label: "Process Efficiency", value: "+75%" },
        { label: "Cost Reduction", value: "40%" },
        { label: "ROI", value: "285%" }
      ]
    }
  ];

  // Client logos
  const clientLogos = [
    "/images/clients/client-logo-1.png",
    "/images/clients/client-logo-2.png",
    "/images/clients/client-logo-3.png",
    "/images/clients/client-logo-4.png",
    "/images/clients/client-logo-5.png",
    "/images/clients/client-logo-6.png",
  ];

  // Navigation handlers
  const goToPrev = () => {
    setActiveSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const currentTestimonial = testimonials[activeSlide];

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: "linear-gradient(180deg, #f7faff 0%, #ffffff 100%)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: "absolute",
          left: "-5%",
          top: "10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(25, 118, 210, 0.03) 0%, rgba(25, 118, 210, 0) 70%)",
          zIndex: 0
        }}
      />
      <Box
        sx={{
          position: "absolute",
          right: "-10%",
          bottom: "5%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(25, 118, 210, 0.02) 0%, rgba(25, 118, 210, 0) 70%)",
          zIndex: 0
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: "bold",
              mb: 2,
              fontSize: { xs: "2rem", md: "2.75rem" }
            }}
          >
            Client Success Stories
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: "800px",
              mx: "auto",
              mb: 2
            }}
          >
            Don't just take our word for it. See what our clients have to say about working with ESnapup.
          </Typography>
        </Box>

        {/* Testimonial Card - Simplified without Slider */}
        <Box sx={{ position: "relative", px: { xs: 2, md: 5 }, mb: 4 }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 4,
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08)",
              background: "linear-gradient(145deg, #ffffff 0%, #f9fafb 100%)",
              position: "relative",
              overflow: "hidden"
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Box sx={{ position: "relative", mb: 4 }}>
                  <FormatQuoteIcon
                    sx={{
                      position: "absolute",
                      top: -10,
                      left: -5,
                      fontSize: "4rem",
                      color: "rgba(25, 118, 210, 0.1)",
                      transform: "scaleX(-1)"
                    }}
                  />
                  
                  <Typography
                    variant="h5"
                    component="p"
                    sx={{
                      fontStyle: "italic",
                      position: "relative",
                      zIndex: 1,
                      lineHeight: 1.7,
                      pl: 4
                    }}
                  >
                    "{currentTestimonial.testimonial}"
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Avatar
                    // Use colored backgrounds with initials instead of images
                    sx={{ 
                      width: 64, 
                      height: 64, 
                      mr: 2, 
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      bgcolor: currentTestimonial.name === "Sarah Mitchell" 
                        ? "secondary.main"
                        : currentTestimonial.name === "John Richardson"
                          ? "primary.main"
                          : "success.main",
                      fontWeight: "bold"
                    }}
                  >
                    {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                      <Typography variant="h6" component="p" fontWeight="bold">
                        {currentTestimonial.name}
                      </Typography>
                      {currentTestimonial.verifiedCustomer && (
                        <Chip
                          icon={<VerifiedIcon fontSize="small" />}
                          label="Verified Client"
                          size="small"
                          color="primary"
                          variant="outlined"
                          sx={{ ml: 1.5, height: 26 }}
                        />
                      )}
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {currentTestimonial.position}, {currentTestimonial.company}
                    </Typography>
                    <Rating
                      value={currentTestimonial.rating}
                      precision={0.5}
                      readOnly
                      size="small"
                      sx={{ mt: 0.5 }}
                    />
                  </Box>
                </Box>

                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 3 }}>
                  <Chip
                    label={currentTestimonial.projectType}
                    size="small"
                    sx={{
                      bgcolor: "primary.main",
                      color: "white",
                      fontWeight: "medium"
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    bgcolor: "rgba(25, 118, 210, 0.04)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ mb: 2 }}
                  >
                    Project Results
                  </Typography>
                  
                  {currentTestimonial.results?.map((result, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Typography
                        variant="caption"
                        component="p"
                        color="text.secondary"
                        fontWeight="medium"
                      >
                        {result.label}
                      </Typography>
                      <Typography
                        variant="h4"
                        component="p"
                        fontWeight="bold"
                        color="primary"
                      >
                        {result.value}
                      </Typography>
                    </Box>
                  ))}
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Box>

        {/* Navigation Controls */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 4,
            gap: 2
          }}
        >
          <IconButton
            onClick={goToPrev}
            sx={{
              bgcolor: "white",
              boxShadow: "0 3px 14px rgba(0, 0, 0, 0.12)",
              "&:hover": { bgcolor: "primary.50" }
            }}
            aria-label="Previous testimonial"
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          
          <Box sx={{ display: "flex", gap: 1 }}>
            {testimonials.map((_, index) => (
              <Box
                key={index}
                onClick={() => setActiveSlide(index)}
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  bgcolor: index === activeSlide ? "primary.main" : "rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                  cursor: "pointer"
                }}
              />
            ))}
          </Box>
          
          <IconButton
            onClick={goToNext}
            sx={{
              bgcolor: "white",
              boxShadow: "0 3px 14px rgba(0, 0, 0, 0.12)",
              "&:hover": { bgcolor: "primary.50" }
            }}
            aria-label="Next testimonial"
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Trusted by section */}
        <Box sx={{ mt: 10, textAlign: "center" }}>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ mb: 4, fontWeight: "medium" }}
          >
            TRUSTED BY LEADING COMPANIES
          </Typography>
          
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: { xs: 4, md: 6 },
              mx: "auto"
            }}
          >
            {/* Using color blocks instead of placeholder images */}
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <Box
                key={num}
                sx={{
                  width: { xs: 80, md: 120 },
                  height: { xs: 30, md: 40 },
                  bgcolor: `rgba(0, 0, 0, 0.${num + 1})`,
                  borderRadius: 1,
                  opacity: 0.7,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    opacity: 0.9,
                    transform: "scale(1.05)"
                  }
                }}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default EnhancedTestimonials;