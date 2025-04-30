/**
 * Structured data utilities for SEO
 */

// Organization schema
export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ESnapup",
  "url": "https://esnapup.com",
  "logo": "https://esnapup.com/images/logo.png",
  "sameAs": [
    "https://facebook.com/esnapup",
    "https://twitter.com/esnapup",
    "https://linkedin.com/company/esnapup",
    "https://instagram.com/esnapup"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-800-555-1234",
    "contactType": "customer service",
    "email": "info@esnapup.com"
  }
});

// Service schema for service pages
export const getServiceSchema = (name: string, description: string, url: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": name,
  "description": description,
  "provider": {
    "@type": "Organization",
    "name": "ESnapup"
  },
  "url": url
});

// Website schema for homepage
export const getWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://esnapup.com",
  "name": "ESnapup - Professional Web Development & Digital Solutions",
  "description": "We build modern, responsive websites and digital solutions for businesses of all sizes",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://esnapup.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
});

// LocalBusiness schema for contact/about pages
export const getLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "ESnapup",
  "image": "https://esnapup.com/images/office.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "",
    "addressLocality": "Chicago",
    "addressRegion": "IL",
    "postalCode": "60601",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 41.8781,
    "longitude": -87.6298
  },
  "url": "https://esnapup.com",
  "telephone": "+1-800-555-1234",
  "openingHours": "Mo,Tu,We,Th,Fr 09:00-17:00"
});