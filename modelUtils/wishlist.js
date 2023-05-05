const Wishlist = require("../models/Wishlist");

const createWishlist = async (userId) => {
  const newWishlist = new Wishlist({ userId: userId, quantity: 0 });

  try {
    const savedWishlist = await newWishlist.save();
    console.log(savedWishlist);
  } catch (err) {
    console.log(err);
  }
};

module.exports = createWishlist;
