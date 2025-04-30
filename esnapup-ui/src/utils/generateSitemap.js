const fs = require('fs');
const path = require('path');

// Your website's URL
const SITE_URL = 'https://esnapup.com';

// Pages data with additional metadata for SEO
const pages = [
  { url: '/', changefreq: 'weekly', priority: '1.0', lastmod: new Date().toISOString() },
  { url: '/about', changefreq: 'monthly', priority: '0.8', lastmod: new Date().toISOString() },
  { url: '/services', changefreq: 'weekly', priority: '0.9', lastmod: new Date().toISOString() },
  { url: '/projects', changefreq: 'weekly', priority: '0.9', lastmod: new Date().toISOString() },
  { url: '/contact', changefreq: 'monthly', priority: '0.7', lastmod: new Date().toISOString() },
  // Add all your pages here
];

// Generate sitemap XML content
const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
  `).join('')}
</urlset>`;

// Path to your public folder
const publicPath = path.resolve(__dirname, '../../public');

// Write sitemap to file
fs.writeFileSync(
  path.resolve(publicPath, 'sitemap.xml'),
  sitemapXML
);

console.log('Sitemap generated successfully!');