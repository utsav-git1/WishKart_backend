const mongoose = require("mongoose");

const WishlistSchema = mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    products: [],
    quantity: Number,
  },
  { timestamp: true }
);

module.exports = mongoose.model("Wishlist", WishlistSchema);
