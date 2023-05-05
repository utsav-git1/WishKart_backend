const mongoose = require("mongoose");

const CartSchema = mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    products: [{}],
    quantity: Number,
    total: Number,
  },
  { timestamp: true }
);

module.exports = mongoose.model("Cart", CartSchema);
