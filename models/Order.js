const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [{}],
    amount: { type: Number, required: true },
    address: { type: Object, defalut: "pending" },
    paymentId: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
