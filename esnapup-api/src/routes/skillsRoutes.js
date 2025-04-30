const express = require('express');
const router = express.Router();

// GET /api/v1/skills
router.get('/', (req, res) => {
  const skills = [
    { id: 'net-1', name: '.NET', category: 'technical' },
    { id: 'net-2', name: 'C#', category: 'technical' },
    { id: 'net-3', name: 'Entity Framework', category: 'technical' },
    { id: 'angular', name: 'Angular', category: 'technical' },
    { id: '1', name: 'JavaScript', category: 'technical' },
    { id: '2', name: 'TypeScript', category: 'technical' },
    { id: '3', name: 'Python', category: 'technical' },
    { id: '4', name: 'Java', category: 'technical' },
    { id: '5', name: 'React.js', category: 'technical' },
    { id: '26', name: 'Git', category: 'tool' },
    { id: '27', name: 'GitHub', category: 'tool' },
    { id: '28', name: 'JIRA', category: 'tool' },
    { id: '36', name: 'Agile Methodologies', category: 'soft' },
    { id: '37', name: 'Scrum', category: 'soft' },
    { id: '43', name: 'English (Fluent)', category: 'language' },
    { id: '44', name: 'French (Native)', category: 'language' },
  ];
  
  res.status(200).json(skills);
});

module.exports = router;