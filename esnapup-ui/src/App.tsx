import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

// Import your components
import Layout from './components/Layout/Layout';
import Home from './pages/HomePage';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact'; // Changed from ContactUs
import Services from './components/Services';
import NotFound from './components/NotFound';
import LeadGenPopup from './components/LeadGenPopup';
import ResourcesSection from './components/ResourcesSection';
import EnhancedTestimonials from './components/EnhancedTestimonials';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <LeadGenPopup />
          <Layout>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Home />
                    <Services />
                    <EnhancedTestimonials />
                    <Portfolio />
                    <ResourcesSection />
                  </>
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/contact" element={<Contact />} /> {/* Changed from ContactUs */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;