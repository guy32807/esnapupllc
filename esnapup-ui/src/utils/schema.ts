// If you have a file like this, update the URLs to use esnapup.com

export const getOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ESnapup",
    "url": "https://esnapup.com",
    "logo": "https://esnapup.com/logo.png",
    "sameAs": [
      "https://www.facebook.com/esnapup",
      "https://www.twitter.com/esnapup",
      "https://www.linkedin.com/company/esnapup",
      "https://www.instagram.com/esnapup"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-123-4567",
      "contactType": "customer service",
      "email": "info@esnapup.com",
      "availableLanguage": ["English"]
    }
  };
};

export const getWebsiteSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ESnapup",
    "url": "https://esnapup.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://esnapup.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
};

export const getLocalBusinessSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ESnapup",
    "image": "https://esnapup.com/images/office.jpg",
    "url": "https://esnapup.com",
    "telephone": "+1-555-123-4567",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Tech Street",
      "addressLocality": "San Francisco",
      "addressRegion": "CA",
      "postalCode": "94105",
      "addressCountry": "US"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  };
};