const Cart = require("../models/Cart");

const createCart = async (userId) => {
  const newCart = new Cart({ userId: userId, quantity: 0, total: 0 });

  try {
    const savedCart = await newCart.save();
    console.log(savedCart);
  } catch (err) {
    console.log(err);
  }
};

module.exports = createCart;
