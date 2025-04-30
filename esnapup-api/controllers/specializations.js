const Specialization = require('../models/Specialization');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all specializations
// @route   GET /api/v1/specializations
// @access  Public
exports.getSpecializations = asyncHandler(async (req, res, next) => {
  const specializations = await Specialization.find().sort('sortOrder');
  
  res.status(200).json({
    success: true,
    count: specializations.length,
    data: specializations
  });
});

// @desc    Get single specialization
// @route   GET /api/v1/specializations/:id
// @access  Public
exports.getSpecialization = asyncHandler(async (req, res, next) => {
  const specialization = await Specialization.findById(req.params.id);
  
  if (!specialization) {
    return next(new ErrorResponse(`Specialization not found with id of ${req.params.id}`, 404));
  }
  
  res.status(200).json({
    success: true,
    data: specialization
  });
});

// @desc    Create new specialization
// @route   POST /api/v1/specializations
// @access  Private
exports.createSpecialization = asyncHandler(async (req, res, next) => {
  const specialization = await Specialization.create(req.body);
  
  res.status(201).json({
    success: true,
    data: specialization
  });
});

// @desc    Update specialization
// @route   PUT /api/v1/specializations/:id
// @access  Private
exports.updateSpecialization = asyncHandler(async (req, res, next) => {
  let specialization = await Specialization.findById(req.params.id);
  
  if (!specialization) {
    return next(new ErrorResponse(`Specialization not found with id of ${req.params.id}`, 404));
  }
  
  specialization = await Specialization.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  res.status(200).json({
    success: true,
    data: specialization
  });
});

// @desc    Delete specialization
// @route   DELETE /api/v1/specializations/:id
// @access  Private
exports.deleteSpecialization = asyncHandler(async (req, res, next) => {
  const specialization = await Specialization.findById(req.params.id);
  
  if (!specialization) {
    return next(new ErrorResponse(`Specialization not found with id of ${req.params.id}`, 404));
  }
  
  await specialization.deleteOne();
  
  res.status(200).json({
    success: true,
    data: {}
  });
});