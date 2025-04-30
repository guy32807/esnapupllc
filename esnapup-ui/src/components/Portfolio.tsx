import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Box, Card, CardContent, 
  CardMedia, Button, Chip, CardActions, Tabs, Tab, Fade,
  CircularProgress, Grid, Pagination
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SEO from './SEO';

// Define project category type
type ProjectCategory = 'all' | 'web' | 'mobile' | 'business' | 'restaurant';

// Define project interface with category field
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  categories: ProjectCategory[];
  liveUrl?: string;
  githubUrl?: string;
}

// Original portfolio projects with categories
const projects: Project[] = [
  // Working websites first
  {
    id: 'performance-surge',
    title: 'Performance Surge',
    description: 'A comprehensive platform for tracking and optimizing business performance metrics with real-time analytics dashboards and performance improvement tools.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    technologies: ['React', 'JavaScript', 'Material UI', 'Chart.js', 'GitHub Pages', 'Responsive Design'],
    categories: ['web', 'business'],
    liveUrl: 'https://guy32807.github.io/performance-surge/',
    githubUrl: 'https://github.com/guy32807/performance-surge'
  },
  {
    id: 'webhosting',
    title: 'Web Hosting Services Portal',
    description: 'A modern platform for comparing and purchasing web hosting services with domain management, server configuration and customer support features.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    technologies: ['React', 'JavaScript', 'CSS', 'HTML', 'GitHub Pages', 'Responsive Design'],
    categories: ['web', 'business'],
    liveUrl: 'https://guy32807.github.io/webhosting/',
    githubUrl: 'https://github.com/guy32807/webhosting'
  },
  {
    id: 'travel-recommendation',
    title: 'Travel Recommendation App',
    description: 'An intelligent travel recommendation system that suggests destinations based on user preferences, interests, and budget constraints.',
    image: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    technologies: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Machine Learning'],
    categories: ['web', 'mobile'],
    liveUrl: 'https://guy32807.github.io/travel_recommentation/',
    githubUrl: 'https://github.com/guy32807/travel_recommentation',
  },
  {
    id: 'press-release',
    title: 'Press Release Generator',
    description: 'A tool that helps businesses create professional press releases with customizable templates and distribution options to increase media visibility.',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    technologies: ['React', 'JavaScript', 'CSS', 'HTML', 'GitHub Pages'],
    categories: ['web', 'business'],
    liveUrl: 'https://guy32807.github.io/press-release/',
    githubUrl: 'https://github.com/guy32807/press-release'
  },
  {
    id: 'healthcare-census',
    title: 'Healthcare Census Dashboard',
    description: 'An interactive dashboard for visualizing and analyzing healthcare census data, providing insights into patient demographics, facility utilization, and healthcare trends.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    technologies: ['React', 'D3.js', 'Python', 'Flask', 'SQL', 'Healthcare APIs'],
    categories: ['web', 'business'],
    liveUrl: 'https://guy32807.github.io/healthcare_census/',
    githubUrl: 'https://github.com/guy32807/healthcare_census'
  },
  {
    id: 'restaurant-finder',
    title: 'Local Restaurant Finder',
    description: 'A platform for discovering local restaurants with reviews, menus, and reservation capabilities. Helps small businesses gain visibility.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    technologies: ['React', 'Firebase', 'Google Maps API', 'Stripe', 'PWA'],
    categories: ['web', 'restaurant', 'business'],
    liveUrl: 'https://guy32807.github.io/restaurant-finder/',
    githubUrl: 'https://github.com/guy32807/restaurant-finder'
  }
];

