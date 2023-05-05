const { verifyToken, verifyAuth, verifyAdmin } = require("./verifyToken");

const router = require("express").Router();
const Category = require("../models/Category");

router.get("/", async (req, res) => {
  try {
    const category = await Category.find();
    console.log(category);
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json("Category Not Found!");
  }
});

router.post("/", verifyToken, async (req, res) => {
  const newCategory = new Category(req.body);

  try {
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
