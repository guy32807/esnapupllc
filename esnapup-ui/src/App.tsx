import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';

// Import pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

// Get the correct basename based on the environment
const getBasename = () => {
  const hostname = window.location.hostname;
  
  // If running on esnapup.com domain, don't use a basename
  if (hostname === 'esnapup.com' || hostname === 'www.esnapup.com') {
    return '';  // Empty basename for custom domain
  }
  
  // If running on GitHub Pages, use the repo name as basename
  if (hostname.includes('github.io')) {
    return '/esnapupllc';
  }
  
  // For local development
  return '';  // Changed from '/esnapupllc' to ''
};

function App() {
  const basename = getBasename();
  
  return (
    <HelmetProvider>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="portfolio" element={<PortfolioPage />} />
            <Route path="contact" element={<ContactPage />} />
            
            {/* Redirect any non-matching routes to the not found page */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;