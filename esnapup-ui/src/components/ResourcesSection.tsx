import React, { useState } from 'react';
import { 
  Container, Typography, Box, Grid as MuiGrid, Card, CardContent, 
  CardMedia, Button, TextField, Dialog, DialogTitle, 
  DialogContent, DialogActions, Divider, CardActionArea,
  Chip, useTheme
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ArticleIcon from '@mui/icons-material/Article';
import DevicesIcon from '@mui/icons-material/Devices';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';

// Type casting for Grid component to fix TypeScript errors
const Grid = MuiGrid as any;

interface Resource {
  id: string;
  title: string;
  description: string;
  image: string;
  type: 'guide' | 'whitepaper' | 'case-study' | 'template';
  category: 'web' | 'mobile' | 'business' | 'technology';
  downloadUrl: string;
}

const resources: Resource[] = [
  {
    id: 'web-dev-guide',
    title: '2025 Web Development Trends Guide',
    description: 'Stay ahead of the curve with our comprehensive guide to emerging web technologies, frameworks, and best practices.',
    image: '/images/resources/web-dev-guide.jpg',
    type: 'guide',
    category: 'web',
    downloadUrl: '/resources/2025-web-development-trends.pdf'
  },
  {
    id: 'digital-transformation',
    title: 'Digital Transformation Whitepaper',
    description: 'Learn how leading companies are successfully implementing digital transformation strategies.',
    image: '/images/resources/digital-transformation.jpg',
    type: 'whitepaper',
    category: 'business',
    downloadUrl: '/resources/digital-transformation-whitepaper.pdf'
  },
  {
    id: 'e-commerce-case',
    title: 'E-Commerce Platform Migration Case Study',
    description: 'How we helped a retail client increase conversion rates by 42% with a modern e-commerce solution.',
    image: '/images/resources/ecommerce-case.jpg',
    type: 'case-study',
    category: 'business',
    downloadUrl: '/resources/ecommerce-platform-case-study.pdf'
  },
  {
    id: 'app-dev-checklist',
    title: 'Mobile App Development Checklist',
    description: 'Essential planning template to ensure your mobile app project starts on the right foot.',
    image: '/images/resources/mobile-app-checklist.jpg',
    type: 'template',
    category: 'mobile',
    downloadUrl: '/resources/mobile-app-checklist.pdf'
  }
];

const ResourcesSection: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [currentResource, setCurrentResource] = useState<Resource | null>(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [filter, setFilter] = useState<string | null>(null);
  const theme = useTheme();

  const handleDownloadClick = (resource: Resource) => {
    setCurrentResource(resource);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    // Here you would send the lead data to your CRM or email system
    console.log({ name, email, resourceId: currentResource?.id });
    
    // In a real implementation, you could track downloads with analytics
    // window.gtag('event', 'resource_download', {
    //   'resource_id': currentResource?.id,
    //   'resource_title': currentResource?.title
    // });
    
    // Redirect to the actual download
    if (currentResource) {
      window.open(currentResource.downloadUrl, '_blank');
    }
    
    setOpen(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'guide':
        return <ArticleIcon sx={{ fontSize: 16 }} />;
      case 'whitepaper':
        return <ArticleIcon sx={{ fontSize: 16 }} />;
      case 'case-study':
        return <BusinessIcon sx={{ fontSize: 16 }} />;
      case 'template':
        return <DevicesIcon sx={{ fontSize: 16 }} />;
      default:
        return <ArticleIcon sx={{ fontSize: 16 }} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'guide':
        return theme.palette.primary.main;
      case 'whitepaper':
        return theme.palette.secondary.main;
      case 'case-study':
        return theme.palette.success.main;
      case 'template':
        return theme.palette.info.main;
      default:
        return theme.palette.primary.main;
    }
  };

  const filteredResources = filter 
    ? resources.filter(r => r.category === filter || r.type === filter) 
    : resources;

  return (
    <Box sx={{ py: 8, bgcolor: 'grey.50' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              fontSize: { xs: '2rem', md: '2.75rem' }
            }}
          >
            Free Resources & Guides
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              mb: 4
            }}
          >
            Download our free resources to learn industry best practices and stay ahead of the competition.
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1, mb: 4 }}>
            <Chip 
              label="All Resources" 
              onClick={() => setFilter(null)} 
              variant={filter === null ? 'filled' : 'outlined'}
              color="primary"
              sx={{ m: 0.5 }}
            />
            <Chip 
              icon={<DevicesIcon />} 
              label="Web Development" 
              onClick={() => setFilter('web')} 
              variant={filter === 'web' ? 'filled' : 'outlined'}
              color="primary"
              sx={{ m: 0.5 }}
            />
            <Chip 
              icon={<DevicesIcon />} 
              label="Mobile Development" 
              onClick={() => setFilter('mobile')} 
              variant={filter === 'mobile' ? 'filled' : 'outlined'}
              color="primary"
              sx={{ m: 0.5 }}
            />
            <Chip 
              icon={<BusinessIcon />} 
              label="Business Strategy" 
              onClick={() => setFilter('business')} 
              variant={filter === 'business' ? 'filled' : 'outlined'}
              color="primary"
              sx={{ m: 0.5 }}
            />
            <Chip 
              icon={<PeopleIcon />} 
              label="Case Studies" 
              onClick={() => setFilter('case-study')} 
              variant={filter === 'case-study' ? 'filled' : 'outlined'}
              color="primary"
              sx={{ m: 0.5 }}
            />
          </Box>
        </Box>

        <Grid container spacing={4}>
          {filteredResources.map((resource) => (
            <Grid item xs={12} sm={6} md={3} key={resource.id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 16px 70px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <CardActionArea onClick={() => handleDownloadClick(resource)}>
                  <CardMedia
                    component="img"
                    height="160"
                    image={resource.image}
                    alt={resource.title}
                  />
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      top: 16, 
                      left: 16,
                      bgcolor: 'background.paper',
                      borderRadius: 5,
                      px: 1.5,
                      py: 0.5,
                      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    <Box sx={{ color: getTypeColor(resource.type) }}>
                      {getTypeIcon(resource.type)}
                    </Box>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        fontWeight: 'medium',
                        color: getTypeColor(resource.type),
                        textTransform: 'capitalize'
                      }}
                    >
                      {resource.type.replace('-', ' ')}
                    </Typography>
                  </Box>
                </CardActionArea>
                
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography 
                    gutterBottom 
                    variant="h6" 
                    component="h3" 
                    sx={{ fontWeight: 'bold', mb: 1 }}
                  >
                    {resource.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {resource.description}
                  </Typography>
                  <Box sx={{ mt: 'auto', pt: 2 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      startIcon={<DownloadIcon />}
                      onClick={() => handleDownloadClick(resource)}
                      sx={{
                        borderRadius: 2,
                        py: 1,
                        textTransform: 'none',
                        fontWeight: 'medium'
                      }}
                    >
                      Download Free Resource
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h5" component="div" fontWeight="bold">
            Download Free Resource
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Please provide your information to receive your free copy of "{currentResource?.title}".
          </Typography>
          
          <TextField
            autoFocus
            margin="dense"
            label="Full Name"
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            margin="dense"
            label="Work Email"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 3 }}
            required
          />
          
          <Typography variant="caption" color="text.secondary">
            By downloading this resource, you agree to receive occasional emails from ESnapup with relevant content and offers. You can unsubscribe at any time.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            startIcon={<DownloadIcon />}
            disabled={!name || !email}
          >
            Download Now
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ResourcesSection;