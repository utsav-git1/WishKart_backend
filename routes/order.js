const { verifyToken, verifyAuth, verifyAdmin } = require("./verifyToken");

const router = require("express").Router();
const Order = require("../models/Order");

router.post("/", verifyToken, async (req, res) => {
  console.log(req.body);
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/find/:id", verifyAuth, async (req, res) => {
  try {
    const order = await Order.findOne({ userId: req.params.id });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json("Order Not Found!");
  }
});

router.get("/:id", verifyAuth, async (req, res) => {
  try {
    const order = await Order.find({ userId: req.params.id });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json("Order Not Found!");
  }
});

module.exports = router;
