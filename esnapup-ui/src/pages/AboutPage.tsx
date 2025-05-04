import React from 'react';
import About from '../components/About';
import SEO from '../components/SEO';
import { getOrganizationSchema } from '../utils/structuredData';

const AboutPage: React.FC = () => {
  return (
    <>
      <SEO 
        title="About ESnapup - Our Expert Web Development Team"
        description="Learn about ESnapup's mission, our team of expert developers, and our approach to creating high-quality web and mobile applications that drive business success."
        keywords={[
          'about ESnapup', 
          'web development team', 
          'software engineers Chicago',
          'tech company values',
          'digital solutions team'
        ]}
        canonicalUrl="https://esnapup.com/about"
        structuredData={[getOrganizationSchema()]}
      />
      <About />
    </>
  );
};

export default AboutPage;