const mongoose = require("mongoose");

const fishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Fish name is required"],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    default: ""
  },
  pricePerKg: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price cannot be negative"]
  },
  category: {
    type: String,
    enum: ["freshwater", "saltwater", "shellfish", "exotic"],
    default: "freshwater"
  },
  availability: {
    type: String,
    enum: ["available", "limited", "out_of_stock"],
    default: "available"
  },
  stock: {
    type: Number,
    default: 0,
    min: [0, "Stock cannot be negative"]
  },
  imageUrl: {
    type: String,
    default: ""
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
fishSchema.pre("save", function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Fish", fishSchema);
