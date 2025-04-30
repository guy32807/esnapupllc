import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Container, 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText,
  ListItemButton,
  useScrollTrigger,
  Slide,
  useTheme,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Logo from './Logo';

// HideOnScroll component for smooth hiding of navbar on scroll
interface HideOnScrollProps {
  children: React.ReactElement;
}

const HideOnScroll = (props: HideOnScrollProps) => {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Contact', path: '/contact' }
  ];

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Close drawer when path changes
  useEffect(() => {
    if (drawerOpen) {
      setDrawerOpen(false);
    }
  }, [location.pathname]);

  const drawer = (
    <Box 
      onClick={handleDrawerToggle} 
      sx={{ 
        textAlign: 'center',
        bgcolor: 'primary.main',
        color: 'white',
        height: '100%'
      }}
    >
      <Box sx={{ my: 2 }}>
        <Logo color="white" height={40} />
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              sx={{
                justifyContent: 'center',
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
                ...(location.pathname === item.path && {
                  bgcolor: 'primary.dark',
                  fontWeight: 'bold'
                })
              }}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <HideOnScroll>
        <AppBar position="sticky" sx={{ bgcolor: 'primary.main' }}>
          <Container maxWidth="lg">
            <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
              <RouterLink to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                <Logo color="white" height={40} />
              </RouterLink>

              {/* Desktop Navigation */}
              {!isMobile && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {navItems.map((item) => (
                    <Button 
                      key={item.name}
                      component={RouterLink}
                      to={item.path}
                      sx={{ 
                        color: 'white', 
                        mx: 1,
                        position: 'relative',
                        '&:after': {
                          content: '""',
                          position: 'absolute',
                          width: '0%',
                          height: '2px',
                          bottom: 0,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          backgroundColor: 'white',
                          transition: 'width 0.3s',
                        },
                        '&:hover:after': {
                          width: '80%'
                        },
                        ...(location.pathname === item.path && {
                          '&:after': {
                            content: '""',
                            position: 'absolute',
                            width: '80%',
                            height: '2px',
                            bottom: 0,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            backgroundColor: 'white',
                          }
                        })
                      }}
                    >
                      {item.name}
                    </Button>
                  ))}
                </Box>
              )}

              {/* Mobile Navigation Icon */}
              {isMobile && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerToggle}
                  sx={{ display: { md: 'none' } }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 240,
            bgcolor: 'primary.main',
            color: 'white'
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;