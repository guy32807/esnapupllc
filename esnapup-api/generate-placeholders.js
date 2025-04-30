const fs = require('fs');
const { createCanvas } = require('canvas');

const projects = [
  { name: 'E-Commerce Platform', filename: 'ecommerce.jpg', color: '#4285F4' },
  { name: 'Real Estate App', filename: 'realestate.jpg', color: '#DB4437' },
  { name: 'HR Management System', filename: 'hrms.jpg', color: '#F4B400' },
  { name: 'Fitness Tracker', filename: 'fitness.jpg', color: '#0F9D58' },
  { name: 'Social Media Dashboard', filename: 'socialdashboard.jpg', color: '#9C27B0' },
  { name: 'AI Content Generator', filename: 'ai-content.jpg', color: '#FF6D00' },
  { name: 'Default Project', filename: 'default-project.jpg', color: '#757575' }
];

projects.forEach(project => {
  const width = 800;
  const height = 600;
  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');

  // Background
  context.fillStyle = project.color;
  context.fillRect(0, 0, width, height);

  // Text
  context.font = 'bold 40px Arial';
  context.fillStyle = '#FFFFFF';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(project.name, width / 2, height / 2);

  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(project.filename, buffer);
  console.log(`Created ${project.filename}`);
});
