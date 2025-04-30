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
    liveUrl: 'https://example.com/restaurant-finder',
    githubUrl: 'https://github.com/guy32807/mealmover'
  },
  // The rest of the projects remain in their original order
  {
    id: 'small-business-pos',
    title: 'Small Business POS System',
    description: 'An affordable point-of-sale system designed specifically for small retail businesses, with inventory tracking and sales analytics.',
    image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    technologies: ['React', 'Electron', 'Node.js', 'SQLite', 'Stripe API'],
    categories: ['business', 'web'],
    liveUrl: 'https://example.com/small-business-pos',
    githubUrl: 'https://github.com/example/small-business-pos'
  },
  {
    id: 'restaurant-management',
    title: 'Restaurant Management System',
    description: 'A complete restaurant management solution with ordering, kitchen display, inventory, and staff scheduling features.',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    technologies: ['React', 'Node.js', 'Socket.io', 'PostgreSQL', 'Redis'],
    categories: ['restaurant', 'business', 'web'],
    liveUrl: 'https://example.com/restaurant-system',
    githubUrl: 'https://github.com/example/restaurant-system'
  },
  {
    id: 'project1',
    title: 'E-Commerce Platform',
    description: 'A fully-featured online shopping platform with product catalog, shopping cart, and payment processing capabilities.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    technologies: ['React', 'Redux', 'Node.js', 'Express', 'MongoDB'],
    categories: ['web', 'business'],
    liveUrl: 'https://example.com/ecommerce',
    githubUrl: 'https://github.com/example/ecommerce'
  },
  {
    id: 'project2',
    title: 'Task Management System',
    description: 'A collaborative task management application that helps teams organize, track, and complete their work efficiently.',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    technologies: ['Angular', 'TypeScript', 'Firebase', 'Material UI'],
    categories: ['web', 'business'],
    liveUrl: 'https://example.com/tasks',
    githubUrl: 'https://github.com/example/tasks'
  },
  {
    id: 'project3',
    title: 'Weather Dashboard',
    description: 'A weather application that provides real-time forecasts, historical data, and visualization for locations worldwide.',
    image: 'https://images.unsplash.com/photo-1561484930-998b6a7b22e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    technologies: ['JavaScript', 'React', 'Chart.js', 'Weather API', 'CSS'],
    categories: ['web'],
    liveUrl: 'https://example.com/weather',
    githubUrl: 'https://github.com/example/weather'
  },
  {
    id: 'project4',
    title: 'Social Media Analytics',
    description: 'A dashboard for tracking and analyzing social media performance across multiple platforms and accounts.',
    image: 'https://images.unsplash.com/photo-1504270997636-07ddfbd48945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    technologies: ['React', 'D3.js', 'Node.js', 'Express', 'Social Media APIs'],
    categories: ['web', 'business'],
    liveUrl: 'https://example.com/analytics',
    githubUrl: 'https://github.com/example/analytics'
  },
  {
    id: 'project5',
    title: 'Fitness Tracker',
    description: 'A mobile-responsive application for setting fitness goals, tracking workouts, and monitoring health metrics.',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    technologies: ['React Native', 'Redux', 'Firebase', 'Health APIs'],
    categories: ['mobile'],
    liveUrl: 'https://example.com/fitness',
    githubUrl: 'https://github.com/example/fitness'
  },
  {
    id: 'project6',
    title: 'Recipe Finder',
    description: 'A culinary application that helps users discover recipes based on ingredients they have or dietary restrictions.',
    image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    technologies: ['JavaScript', 'React', 'Spoonacular API', 'CSS', 'LocalStorage'],
    categories: ['web', 'restaurant'],
    liveUrl: 'https://example.com/recipes',
    githubUrl: 'https://github.com/example/recipes'
  },
  {
    id: 'project7',
    title: 'Real Estate Listings',
    description: 'A property search platform featuring detailed listings, interactive maps, and mortgage calculators.',
    image: 'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    technologies: ['Angular', 'Google Maps API', 'Node.js', 'MongoDB', 'Express'],
    categories: ['web', 'business'],
    liveUrl: 'https://example.com/realestate',
    githubUrl: 'https://github.com/example/realestate'
  },
  {
    id: 'project8',
    title: 'Budgeting Application',
    description: 'A financial management tool that helps users track expenses, create budgets, and visualize spending patterns.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21ed6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    technologies: ['Vue.js', 'Vuex', 'Firebase', 'Chart.js', 'PWA'],
    categories: ['web', 'business'],
    liveUrl: 'https://example.com/budget',
    githubUrl: 'https://github.com/example/budget'
  },
  {
    id: 'local-marketplace',
    title: 'Local Business Marketplace',
    description: 'A platform connecting consumers with local small businesses and artisans, featuring online storefronts and delivery options.',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    technologies: ['React', 'GraphQL', 'Node.js', 'Postgres', 'Mapbox'],
    categories: ['web', 'business'],
    liveUrl: 'https://example.com/local-marketplace',
    githubUrl: 'https://github.com/example/local-marketplace'
  },
  {
    id: 'restaurant-reservation',
    title: 'Restaurant Reservation System',
    description: 'A reservation management system for restaurants that optimizes table allocation and reduces no-shows.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    technologies: ['React', 'Node.js', 'MongoDB', 'Twilio API', 'Stripe'],
    categories: ['web', 'restaurant', 'business'],
    liveUrl: 'https://example.com/reservation',
    githubUrl: 'https://github.com/example/reservation'
  },
  {
    id: 'project11',
    title: 'Portfolio Generator',
    description: 'A tool that helps developers create professional portfolios from their GitHub repositories and profiles.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    technologies: ['JavaScript', 'React', 'GitHub API', 'Netlify', 'Markdown'],
    categories: ['web'],
    liveUrl: 'https://example.com/portfolio-gen',
    githubUrl: 'https://github.com/example/portfolio-gen'
  },
  {
    id: 'project12',
    title: 'Virtual Event Platform',
    description: 'A platform for hosting virtual conferences with features for live streaming, networking, and interactive sessions.',
    image: 'https://images.unsplash.com/photo-1540304453527-62f979142a17?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    technologies: ['React', 'WebRTC', 'Socket.io', 'Node.js', 'Redis'],
    categories: ['web', 'business'],
    liveUrl: 'https://example.com/events',
    githubUrl: 'https://github.com/example/events'
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