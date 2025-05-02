import React from 'react';
import SEO from '../components/SEO';
import Portfolio from '../components/Portfolio';

const PortfolioPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Our Portfolio | ESnapup Web Development Projects"
        description="Explore our portfolio of web development, mobile app, and digital solutions projects. See how we've helped businesses achieve their goals with custom software."
        keywords={[
          'web development portfolio',
          'mobile app projects',
          'software development case studies',
          'digital solutions portfolio',
          'ESnapup projects'
        ]}
        canonicalUrl="https://esnapup.com/portfolio"
      />
      <Portfolio />
    </>
  );
};

export default PortfolioPage;