const Fish = require('../models/Fish');

// @desc    Get all fish
// @route   GET /api/fish
// @access  Public
exports.getFish = async (req, res) => {
  try {
    // Optional query parameters for filtering
    const { category, availability, search } = req.query;
    
    // Build query
    let query = { isActive: true };
    
    if (category) {
      query.category = category;
    }
    
    if (availability) {
      query.availability = availability;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const fish = await Fish.find(query).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: fish.length,
      data: fish
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
};

// @desc    Get single fish by ID
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
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        error: 'Fish not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
};

// @desc    Create new fish
// @route   POST /api/fish
// @access  Private/Admin
exports.createFish = async (req, res) => {
  try {
    const fish = await Fish.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Fish created successfully',
      data: fish
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: messages.join(', ')
      });
    }
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Fish with this name already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
};

// @desc    Update fish
// @route   PUT /api/fish/:id
// @access  Private/Admin
exports.updateFish = async (req, res) => {
  try {
    const fish = await Fish.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!fish) {
      return res.status(404).json({
        success: false,
        error: 'Fish not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Fish updated successfully',
      data: fish
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        error: 'Fish not found'
      });
    }
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
};

// @desc    Delete fish
// @route   DELETE /api/fish/:id
// @access  Private/Admin
exports.deleteFish = async (req, res) => {
  try {
    const fish = await Fish.findById(req.params.id);
    
    if (!fish) {
      return res.status(404).json({
        success: false,
        error: 'Fish not found'
      });
    }
    
    // Soft delete - set isActive to false instead of actually deleting
    fish.isActive = false;
    await fish.save();
    
    res.json({
      success: true,
      message: 'Fish deleted successfully'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        error: 'Fish not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
};



