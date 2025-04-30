import React from 'react';
import { Helmet } from 'react-helmet-async';

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string | string[];
  canonicalUrl?: string;
  schema?: any;
  structuredData?: any; // Added this alternative property name
  // Social media props
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterSite?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonicalUrl,
  schema,
  structuredData, // Added this parameter
  // Social media props
  ogTitle,
  ogDescription,
  ogImage,
  twitterCard = 'summary',
  twitterSite,
}) => {
  // Convert keywords array to comma-separated string if it's an array
  const keywordsString = Array.isArray(keywords) ? keywords.join(', ') : keywords;
  
  // Use either schema or structuredData, with schema taking precedence if both are provided
  const jsonLdData = schema || structuredData;
  
  return (
    <Helmet>
      {/* Basic metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywordsString && <meta name="keywords" content={keywordsString} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* OpenGraph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      {twitterSite && <meta name="twitter:site" content={twitterSite} />}
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogDescription || description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      
      {/* JSON-LD structured data */}
      {jsonLdData && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLdData) ? jsonLdData : jsonLdData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;