// backend/controllers/fishController.js

const Fish = require('../models/Fish');

// @desc    Get all fish (admin — includes inactive)
// @route   GET /api/fish/admin
// @access  Private/Admin
exports.getFishAdmin = async (req, res) => {
  try {
    const fish = await Fish.find();
    res.json({
      success: true,
      count: fish.length,
      data: fish
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get all fish
// @route   GET /api/fish
// @access  Public
exports.getFish = async (req, res) => {
  try {
    const fish = await Fish.find();
    res.json({
      success: true,
      count: fish.length,
      data: fish
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get single fish
// @route   GET /api/fish/:id
// @access  Public
exports.getOneFish = async (req, res) => {
  try {
    const fish = await Fish.findById(req.params.id);
    if (!fish) {
      return res.status(404).json({
        success: false,
        error: 'Fish not found'
      });
    }
    res.json({
      success: true,
      data: fish
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Fish not found'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Create a fish
// @route   POST /api/fish
// @access  Private/Admin
exports.createFish = async (req, res) => {
  try {
    const fish = await Fish.create(req.body);
    res.status(201).json({
      success: true,
      data: fish
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'This fish already exists'
      });
    }
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update a fish
// @route   PUT /api/fish/:id
// @access  Private/Admin
exports.updateFish = async (req, res) => {
  try {
    const fish = await Fish.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!fish) {
      return res.status(404).json({
        success: false,
        error: 'Fish not found'
      });
    }
    res.json({
      success: true,
      data: fish
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'This fish already exists'
      });
    }
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete a fish
// @route   DELETE /api/fish/:id
// @access  Private/Admin
exports.deleteFish = async (req, res) => {
  try {
    const fish = await Fish.findByIdAndDelete(req.params.id);
    if (!fish) {
      return res.status(404).json({
        success: false,
        error: 'Fish not found'
      });
    }
    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Fish not found'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};