const { verifyToken, verifyAuth, verifyAdmin } = require("./verifyToken");

const router = require("express").Router();
const crypto = require("crypto-js");
const User = require("../models/User");

router.put("/:id", verifyAuth, async (req, res) => {
  if (req.body.password) {
    req.body.password = crypto.AES.encrypt(
      req.body.password,
      process.env.PASS_KEY
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(403).json("Not Valid !!!");
  }
});

router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json(`Deleted User with ID ${req.params.id}`);
  } catch (err) {
    res.status(500).json("User Not Found!");
  }
});

router.get("/find/:id", verifyAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json("User Not Found!");
  }
});

router.get("/", verifyAdmin, async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json("User Not Found!");
  }
});

module.exports = router;
