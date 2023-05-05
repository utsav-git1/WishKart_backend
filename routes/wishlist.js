const { verifyToken, verifyAuth, verifyAdmin } = require("./verifyToken");

const router = require("express").Router();
const Wishlist = require("../models/Wishlist");

router.post("/", verifyToken, async (req, res) => {
  const newWishlist = new Wishlist(req.body);

  try {
    const savedWishlist = await newWishlist.save();
    res.status(200).json(savedWishlist);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", verifyAuth, async (req, res) => {
  try {
    const updatedWishlist = await Wishlist.findByIdAndUpdate(
      req.body.wishlistId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedWishlist);
  } catch (err) {
    console.log(err);
    res.status(403).json("Not Valid !!!");
  }
});

router.get("/find/:id", verifyAuth, async (req, res) => {
  try {
    const cart = await Wishlist.findOne({ userId: req.params.id });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json("Wishlist Not Found!");
  }
});

module.exports = router;
