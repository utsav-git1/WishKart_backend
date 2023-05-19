const { verifyToken } = require("./verifyToken");

const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/", verifyToken, (req, res) => {
  stripe.paymentIntents.create(
    {
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeError, stripeRes) => {
      if (stripeError) res.status(500).json(stripeError);
      else res.status(200).json(stripeRes);
    }
  );
});

module.exports = router;
