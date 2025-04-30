import React, { useState } from 'react';
import { 
  AppBar, Toolbar, Typography, Button, IconButton, Box, 
  Drawer, List, ListItem, ListItemText, ListItemButton, Container, useMediaQuery, 
  useTheme 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { NavLink, NavLinkProps } from 'react-router-dom';
import './Header.css';

// Extend the NavLink props with our own props for TypeScript
interface CustomLinkProps extends NavLinkProps {
  isActive?: boolean;
}

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Navigation links
  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' },
    { title: 'Portfolio', path: '/portfolio' },
    { title: 'Services', path: '/services' },
    { title: 'Contact', path: '/contact' }
  ];
  
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };
  
  return (
    <AppBar position="sticky" color="default" elevation={1} sx={{ bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography 
            variant="h6" 
            component={NavLink} 
            to="/"
            style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}
          >
            <Box component="span" sx={{ color: 'primary.main' }}>E</Box>Snapup
          </Typography>
          
          {isMobile ? (
            <IconButton 
              edge="end" 
              color="inherit" 
              aria-label="menu" 
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box component="nav" sx={{ display: 'flex', gap: 3 }}>
              {navLinks.map((link) => (
                <Button
                  key={link.title}
                  component={NavLink}
                  to={link.path}
                  className="nav-link"
                  sx={{
                    textDecoration: 'none',
                    color: 'inherit',
                    padding: '6px 0',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    '&:hover': {
                      color: theme.palette.primary.main
                    },
                    '&.active': {
                      fontWeight: 'bold',
                      color: theme.palette.primary.main,
                      borderBottom: `2px solid ${theme.palette.primary.main}`
                    }
                  }}
                >
                  {link.title}
                </Button>
              ))}
            </Box>
          )}
          
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
          >
            <Box
              sx={{ width: 250, pt: 2, height: '100%' }}
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2 }}>
                <IconButton color="inherit" edge="end" aria-label="close">
                  <CloseIcon />
                </IconButton>
              </Box>
              <List>
                {navLinks.map((link) => (
                  <ListItem key={link.title} disablePadding>
                    <ListItemButton
                      component={NavLink}
                      to={link.path}
                      className="nav-link"
                      sx={{ 
                        px: 3,
                        '&.active': {
                          color: theme.palette.primary.main,
                          backgroundColor: 'rgba(25, 118, 210, 0.08)'
                        }
                      }}
                    >
                      <ListItemText primary={link.title} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;