const Portfolio: React.FC = () => {
  // State for the active category filter
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [loading, setLoading] = useState(true);
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>([]);
  const [page, setPage] = useState(1);
  const projectsPerPage = 6; // Number of projects per page

  // SEO schema for the portfolio page
  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Project Portfolio",
    "description": "View our portfolio of web, mobile, and business solution projects."
  };

  // Simulate loading and then filter projects (helpful for debugging)
  useEffect(() => {
    setLoading(true);
    // Reset to page 1 when category changes
    setPage(1);

    // Short timeout to simulate data loading and help debug render issues
    const timer = setTimeout(() => {
      const filtered = projects.filter(
        project => activeCategory === 'all' || project.categories.includes(activeCategory)
      );
      setDisplayedProjects(filtered);
      setLoading(false);
      
      // Debug logging - remove in production
      console.log(`Filtered projects for category '${activeCategory}':`, filtered.length);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [activeCategory]);

  // Get current page projects
  const getCurrentPageProjects = () => {
    const startIndex = (page - 1) * projectsPerPage;
    const endIndex = startIndex + projectsPerPage;
    return displayedProjects.slice(startIndex, endIndex);
  };

  // Total pages calculation
  const pageCount = Math.ceil(displayedProjects.length / projectsPerPage);

  // Handle tab change
  const handleCategoryChange = (_: React.SyntheticEvent, newValue: ProjectCategory) => {
    setActiveCategory(newValue);
  };

  // Handle page change
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    // Scroll to top of portfolio section
    window.scrollTo({
      top: document.getElementById('portfolio-grid')?.offsetTop || 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <SEO 
        title="Portfolio | ESnapup"
        description="Browse through our diverse portfolio of web applications, mobile apps, and business solutions showcasing our technical expertise."
        keywords="software portfolio, web development projects, mobile apps, business solutions"
        canonicalUrl="https://www.esnapup.com/portfolio"
        schema={portfolioSchema}
      />
      
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Our Portfolio
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Here's a collection of our recent projects. Each one presented unique challenges 
            and opportunities to apply various technologies and solutions.
          </Typography>
        </Box>

        {/* Category Tabs */}
        <Box sx={{ mb: 4, borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={activeCategory} 
            onChange={handleCategoryChange} 
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            aria-label="project categories"
          >
            <Tab label="All Projects" value="all" />
            <Tab label="Web Applications" value="web" />
            <Tab label="Mobile Apps" value="mobile" />
            <Tab label="Business Solutions" value="business" />
            <Tab label="Restaurant Systems" value="restaurant" />
          </Tabs>
        </Box>

        {/* Loading indicator */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {/* No projects found message */}
        {!loading && displayedProjects.length === 0 && (
          <Box sx={{ textAlign: 'center', my: 4 }}>
            <Typography variant="h6" color="textSecondary">
              No projects found in this category.
            </Typography>
          </Box>
        )}

        {/* Projects Grid */}
        {!loading && displayedProjects.length > 0 && (
          <>
            <Box 
              id="portfolio-grid"
              sx={{ 
                display: 'grid', 
                gridTemplateColumns: { 
                  xs: '1fr', 
                  sm: 'repeat(2, 1fr)', 
                  md: 'repeat(3, 1fr)' 
                }, 
                gap: 4 
              }}
            >
              {getCurrentPageProjects().map(project => (
                <Fade in={true} key={project.id} timeout={500}>
                  <Card 
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 6
                      }
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={project.image}
                      alt={project.title}
                      sx={{ objectFit: 'cover' }}
                    />
                    
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h5" component="h2" gutterBottom>
                        {project.title}
                      </Typography>
                      
                      <Typography variant="body2" color="textSecondary" paragraph>
                        {project.description}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                        {project.technologies.map((tech, index) => (
                          <Chip 
                            key={index} 
                            label={tech} 
                            size="small" 
                            sx={{ bgcolor: 'rgba(25, 118, 210, 0.08)' }} 
                          />
                        ))}
                      </Box>
                    </CardContent>
                    
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      {project.liveUrl && (
                        <Button 
                          startIcon={<LaunchIcon />}
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          size="small"
                        >
                          Live Demo
                        </Button>
                      )}
                      
                      {project.githubUrl && (
                        <Button 
                          startIcon={<GitHubIcon />}
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          size="small"
                        >
                          View Code
                        </Button>
                      )}
                    </CardActions>
                  </Card>
                </Fade>
              ))}
            </Box>
            
            {/* Pagination */}
            {pageCount > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                <Pagination 
                  count={pageCount} 
                  page={page} 
                  onChange={handlePageChange} 
                  color="primary" 
                  size="large"
                  showFirstButton 
                  showLastButton
                  sx={{
                    '& .MuiPaginationItem-root': {
                      fontSize: '1rem',
                    },
                  }}
                />
              </Box>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default Portfolio;