const { verifyToken, verifyAuth, verifyAdmin } = require("./verifyToken");

const router = require("express").Router();
const crypto = require("crypto-js");
const Cart = require("../models/Cart");

router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", verifyAuth, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.body.cartId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    console.log(err);
    res.status(403).json("Not Valid !!!");
  }
});

router.delete("/:id", verifyAuth, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json(`Deleted Cart with ID ${req.params.id}`);
  } catch (err) {
    res.status(500).json("Cart Not Found!");
  }
});

router.get("/find/:id", verifyAuth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json("Cart Not Found!");
  }
});

module.exports = router;
