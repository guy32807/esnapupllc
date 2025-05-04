import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string | string[];
  canonicalUrl?: string;
  schema?: any;
  structuredData?: any[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
  twitterSite?: string;
}

// Helper to get the proper domain for SEO purposes
const getFullDomainUrl = (path: string) => {
  // If it's already a full URL, return it
  if (path.startsWith('http')) return path;
  
  const hostname = window.location.hostname;
  
  // If running on esnapup.com domain, use that
  if (hostname === 'esnapup.com' || hostname === 'www.esnapup.com') {
    return `https://www.esnapup.com${path.startsWith('/') ? path : `/${path}`}`;
  }
  
  // For GitHub Pages or local development
  if (hostname.includes('github.io')) {
    return `https://guy32807.github.io/esnapupllc${path.startsWith('/') ? path : `/${path}`}`;
  }
  
  // Default for local development
  return `${window.location.origin}/esnapupllc${path.startsWith('/') ? path : `/${path}`}`;
};

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = '',
  canonicalUrl = '',
  schema = null,
  structuredData = [],
  ogTitle,
  ogDescription,
  ogImage,
  twitterCard = 'summary_large_image',
  twitterSite = '@esnapup'
}) => {
  // Convert keywords to string if it's an array
  const keywordsString = Array.isArray(keywords) ? keywords.join(', ') : keywords;
  
  // Get full domain URL for canonical and social tags
  const fullCanonicalUrl = canonicalUrl ? getFullDomainUrl(canonicalUrl) : '';

  return (
    <Helmet>
      {/* Basic metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywordsString && <meta name="keywords" content={keywordsString} />}
      
      {/* Canonical URL - point to esnapup.com */}
      {fullCanonicalUrl && <link rel="canonical" href={fullCanonicalUrl} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      {fullCanonicalUrl && <meta property="og:url" content={fullCanonicalUrl} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      {twitterSite && <meta name="twitter:site" content={twitterSite} />}
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogDescription || description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      
      {/* Schema.org JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
      
      {/* Multiple structured data entries */}
      {structuredData && structuredData.length > 0 && 
        structuredData.map((data, index) => {
          // Update any URLs in structured data to use esnapup.com
          let updatedData = { ...data };
          if (updatedData.url && !updatedData.url.includes('http')) {
            updatedData.url = getFullDomainUrl(updatedData.url);
          }
          return (
            <script key={index} type="application/ld+json">
              {JSON.stringify(updatedData)}
            </script>
          );
        })
      }
    </Helmet>
  );
};

export default SEO;