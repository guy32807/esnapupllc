const express = require('express');
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projects');

const router = express.Router();

// You can add middleware for authentication here
// const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(getProjects)
  .post(createProject);

router
  .route('/:id')
  .get(getProject)
  .put(updateProject)
  .delete(deleteProject);

module.exports = router;