import React from 'react';
import Contact from '../components/Contact';
import SEO from '../components/SEO';
import { getLocalBusinessSchema, getOrganizationSchema } from '../utils/structuredData';

const ContactPage: React.FC = () => {
  return (
    <>
      <SEO 
        title="Contact ESnapup - Reach Out for Web Development & Digital Solutions"
        description="Get in touch with our team of web development and digital marketing experts. We're here to answer your questions and discuss how we can help your business grow online."
        keywords={[
          'contact ESnapup', 
          'web development agency contact', 
          'digital solutions contact',
          'Chicago web developers',
          'hire web developer',
          'website development consultation'
        ]}
        canonicalUrl="/contact"
        structuredData={[
          getOrganizationSchema(),
          getLocalBusinessSchema()
        ]}
      />
      <Contact />
    </>
  );
};

export default ContactPage;