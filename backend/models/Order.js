const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  fishId: { type: mongoose.Schema.Types.ObjectId, ref: 'Fish' },
  name: { type: String },
  pricePerKg: { type: Number },
  quantity: { type: Number },
  subtotal: { type: Number }
});

const OrderSchema = new mongoose.Schema({
  items: [OrderItemSchema],
  total: { type: Number, required: true },
  user: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    email: String
  },
  status: { type: String, default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
