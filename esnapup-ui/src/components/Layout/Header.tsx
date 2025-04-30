import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Box, 
  Container,
  useScrollTrigger,
  Slide,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItemText,
  Divider,
  ListItemButton
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Logo from '../Logo';

// HideOnScroll component to hide AppBar when scrolling down (optional)
interface Props {
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Header: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  
  // Check if current path matches the nav item
  const isActive = (path: string) => location.pathname === path;

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <AppBar 
        position="fixed" 
        color="default" 
        elevation={0}
        sx={{
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          boxShadow: scrolled 
            ? '0 4px 20px rgba(0, 0, 0, 0.08)' 
            : 'none',
          transition: 'all 0.3s ease',
          borderBottom: scrolled 
            ? '1px solid rgba(0, 0, 0, 0.05)' 
            : 'none',
          py: scrolled ? 0.5 : 1.5
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            {/* Logo */}
            <Box 
              component={RouterLink} 
              to="/" 
              sx={{ 
                textDecoration: 'none', 
                display: 'flex', 
                alignItems: 'center',
                mr: 3
              }}
            >
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontWeight: 'bold',
                  color: scrolled ? 'text.primary' : 'primary.main',
                  transition: 'all 0.3s ease'
                }}
              >
                ESnapup
              </Typography>
            </Box>

            {/* Desktop Menu */}
            {!isMobile && (
              <>
                <Box sx={{ flexGrow: 1, display: 'flex' }}>
                  {navItems.map((item) => (
                    <Button
                      key={item.name}
                      component={RouterLink}
                      to={item.path}
                      color="inherit"
                      sx={{
                        mx: 1,
                        fontWeight: 500,
                        fontSize: '0.95rem',
                        position: 'relative',
                        color: isActive(item.path) ? 'primary.main' : 'text.primary',
                        '&:hover': {
                          backgroundColor: 'transparent',
                          color: 'primary.main',
                        },
                        '&::after': isActive(item.path) ? {
                          content: '""',
                          position: 'absolute',
                          bottom: 0,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '30%',
                          height: '3px',
                          backgroundColor: 'primary.main',
                          borderRadius: '3px',
                        } : {}
                      }}
                    >
                      {item.name}
                    </Button>
                  ))}
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  component={RouterLink}
                  to="/contact"
                  sx={{
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
                    '&:hover': {
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
                    }
                  }}
                >
                  Get Started
                </Button>
              </>
            )}

            {/* Mobile Menu */}
            {isMobile && (
              <>
                <Box sx={{ flexGrow: 1 }} />
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleDrawer}
                  sx={{ 
                    ml: 2,
                    bgcolor: drawerOpen ? 'rgba(0, 0, 0, 0.05)' : 'transparent'
                  }}
                >
                  <MenuIcon />
                </IconButton>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Add toolbar spacing for fixed AppBar */}
      <Toolbar sx={{ mb: scrolled ? 0 : 1 }} />

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: '280px',
            boxSizing: 'border-box',
            borderRadius: '0 0 0 12px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            Menu
          </Typography>
          <IconButton onClick={toggleDrawer}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        <List sx={{ pt: 2 }}>
          {navItems.map((item) => (
            <ListItemButton 
              key={item.name} 
              component={RouterLink} 
              to={item.path}
              onClick={toggleDrawer}
              selected={isActive(item.path)}
              sx={{
                py: 1.5,
                borderLeft: isActive(item.path) 
                  ? `4px solid ${theme.palette.primary.main}` 
                  : '4px solid transparent',
                bgcolor: isActive(item.path) 
                  ? 'rgba(25, 118, 210, 0.08)' 
                  : 'transparent'
              }}
            >
              <ListItemText 
                primary={item.name} 
                primaryTypographyProps={{ 
                  fontWeight: isActive(item.path) ? 600 : 400,
                  color: isActive(item.path) ? 'primary.main' : 'text.primary'
                }}
              />
            </ListItemButton>
          ))}
        </List>

        <Box sx={{ p: 3, mt: 'auto' }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            component={RouterLink}
            to="/contact"
            onClick={toggleDrawer}
            sx={{
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600
            }}
          >
            Get Started
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;