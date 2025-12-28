const Order = require('../models/Order');

// Create a new order (requires auth)
exports.createOrder = async (req, res) => {
  try {
    const { items, total, user: userInfo } = req.body;

    const order = await Order.create({
      items,
      total,
      user: userInfo || (req.user ? { id: req.user._id, name: req.user.name, email: req.user.email } : undefined)
    });

    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error('createOrder error', error);
    res.status(500).json({ success: false, error: 'Failed to create order' });
  }
};

// Get orders: admin gets all, user gets their own (supports ?userId=)
exports.getOrders = async (req, res) => {
  try {
    const { userId } = req.query;

    let query = {};
    if (userId) query['user.id'] = userId;
    // if not admin and no userId, restrict to requester
    if (!req.user || req.user.role !== 'admin') {
      if (!req.user && !userId) {
        return res.status(401).json({ success: false, error: 'Not authorized' });
      }
      query['user.id'] = req.user ? req.user._id : userId;
    }

    const orders = await Order.find(query).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.error('getOrders error', error);
    res.status(500).json({ success: false, error: 'Failed to fetch orders' });
  }
};

// Delete orders: user deletes their own; admin can delete all or by userId
exports.deleteOrders = async (req, res) => {
  try {
    const { userId, all } = req.query;

    let query = {};
    if (req.user && req.user.role === 'admin') {
      if (String(all).toLowerCase() === 'true') {
        query = {};
      } else if (userId) {
        query = { 'user.id': userId };
      } else {
        query = { 'user.id': req.user._id };
      }
    } else {
      query = { 'user.id': req.user._id };
    }

    const result = await Order.deleteMany(query);
    res.json({ success: true, deletedCount: result.deletedCount || 0 });
  } catch (error) {
    console.error('deleteOrders error', error);
    res.status(500).json({ success: false, error: 'Failed to delete orders' });
  }
};
