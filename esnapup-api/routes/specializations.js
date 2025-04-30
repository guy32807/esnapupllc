const express = require('express');
const {
  getSpecializations,
  getSpecialization,
  createSpecialization,
  updateSpecialization,
  deleteSpecialization
} = require('../controllers/specializations');

const router = express.Router();

// You can add middleware for authentication here
// const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(getSpecializations)
  .post(createSpecialization);

router
  .route('/:id')
  .get(getSpecialization)
  .put(updateSpecialization)
  .delete(deleteSpecialization);

module.exports = router;