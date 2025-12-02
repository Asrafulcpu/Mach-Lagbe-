const express = require('express');
const router = express.Router();
const {
  getFish,
  getOneFish,
  createFish,
  updateFish,
  deleteFish
} = require('../controllers/fishController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getFish)
  .post(protect, authorize('admin'), createFish);

router.route('/:id')
  .get(getOneFish)
  .put(protect, authorize('admin'), updateFish)
  .delete(protect, authorize('admin'), deleteFish);

module.exports = router;