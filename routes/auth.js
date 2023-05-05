const router = require("express").Router();
const User = require("../models/User");
const crypto = require("crypto-js");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const createCart = require("../modelUtils/cart");
const createWishlist = require("../modelUtils/wishlist");

dotenv.config();

router.post("/register", async (req, res) => {
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    email: req.body.email,
    password: crypto.AES.encrypt(
      req.body.password,
      process.env.PASS_KEY
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    console.log(savedUser);
    try {
      createCart(savedUser._id);
      createWishlist(savedUser._id);
    } catch (err) {
      console.log(err);
    }
  } catch (error) {
    res.status(500).json(error);
    console.log("this is the register error####", error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.body.username });

    !user && res.status(400).json("User not found"); //user doesnt exist
    const hashedPassword = crypto.AES.decrypt(
      user.password,
      process.env.PASS_KEY
    );

    const pswd = hashedPassword.toString(crypto.enc.Utf8);

    pswd !== req.body.password && res.status(400).json("Wrong Password");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_KEY,
      { expiresIn: "3d" }
    );

    res.status(200).json({ user, accessToken });
  } catch (error) {}
});

module.exports = router;
