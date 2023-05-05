const { verifyToken, verifyAuth, verifyAdmin } = require("./verifyToken");

const router = require("express").Router();
const Product = require("../models/Product");

router.post("/", verifyAdmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/:id", verifyAdmin, async (req, res) => {
  try {
    const updatedProduct = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.log(err);
    res.status(403).json("Not Valid !!!");
  }
});

router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(`Deleted Product with ID ${req.params.id}`);
  } catch (err) {
    res.status(500).json("Product Not Found!");
  }
});

router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    console.log(product);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json("User Not Found!");
  }
});

router.get("/", async (req, res) => {
  const latest = req.query.latest;
  const category = req.query.category;
  try {
    let products;

    if (latest) {
      products = await Product.find();
    } else if (category && category !== "all") {
      products = await Product.find({
        categories: {
          $in: [category],
        },
      });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json("User Not Found!");
  }
});

module.exports = router;
