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
import { Project, ProjectCategory } from '../types/project';
import projectsData from '../data/projects.json';
import { getAllProjects, getProjectsByCategory, getPaginatedProjects } from '../services/projectService';

// Import projects from JSON file
const projects: Project[] = projectsData.projects as Project[];

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
      const filtered = getProjectsByCategory(activeCategory);
      setDisplayedProjects(filtered);
      setLoading(false);
      
      // Debug logging - remove in production
      console.log(`Filtered projects for category '${activeCategory}':`, filtered.length);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [activeCategory]);

  // Get current page projects
  const getCurrentPageProjects = () => {
    return getPaginatedProjects(displayedProjects, page, projectsPerPage);
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