const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const orderRouter = require("./routes/order");
const cartRouter = require("./routes/cart");
const categoryRouter = require("./routes/category");
const wishlistRouter = require("./routes/wishlist");
const paymentRouter = require("./routes/stripe");


var cors = require("cors");
app.use(cors());

const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());

app.use("/users", userRouter);
app.use("/", authRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);
app.use("/category", categoryRouter);
app.use("/wishlist", wishlistRouter);
app.use("/payment", paymentRouter);


mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("db connection successful"))
  .catch((error) => console.log(error));

app.listen(process.env.PORT || 4000, () =>
  console.log("backend server is running")
);
