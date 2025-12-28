const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const ordersController = require('../controllers/ordersController');

// Create order (logged in users)
router.post('/', protect, ordersController.createOrder);

// Get orders (admin or user's own)
router.get('/', protect, ordersController.getOrders);

// Delete orders (clear history)
router.delete('/', protect, ordersController.deleteOrders);

router.put('/:id', protect, ordersController.updateOrder);
router.delete('/:id', protect, ordersController.deleteOrderById);

module.exports = router;
