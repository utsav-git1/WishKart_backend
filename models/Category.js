const mongoose = require("mongoose");
const CategorySchema = mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Category", CategorySchema);
